/**
 * Sanity CMS helper functions for HABESHA Restaurant
 * Handles orders, specialEvents and menuItems via Sanity API
 */

const SANITY_PROJECT_ID = 'yp5xha26';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2021-06-07';
const SANITY_TOKEN = process.env.SANITY_API_TOKEN || '';

const SANITY_BASE_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data`;

async function sanityQuery(query: string) {
  const encoded = encodeURIComponent(query);
  const res = await fetch(`${SANITY_BASE_URL}/query/${SANITY_DATASET}?query=${encoded}`, {
    headers: {
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity query failed: ${res.status} ${text}`);
  }
  const data = await res.json() as { result: unknown };
  return data.result;
}

async function sanityMutate(mutations: unknown[]) {
  const res = await fetch(`${SANITY_BASE_URL}/mutate/${SANITY_DATASET}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity mutation failed: ${res.status} ${text}`);
  }
  return res.json();
}

export interface OrderItem {
  dishName: string;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  email: string;
  items: OrderItem[];
  totalPrice: number;
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  deliveryTime: string; // 'asap' or ISO datetime
  paymentMethod: 'card' | 'cash';
  notes?: string;
  stripePaymentIntentId?: string;
}

export interface SanityOrder {
  _id: string;
  _type: 'order';
  customerName: string;
  phone: string;
  email: string;
  items: OrderItem[];
  totalPrice: number;
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  deliveryTime: string;
  paymentMethod: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'done';
  createdAt: string;
  stripePaymentIntentId?: string;
}

export interface SpecialEvent {
  _id: string;
  title: string;
  description?: string;
  description_en?: string;
  description_am?: string;
  validFrom: string;
  validUntil: string;
  imageUrl?: string;
  isActive?: boolean;
}

export async function createOrder(input: CreateOrderInput): Promise<string> {
  const doc = {
    _type: 'order',
    customerName: input.customerName,
    phone: input.phone,
    email: input.email,
    items: input.items,
    totalPrice: input.totalPrice,
    orderType: input.orderType,
    deliveryAddress: input.deliveryAddress || '',
    deliveryTime: input.deliveryTime,
    paymentMethod: input.paymentMethod,
    notes: input.notes || '',
    status: 'new',
    createdAt: new Date().toISOString(),
    stripePaymentIntentId: input.stripePaymentIntentId || '',
  };

  const result = await sanityMutate([{ create: doc }]) as { results: Array<{ id: string }> };
  return result.results?.[0]?.id || '';
}

export async function getActiveOrders(): Promise<SanityOrder[]> {
  const query = `*[_type == "order" && status in ["new", "in_progress"]] | order(createdAt desc)`;
  return (await sanityQuery(query)) as SanityOrder[];
}

export async function updateOrderStatus(orderId: string, status: 'new' | 'in_progress' | 'done'): Promise<void> {
  await sanityMutate([{
    patch: {
      id: orderId,
      set: { status },
    },
  }]);
}

export async function getActiveSpecialEvents(): Promise<SpecialEvent[]> {
  const now = new Date().toISOString();
  const query = `*[_type == "specialEvent" && validFrom <= "${now}" && validUntil >= "${now}"]`;
  return (await sanityQuery(query)) as SpecialEvent[];
}

export async function getAllSpecialEvents(): Promise<SpecialEvent[]> {
  const query = `*[_type == "specialEvent"] | order(validFrom desc)`;
  return (await sanityQuery(query)) as SpecialEvent[];
}

export interface OrderHistoryFilter {
  dateFrom?: string; // ISO date string, e.g. '2026-03-01'
  dateTo?: string;   // ISO date string, e.g. '2026-03-31'
  search?: string;   // free-text search
  limit?: number;
  offset?: number;
}

export interface DayStats {
  date: string;
  orderCount: number;
  totalRevenue: number;
  deliveryCount: number;
  pickupCount: number;
}

export async function getOrderHistory(filter: OrderHistoryFilter = {}): Promise<SanityOrder[]> {
  const { dateFrom, dateTo, limit = 100, offset = 0 } = filter;

  let conditions = ['_type == "order"', 'status == "done"'];

  if (dateFrom) {
    conditions.push(`createdAt >= "${dateFrom}T00:00:00Z"`);
  }
  if (dateTo) {
    conditions.push(`createdAt <= "${dateTo}T23:59:59Z"`);
  }

  const query = `*[${conditions.join(' && ')}] | order(createdAt desc) [${offset}..${offset + limit - 1}]`;
  return (await sanityQuery(query)) as SanityOrder[];
}

export async function getDayStats(dateFrom: string, dateTo: string): Promise<DayStats[]> {
  const query = `*[_type == "order" && status == "done" && createdAt >= "${dateFrom}T00:00:00Z" && createdAt <= "${dateTo}T23:59:59Z"] {
    createdAt,
    totalPrice,
    orderType
  }`;

  const orders = (await sanityQuery(query)) as Array<{ createdAt: string; totalPrice: number; orderType: string }>;

  // Group by date
  const byDate: Record<string, DayStats> = {};
  for (const o of orders) {
    const day = o.createdAt.slice(0, 10);
    if (!byDate[day]) {
      byDate[day] = { date: day, orderCount: 0, totalRevenue: 0, deliveryCount: 0, pickupCount: 0 };
    }
    byDate[day].orderCount++;
    byDate[day].totalRevenue += o.totalPrice || 0;
    if (o.orderType === 'delivery') byDate[day].deliveryCount++;
    else byDate[day].pickupCount++;
  }

  return Object.values(byDate).sort((a, b) => b.date.localeCompare(a.date));
}

// ── MENU ITEMS ────────────────────────────────────────────────────────────────

export interface SanityMenuItem {
  _id: string;
  _type: 'menuItem';
  id: string;
  nameDe: string;
  nameEn: string;
  nameAm: string;
  descDe: string;
  descEn: string;
  descAm: string;
  price: string;
  priceNum: number;
  category: 'mains' | 'vegan' | 'plates' | 'sides';
  isVegan?: boolean;
  isVegetarian?: boolean;
  badge?: string;
  sortOrder?: number;
  isAvailable?: boolean;
}

export async function getMenuItems(): Promise<SanityMenuItem[]> {
  const query = `*[_type == "menuItem" && isAvailable != false] | order(sortOrder asc, _createdAt asc)`;
  const results = (await sanityQuery(query)) as SanityMenuItem[];
  return results;
}

export async function getMenuItemsByCategory(category: string): Promise<SanityMenuItem[]> {
  const query = `*[_type == "menuItem" && category == "${category}" && isAvailable != false] | order(sortOrder asc, _createdAt asc)`;
  return (await sanityQuery(query)) as SanityMenuItem[];
}
