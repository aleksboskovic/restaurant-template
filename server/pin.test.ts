import { describe, expect, it, vi, beforeEach } from "vitest";
import { hashPinServer } from "./db";

// Mock the db module to avoid real DB calls in tests
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    getStoredPinHash: vi.fn(),
    savePinHash: vi.fn(),
  };
});

import { getStoredPinHash, savePinHash } from "./db";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("hashPinServer", () => {
  it("produces consistent hash for same input", () => {
    const h1 = hashPinServer("2468");
    const h2 = hashPinServer("2468");
    expect(h1).toBe(h2);
  });

  it("produces different hashes for different PINs", () => {
    const h1 = hashPinServer("2468");
    const h2 = hashPinServer("1234");
    expect(h1).not.toBe(h2);
  });

  it("returns a 64-char hex string (SHA-256)", () => {
    const h = hashPinServer("0000");
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("pin.verify", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns valid=true when PIN matches stored hash", async () => {
    const correctHash = hashPinServer("2468");
    vi.mocked(getStoredPinHash).mockResolvedValue(correctHash);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.pin.verify({ pin: "2468" });
    expect(result.valid).toBe(true);
  });

  it("returns valid=false when PIN is wrong", async () => {
    const correctHash = hashPinServer("2468");
    vi.mocked(getStoredPinHash).mockResolvedValue(correctHash);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.pin.verify({ pin: "9999" });
    expect(result.valid).toBe(false);
  });
});

describe("pin.change", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("changes PIN successfully when old PIN is correct", async () => {
    const oldHash = hashPinServer("2468");
    vi.mocked(getStoredPinHash).mockResolvedValue(oldHash);
    vi.mocked(savePinHash).mockResolvedValue(undefined);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.pin.change({ oldPin: "2468", newPin: "1357" });
    expect(result.success).toBe(true);
    expect(savePinHash).toHaveBeenCalledWith(hashPinServer("1357"));
  });

  it("throws error when old PIN is wrong", async () => {
    const oldHash = hashPinServer("2468");
    vi.mocked(getStoredPinHash).mockResolvedValue(oldHash);

    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.pin.change({ oldPin: "9999", newPin: "1357" })
    ).rejects.toThrow("Alter PIN ist falsch.");
  });

  it("rejects new PIN that is not exactly 4 digits", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.pin.change({ oldPin: "2468", newPin: "123" })
    ).rejects.toThrow();
  });

  it("rejects new PIN with non-digit characters", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.pin.change({ oldPin: "2468", newPin: "12ab" })
    ).rejects.toThrow();
  });
});
