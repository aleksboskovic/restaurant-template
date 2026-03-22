/**
 * Zentrale Restaurant-Konfiguration
 * Alle Kontaktdaten, Öffnungszeiten, Bestell- und Liefereinstellungen
 * an einem Ort – einfach zu pflegen.
 */

export const RESTAURANT_CONFIG = {
  // ─── Allgemeine Infos ───────────────────────────────────────────────────
  name: 'HABESHA – Äthiopisches Restaurant Salzburg',
  shortName: 'HABESHA',
  tagline: 'Äthiopisches Restaurant · Salzburg',

  // ─── Kontakt ────────────────────────────────────────────────────────────
  contact: {
    phone: '+43 660 732 47 66',
    phoneDial: '+436607324766',
    email: 'restaurant@habesha-salzburg.at',
    website: 'https://www.habesha-salzburg.at',
  },

  // ─── Adresse ────────────────────────────────────────────────────────────
  address: {
    street: 'Schallmooser Hauptstraße 34',
    zip: '5020',
    city: 'Salzburg',
    country: 'Österreich',
    googleMapsUrl: 'https://maps.google.com/?q=HABESHA+Schallmooser+Hauptstraße+34+Salzburg',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.0!2d13.0555!3d47.8095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGFiZXNoYQ!5e0!3m2!1sde!2sat!4v1',
  },

  // ─── Öffnungszeiten ─────────────────────────────────────────────────────
  openingHours: [
    { days: 'Montag',    hours: 'Geschlossen', closed: true },
    { days: 'Dienstag',  hours: '17:00 – 22:00 Uhr', closed: false },
    { days: 'Mi – Fr',   hours: '11:00 – 14:00 & 17:00 – 22:00 Uhr', closed: false },
    { days: 'Sa – So',   hours: '13:00 – 22:00 Uhr', closed: false },
  ],

  // ─── Online-Bestellung ──────────────────────────────────────────────────
  ordering: {
    /** Mindestbestellwert in € */
    minOrderAmount: 12.00,
    /** Lieferkosten in € (0 = kostenlos) */
    deliveryFee: 0,
    /** Liefergebiet (Freitext für Kunden) */
    deliveryArea: 'Salzburg Stadtgebiet',
    /** Geschätzte Lieferzeit in Minuten */
    estimatedDeliveryMinutes: 30,
    /** Geschätzte Abholzeit in Minuten */
    estimatedPickupMinutes: 20,
    /** Akzeptierte Zahlungsmethoden */
    paymentMethods: ['Kreditkarte', 'Debitkarte', 'Apple Pay', 'Google Pay', 'Barzahlung'],
  },

  // ─── Social Media ───────────────────────────────────────────────────────
  social: {
    instagram: 'https://www.instagram.com/habesha.salzburg/',
    facebook: 'https://www.facebook.com/habesha.salzburg',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g190441-d28646928-Reviews-Habesha-Salzburg_State_of_Salzburg.html',
    google: 'https://www.google.com/search?q=HABESHA+%C3%84THIOPISCHE+RESTAURANT+Salzburg',
  },

  // ─── SEO ────────────────────────────────────────────────────────────────
  seo: {
    defaultTitle: 'HABESHA – Äthiopisches Restaurant Salzburg | Authentische Küche',
    defaultDescription: 'Erleben Sie authentische äthiopische Küche im Herzen von Salzburg. Injera, Tibs, Kitfo und mehr – jetzt online bestellen oder Tisch reservieren.',
    keywords: [
      'äthiopisches Restaurant Salzburg',
      'Habesha Salzburg',
      'Injera Salzburg',
      'afrikanisches Restaurant Salzburg',
      'äthiopische Küche',
      'Restaurant Schallmooser Hauptstraße',
      'online bestellen Salzburg',
    ],
  },
} as const;

export type RestaurantConfig = typeof RESTAURANT_CONFIG;
