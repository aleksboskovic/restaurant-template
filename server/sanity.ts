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
