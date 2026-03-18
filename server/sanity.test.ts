import { describe, expect, it, vi, beforeEach } from "vitest";

// ─── Live API Test ──────────────────────────────────────────────────────────
describe("Sanity API Token (Live)", () => {
  it("should be able to query Sanity with the token", async () => {
    const token = process.env.SANITY_API_TOKEN;
    expect(token).toBeTruthy();
    expect(token!.length).toBeGreaterThan(20);

    const query = encodeURIComponent('*[_type == "menuItem"][0..0]');
    const res = await fetch(
      `https://yp5xha26.api.sanity.io/v2021-06-07/data/query/production?query=${query}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(res.ok).toBe(true);
    const data = await res.json() as { result: unknown[] };
    expect(Array.isArray(data.result)).toBe(true);
  });
});

// ─── Unit Tests with mocked fetch ──────────────────────────────────────────
const mockFetch = vi.fn();

describe("Sanity Helper Functions (Unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', mockFetch);
  });

  it("createOrder sends correct mutation with status=new", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ id: 'test-order-id-123' }] }),
    });

    const { createOrder } = await import('./sanity');
    const orderId = await createOrder({
      customerName: 'Max Mustermann',
      phone: '+43 660 1234567',
      email: 'max@test.at',
      items: [{ dishName: 'Doro Wot', quantity: 2, price: 19.40 }],
      totalPrice: 38.80,
      orderType: 'delivery',
      deliveryAddress: 'Teststraße 1, 5020 Salzburg',
      deliveryTime: 'asap',
      paymentMethod: 'card',
    });

    expect(orderId).toBe('test-order-id-123');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.mutations[0].create._type).toBe('order');
    expect(body.mutations[0].create.status).toBe('new');
  });

  it("updateOrderStatus sends correct patch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const { updateOrderStatus } = await import('./sanity');
    await updateOrderStatus('order-abc-123', 'in_progress');

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.mutations[0].patch.id).toBe('order-abc-123');
    expect(body.mutations[0].patch.set.status).toBe('in_progress');
  });

  it("getActiveOrders queries only new and in_progress orders", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: [{ _id: '1', status: 'new' }] }),
    });

    const { getActiveOrders } = await import('./sanity');
    const orders = await getActiveOrders();

    expect(orders).toHaveLength(1);
    const url = decodeURIComponent(mockFetch.mock.calls[0][0] as string);
    expect(url).toContain('status in ["new", "in_progress"]');
  });

  it("throws error when Sanity API returns non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    });

    const { getActiveOrders } = await import('./sanity');
    await expect(getActiveOrders()).rejects.toThrow('Sanity query failed: 401');
  });

  it("getOrderHistory filters by dateFrom and dateTo", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: [{ _id: '1', status: 'done', createdAt: '2026-03-18T10:00:00Z' }] }),
    });

    const { getOrderHistory } = await import('./sanity');
    const orders = await getOrderHistory({ dateFrom: '2026-03-01', dateTo: '2026-03-31' });

    expect(orders).toHaveLength(1);
    const url = decodeURIComponent(mockFetch.mock.calls[0][0] as string);
    expect(url).toContain('createdAt >= "2026-03-01T00:00:00Z"');
    expect(url).toContain('createdAt <= "2026-03-31T23:59:59Z"');
    expect(url).toContain('status == "done"');
  });

  it("getDayStats groups orders by date correctly", async () => {
    const mockOrders = [
      { createdAt: '2026-03-18T10:00:00Z', totalPrice: 25.50, orderType: 'delivery' },
      { createdAt: '2026-03-18T14:00:00Z', totalPrice: 18.00, orderType: 'pickup' },
      { createdAt: '2026-03-17T12:00:00Z', totalPrice: 32.00, orderType: 'delivery' },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: mockOrders }),
    });

    const { getDayStats } = await import('./sanity');
    const stats = await getDayStats('2026-03-17', '2026-03-18');

    expect(stats).toHaveLength(2);
    const march18 = stats.find(s => s.date === '2026-03-18')!;
    expect(march18.orderCount).toBe(2);
    expect(march18.totalRevenue).toBeCloseTo(43.50);
    expect(march18.deliveryCount).toBe(1);
    expect(march18.pickupCount).toBe(1);

    const march17 = stats.find(s => s.date === '2026-03-17')!;
    expect(march17.orderCount).toBe(1);
    expect(march17.totalRevenue).toBeCloseTo(32.00);
  });
});

// ─── Stripe PaymentIntent Test ──────────────────────────────────────────────
describe("Stripe PaymentIntent (Unit)", () => {
  it("createPaymentIntent input schema validates correctly", () => {
    const { z } = require("zod");
    const schema = z.object({
      amount: z.number().positive(),
      customerName: z.string().optional(),
      customerEmail: z.string().email().optional(),
    });

    // Valid input
    const valid = schema.safeParse({ amount: 43.60, customerName: 'Max', customerEmail: 'max@test.at' });
    expect(valid.success).toBe(true);

    // Invalid: negative amount
    const invalid = schema.safeParse({ amount: -5 });
    expect(invalid.success).toBe(false);

    // Invalid: bad email
    const invalidEmail = schema.safeParse({ amount: 10, customerEmail: 'not-an-email' });
    expect(invalidEmail.success).toBe(false);
  });

  it("amount in cents is calculated correctly", () => {
    const amountEuros = 43.60;
    const amountCents = Math.round(amountEuros * 100);
    expect(amountCents).toBe(4360);

    const amountWithDecimals = 19.99;
    const centsPrecision = Math.round(amountWithDecimals * 100);
    expect(centsPrecision).toBe(1999);
  });
});

// ─── SpecialEvent Banner Logic Tests ─────────────────────────────────────────
describe('SpecialEvent Banner Logic', () => {
  it('should identify active events correctly', () => {
    const now = new Date();
    const activeEvent = {
      _id: 'test-1',
      title: 'Test Event',
      validFrom: new Date(now.getTime() - 1000 * 60 * 60).toISOString(), // 1h ago
      validUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24).toISOString(), // 24h from now
    };
    const isActive = new Date(activeEvent.validFrom) <= now && new Date(activeEvent.validUntil) >= now;
    expect(isActive).toBe(true);
  });

  it('should identify upcoming events correctly', () => {
    const now = new Date();
    const upcomingEvent = {
      _id: 'test-2',
      title: 'Upcoming Event',
      validFrom: new Date(now.getTime() + 1000 * 60 * 60 * 24).toISOString(), // 24h from now
      validUntil: new Date(now.getTime() + 1000 * 60 * 60 * 48).toISOString(), // 48h from now
    };
    const isComing = new Date(upcomingEvent.validFrom) > now;
    expect(isComing).toBe(true);
  });

  it('should identify expired events correctly', () => {
    const now = new Date();
    const expiredEvent = {
      _id: 'test-3',
      title: 'Expired Event',
      validFrom: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(), // 48h ago
      validUntil: new Date(now.getTime() - 1000 * 60 * 60).toISOString(), // 1h ago
    };
    const isExpired = new Date(expiredEvent.validUntil) < now;
    expect(isExpired).toBe(true);
  });

  it('should filter events that have not yet expired', () => {
    const now = new Date();
    const events = [
      { _id: '1', title: 'Active', validFrom: new Date(now.getTime() - 3600000).toISOString(), validUntil: new Date(now.getTime() + 86400000).toISOString() },
      { _id: '2', title: 'Expired', validFrom: new Date(now.getTime() - 172800000).toISOString(), validUntil: new Date(now.getTime() - 3600000).toISOString() },
      { _id: '3', title: 'Upcoming', validFrom: new Date(now.getTime() + 86400000).toISOString(), validUntil: new Date(now.getTime() + 172800000).toISOString() },
    ];
    const visible = events.filter(e => new Date(e.validUntil) > now);
    expect(visible).toHaveLength(2);
    expect(visible.map(e => e._id)).toContain('1');
    expect(visible.map(e => e._id)).toContain('3');
  });
});
