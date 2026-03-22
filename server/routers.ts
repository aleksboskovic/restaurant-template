import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import {
  createOrder,
  getActiveOrders,
  updateOrderStatus,
  getActiveSpecialEvents,
  getAllSpecialEvents,
  getOrderHistory,
  getDayStats,
  getMenuItems,
} from './sanity';
import { getStoredPinHash, savePinHash, hashPinServer, getOrdersEnabled, setOrdersEnabled } from './db';
import { notifyOwner } from './_core/notification';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
});

const orderItemSchema = z.object({
  dishName: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Orders ────────────────────────────────────────────────────────────────
  orders: router({
    /** Create a Stripe PaymentIntent for card payments */
    createPaymentIntent: publicProcedure
      .input(z.object({
        amount: z.number().positive(), // in euros
        customerName: z.string().optional(),
        customerEmail: z.string().email().optional(),
      }))
      .mutation(async ({ input }) => {
        const amountCents = Math.round(input.amount * 100);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountCents,
          currency: 'eur',
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never', // Verhindert Weiterleitungen (wichtig für SPA)
          },
          metadata: {
            customerName: input.customerName || '',
            customerEmail: input.customerEmail || '',
          },
        });
        return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id };
      }),

    /** Create a new order and save it to Sanity */
    create: publicProcedure
      .input(z.object({
        customerName: z.string().min(2),
        phone: z.string().min(6),
        email: z.string().email(),
        items: z.array(orderItemSchema).min(1),
        totalPrice: z.number().positive(),
        orderType: z.enum(['delivery', 'pickup']),
        deliveryAddress: z.string().optional(),
        deliveryTime: z.string(),
        paymentMethod: z.enum(['card', 'cash']),
        notes: z.string().optional(),
        stripePaymentIntentId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const orderId = await createOrder(input);
        const orderNum = `HAB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        return { success: true, orderId, orderNum };
      }),

    /** Get all active orders (new + in_progress) for the dashboard */
    getActive: publicProcedure.query(async () => {
      const orders = await getActiveOrders();
      return orders;
    }),

    /** Update order status */
    updateStatus: publicProcedure
      .input(z.object({
        orderId: z.string(),
        status: z.enum(['new', 'in_progress', 'done']),
      }))
      .mutation(async ({ input }) => {
        await updateOrderStatus(input.orderId, input.status);
        return { success: true };
      }),

    /** Get order history (done orders) with optional date filter */
    getHistory: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        limit: z.number().int().min(1).max(500).optional(),
        offset: z.number().int().min(0).optional(),
      }).optional())
      .query(async ({ input }) => {
        const orders = await getOrderHistory(input ?? {});
        return orders;
      }),

    /** Get daily statistics for a date range */
    getDayStats: publicProcedure
      .input(z.object({
        dateFrom: z.string(),
        dateTo: z.string(),
      }))
      .query(async ({ input }) => {
        const stats = await getDayStats(input.dateFrom, input.dateTo);
        return stats;
      }),
  }),

  // ─── Special Events ─────────────────────────────────────────────────────────
  specialEvents: router({
    /** Get currently active special events (within validFrom–validUntil) */
    getActive: publicProcedure.query(async () => {
      const events = await getActiveSpecialEvents();
      return events;
    }),

    /** Get all special events (for admin overview) */
    getAll: publicProcedure.query(async () => {
      const events = await getAllSpecialEvents();
      return events;
    }),
  }),

   // ─── Menu Items from Sanity ──────────────────────────────────────────────
  menu: router({
    /** Get all available menu items from Sanity, sorted by sortOrder */
    getAll: publicProcedure.query(async () => {
      const items = await getMenuItems();
      return items;
    }),
  }),

  // ─── Orders Enabled ──────────────────────────────────────────────────────
  orderSettings: router({
    /** Get whether orders are currently enabled (DB-persisted) */
    getEnabled: publicProcedure.query(async () => {
      const enabled = await getOrdersEnabled();
      return { enabled };
    }),

    /** Set orders enabled/disabled — persists in DB until manually changed */
    setEnabled: publicProcedure
      .input(z.object({ enabled: z.boolean() }))
      .mutation(async ({ input }) => {
        await setOrdersEnabled(input.enabled);
        return { success: true, enabled: input.enabled };
      }),
  }),

  // ─── Contact Form ──────────────────────────────────────────────────────
  contact: router({
    /** Send a contact message — notifies the owner via Manus notification */
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1).max(200),
        message: z.string().min(1).max(5000),
      }))
      .mutation(async ({ input }) => {
        const content = [
          `Name: ${input.name}`,
          `E-Mail: ${input.email}`,
          input.phone ? `Telefon: ${input.phone}` : null,
          `Betreff: ${input.subject}`,
          ``,
          `Nachricht:`,
          input.message,
        ].filter(Boolean).join('\n');

        await notifyOwner({
          title: `📩 Neue Kontaktanfrage: ${input.subject}`,
          content,
        });

        return { success: true };
      }),
  }),

  // ─── Dashboard PIN ────────────────────────────────────────────────────
  pin: router({
    /** Verify a PIN against the stored hash */
    verify: publicProcedure
      .input(z.object({ pin: z.string().min(4).max(8) }))
      .mutation(async ({ input }) => {
        const storedHash = await getStoredPinHash();
        const inputHash = hashPinServer(input.pin);
        return { valid: inputHash === storedHash };
      }),

    /** Change the PIN: verify old PIN first, then save new hash */
    change: publicProcedure
      .input(z.object({
        oldPin: z.string().min(4).max(8),
        newPin: z.string().length(4).regex(/^\d{4}$/, 'PIN muss genau 4 Ziffern sein'),
      }))
      .mutation(async ({ input }) => {
        const storedHash = await getStoredPinHash();
        const oldHash = hashPinServer(input.oldPin);
        if (oldHash !== storedHash) {
          throw new Error('Alter PIN ist falsch.');
        }
        const newHash = hashPinServer(input.newPin);
        await savePinHash(newHash);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
