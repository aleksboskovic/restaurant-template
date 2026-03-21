import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, appSettings } from "../drizzle/schema";
import { ENV } from './_core/env';
import { createHash } from 'crypto';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Dashboard PIN ───────────────────────────────────────────────────────────

const PIN_KEY = 'dashboard_pin_hash';
const PIN_SALT = 'habesha-salt-2024';

/** Hash a PIN with SHA-256 (server-side, using Node crypto) */
export function hashPinServer(pin: string): string {
  return createHash('sha256').update(pin + PIN_SALT).digest('hex');
}

/** Get the stored PIN hash from DB, or fall back to env/default */
export async function getStoredPinHash(): Promise<string> {
  const db = await getDb();
  if (db) {
    try {
      const rows = await db.select().from(appSettings).where(eq(appSettings.key, PIN_KEY)).limit(1);
      if (rows.length > 0) return rows[0].value;
    } catch (e) {
      console.warn('[PIN] DB read failed, using fallback:', e);
    }
  }
  // Fallback: env variable or default '2468'
  const fallback = process.env.VITE_DASHBOARD_PIN || '2468';
  return hashPinServer(fallback);
}

/** Save a new PIN hash to DB */
export async function savePinHash(newHash: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.insert(appSettings)
    .values({ key: PIN_KEY, value: newHash })
    .onDuplicateKeyUpdate({ set: { value: newHash } });
}

// TODO: add feature queries here as your schema grows.
