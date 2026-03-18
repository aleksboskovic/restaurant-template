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
});
