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
} from "./sanity";

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
          automatic_payment_methods: { enabled: true },
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

  // ─── Menu Items from Sanity ─────────────────────────────────────────────────
  menu: router({
    /** Get all menu items from Sanity */
    getAll: publicProcedure.query(async () => {
      const SANITY_TOKEN = process.env.SANITY_API_TOKEN || '';
      const query = encodeURIComponent('*[_type == "menuItem"] | order(category asc, name asc)');
      const res = await fetch(
        `https://yp5xha26.api.sanity.io/v2021-06-07/data/query/production?query=${query}`,
        { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } }
      );
      const data = await res.json() as { result: unknown[] };
      return data.result;
    }),
  }),
});

export type AppRouter = typeof appRouter;
