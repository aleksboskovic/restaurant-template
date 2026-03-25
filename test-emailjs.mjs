const serviceId = process.env.EMAILJS_SERVICE_ID;
const templateId = process.env.EMAILJS_TEMPLATE_ID;
const publicKey = process.env.EMAILJS_PUBLIC_KEY;
const privateKey = process.env.EMAILJS_PRIVATE_KEY;

console.log('SERVICE_ID:', serviceId ? 'OK' : 'MISSING');
console.log('TEMPLATE_ID:', templateId ? 'OK' : 'MISSING');
console.log('PUBLIC_KEY:', publicKey ? 'OK' : 'MISSING');
console.log('PRIVATE_KEY:', privateKey ? 'OK' : 'MISSING');

const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey,
    template_params: {
      to_name: 'Test Kunde',
      to_email: 'restaurant@habesha-salzburg.at',
      order_num: 'HAB-2026-TEST',
      order_type: 'Abholung',
      items_list: '1x Doro Wat - 14,90 EUR',
      total_price: '14,90 EUR',
      delivery_time: 'asap',
      payment_method: 'Bar bei Übergabe',
      delivery_address: '-',
      notes: '-',
      restaurant_name: 'HABESHA Restaurant Salzburg',
      restaurant_phone: '+43 660 7324766',
      restaurant_email: 'restaurant@habesha-salzburg.at',
      restaurant_address: 'Gebirgsjägerplatz 1, 5020 Salzburg',
    }
  })
});

console.log('STATUS:', response.status);
const text = await response.text();
console.log('RESPONSE:', text);
