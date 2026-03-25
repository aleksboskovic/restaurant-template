import { ENV } from './_core/env';

export interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  orderNum: string;
  orderType: 'delivery' | 'pickup';
  items: Array<{ dishName: string; quantity: number; price: number }>;
  totalPrice: number;
  deliveryAddress?: string;
  deliveryTime: string;
  paymentMethod: 'card' | 'cash';
  notes?: string;
}

/**
 * Send an order confirmation email to the customer via EmailJS REST API.
 * EmailJS is called server-side to keep the public key usage consistent.
 */
export async function sendOrderConfirmation(data: OrderConfirmationData): Promise<boolean> {
  const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = ENV;

  if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
    console.warn('[EmailJS] Missing credentials – skipping order confirmation email.');
    return false;
  }

  // Build a readable items list for the email template
  const itemsList = data.items
    .map(i => `${i.quantity}× ${i.dishName} – ${(i.price * i.quantity).toFixed(2).replace('.', ',')} €`)
    .join('\n');

  const orderTypeLabel = data.orderType === 'delivery' ? 'Lieferung' : 'Abholung';
  const paymentLabel = data.paymentMethod === 'card' ? 'Karte (online bezahlt)' : 'Bar bei Übergabe';

  const templateParams: Record<string, string> = {
    to_name: data.customerName,
    to_email: data.customerEmail,
    order_num: data.orderNum,
    order_type: orderTypeLabel,
    items_list: itemsList,
    total_price: `${data.totalPrice.toFixed(2).replace('.', ',')} €`,
    delivery_time: data.deliveryTime,
    payment_method: paymentLabel,
    delivery_address: data.deliveryAddress ?? '–',
    notes: data.notes ?? '–',
    restaurant_name: 'HABESHA Restaurant Salzburg',
    restaurant_phone: '+43 660 7324766',
    restaurant_email: 'restaurant@habesha-salzburg.at',
    restaurant_address: 'Gebirgsjägerplatz 1, 5020 Salzburg',
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: emailjsServiceId,
        template_id: emailjsTemplateId,
        user_id: emailjsPublicKey,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[EmailJS] Failed to send email:', response.status, text);
      return false;
    }

    console.log(`[EmailJS] Order confirmation sent to ${data.customerEmail} (${data.orderNum})`);
    return true;
  } catch (err) {
    console.error('[EmailJS] Error sending email:', err);
    return false;
  }
}
