/**
 * Zentrale Restaurant-Konfiguration
 * Alle Kontaktdaten, Öffnungszeiten, Bestell- und Liefereinstellungen
 * sowie vollständige SEO-Keyword-Strategie an einem Ort.
 */

export const RESTAURANT_CONFIG = {
  // ─── Allgemeine Infos ───────────────────────────────────────────────────
  name: 'HABESHA – Äthiopisches Restaurant Salzburg',
  shortName: 'HABESHA',
  tagline: 'Äthiopisches Restaurant · Salzburg',
  legalName: 'HABESHA Äthiopisches Restaurant',

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
    countryCode: 'AT',
    googleMapsUrl: 'https://maps.google.com/?q=HABESHA+Schallmooser+Hauptstraße+34+Salzburg',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.0!2d13.0555!3d47.8095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGFiZXNoYQ!5e0!3m2!1sde!2sat!4v1',
    coordinates: { lat: 47.8095, lng: 13.0555 },
  },

  // ─── Öffnungszeiten ─────────────────────────────────────────────────────
  openingHours: [
    { days: 'Montag',    hours: 'Geschlossen',                          closed: true  },
    { days: 'Dienstag',  hours: '17:00 – 22:00 Uhr',                   closed: false },
    { days: 'Mi – Fr',   hours: '11:00 – 14:00 & 17:00 – 22:00 Uhr',  closed: false },
    { days: 'Sa – So',   hours: '13:00 – 22:00 Uhr',                   closed: false },
  ],

  // Schema.org format
  openingHoursSchema: [
    'Tu 17:00-22:00',
    'We-Fr 11:00-22:00',
    'Sa-Su 13:00-22:00',
  ],

  // ─── Online-Bestellung ──────────────────────────────────────────────────
  ordering: {
    minOrderAmount: 12.00,
    deliveryFee: 0,
    deliveryArea: 'Salzburg Stadtgebiet',
    estimatedDeliveryMinutes: 30,
    estimatedPickupMinutes: 20,
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

    // ── Seiten-spezifische Meta-Daten (exakt nach Google-Vorgaben) ──────
    pages: {
      home: {
        title: 'HABESHA – Äthiopisches Restaurant Salzburg',          // 43 Zeichen
        description: 'Authentische äthiopische Küche in Salzburg. Halal, vegan & glutenfrei. Injera, Tibs, Kitfo – jetzt online bestellen oder Tisch reservieren.',  // 152 Zeichen
        h1: 'Äthiopisches Restaurant in Salzburg',
        canonical: 'https://www.habesha-salzburg.at/',
      },
      menu: {
        title: 'Speisekarte – HABESHA Äthiopisches Restaurant',       // 47 Zeichen
        description: 'Äthiopische Speisekarte: Injera, Tibs, Kitfo, vegane Wot-Gerichte. Halal & glutenfrei. Abholung oder Zustellung in Salzburg – jetzt online bestellen.',  // 157 Zeichen
        h1: 'Äthiopische Speisekarte Salzburg',
        canonical: 'https://www.habesha-salzburg.at/speisekarte',
      },
      order: {
        title: 'Online Bestellen – HABESHA Salzburg',                 // 36 Zeichen
        description: 'Äthiopisches Essen online bestellen in Salzburg. Abholung oder kostenlose Zustellung. Frische Zutaten, halal, vegan & glutenfrei. Schnell & einfach.',  // 153 Zeichen
        h1: 'Äthiopisches Essen online bestellen',
        canonical: 'https://www.habesha-salzburg.at/bestellen',
      },
      reservation: {
        title: 'Tisch reservieren – HABESHA Salzburg',                // 37 Zeichen
        description: 'Tisch im äthiopischen Restaurant HABESHA Salzburg reservieren. Kaffeezeremonie, Injera & authentische Küche erleben. Jetzt einfach online buchen.',  // 151 Zeichen
        h1: 'Tisch reservieren im HABESHA Salzburg',
        canonical: 'https://www.habesha-salzburg.at/reservierung',
      },
      blog: {
        title: 'Blog – Äthiopische Küche & Kultur | HABESHA',         // 44 Zeichen
        description: 'Wissenswertes über äthiopische Küche, Gewürze & Kaffeezeremonie. Berbere, Injera, Teff, Niter Kibbeh – entdecken Sie Äthiopien in Salzburg.',  // 149 Zeichen
        h1: 'Äthiopische Küche & Kultur – Blog',
        canonical: 'https://www.habesha-salzburg.at/blog',
      },
      contact: {
        title: 'Kontakt & Anfahrt – HABESHA Salzburg',                // 37 Zeichen
        description: 'HABESHA Restaurant Salzburg: Schallmooser Hauptstraße 34. Tel: +43 660 732 47 66. Öffnungszeiten, Anfahrt & Kontaktformular. Wir freuen uns auf Sie!',  // 155 Zeichen
        h1: 'Kontakt & Anfahrt – HABESHA Salzburg',
        canonical: 'https://www.habesha-salzburg.at/kontakt',
      },
      faq: {
        title: 'FAQ – Häufige Fragen | HABESHA Salzburg',             // 40 Zeichen
        description: 'Antworten auf häufige Fragen zu HABESHA Salzburg: Öffnungszeiten, Reservierung, Lieferung, Halal, vegane Gerichte, Glutenfrei & Kaffeezeremonie.',  // 150 Zeichen
        h1: 'Häufige Fragen – HABESHA Salzburg',
        canonical: 'https://www.habesha-salzburg.at/faq',
      },
    },

    // ── Globale Keywords (alle Cluster) ─────────────────────────────────
    keywords: {

      /** SHORT-TAIL: Hohe Konkurrenz, Markenbewusstsein */
      shortTail: [
        'äthiopisches Restaurant',
        'Restaurant Salzburg',
        'halal Salzburg',
        'veganes Restaurant',
        'afrikanisches Restaurant',
        'Injera',
        'glutenfreies Restaurant',
      ],

      /** MID-TAIL: Mittlere Konkurrenz, gute Conversion */
      midTail: [
        'äthiopisches Restaurant Salzburg',
        'halal Restaurant Salzburg',
        'veganes Restaurant Salzburg',
        'afrikanisches Restaurant Salzburg',
        'Essen mit Fingern Salzburg',
        'besonderes Restaurant Salzburg',
        'gesundes Restaurant Salzburg',
        'glutenfreies Restaurant Salzburg',
        'Kaffeezeremonie Salzburg',
        'äthiopische Küche Österreich',
        'Restaurant Schallmooser Hauptstraße',
        'glutenarmes Essen Salzburg',
        'Zöliakie Restaurant Salzburg',
        'ohne Weizen essen Salzburg',
        'Teff glutenfrei Salzburg',
      ],

      /** LONG-TAIL: Niedrige Konkurrenz, höchste Conversion */
      longTail: [
        'äthiopisches Restaurant Salzburg online bestellen',
        'halal veganes Restaurant Salzburg',
        'authentische äthiopische Küche Salzburg',
        'wo kann man in Salzburg besonders essen',
        'Restaurant mit Kaffeezeremonie Salzburg',
        'äthiopisches Essen mit Fingern Salzburg',
        'Injera Salzburg bestellen',
        'gesundes afrikanisches Essen Salzburg',
        'vegane äthiopische Gerichte Salzburg',
        'Teff Injera glutenfrei Salzburg',
        'äthiopische Gewürze Berbere Salzburg',
        'Tibs Kitfo Shiro Salzburg',
        'besondere Restaurants Salzburg Empfehlung',
        'äthiopische Kaffeezeremonie erleben Salzburg',
        'Superfood Teff gesund essen Salzburg',
        'Essen teilen gemeinsam Platte Salzburg',
        'afrikanische Kultur erleben Salzburg',
        'glutenfrei essen Salzburg Restaurant',
        'Zöliakie freundliches Restaurant Salzburg',
        'ohne Weizen ohne Gluten Restaurant Salzburg',
        'Teff Brot glutenfrei Salzburg',
        'natürlich glutenfreie Küche Salzburg',
        'äthiopisches Essen Zöliakie sicher',
        'Injera Teff glutenfrei bestellen Salzburg',
        'halal und glutenfrei Restaurant Salzburg',
        'vegan glutenfrei Salzburg essen gehen',
      ],

      /** KI-SEMANTISCHE CLUSTER (für ChatGPT, Perplexity, Google SGE) */
      aiSemantic: [
        'Wo kann ich in Salzburg halal und vegan essen',
        'Welche besonderen Restaurants gibt es in Salzburg',
        'Wo isst man in Salzburg mit den Händen',
        'Äthiopisches Restaurant in Salzburg mit Lieferung',
        'Gesundes exotisches Restaurant Salzburg',
        'Kaffeezeremonie Erlebnis Salzburg',
        'Glutenfreies Restaurant Salzburg Teff',
        'Wo kann ich in Salzburg glutenfrei essen',
        'Restaurant für Zöliakie Patienten Salzburg',
        'Salzburg Restaurant ohne Weizen',
        'Afrikanische Küche gesund Salzburg',
        'Superfood Restaurant Salzburg',
        'Halal und vegetarisch Salzburg',
      ],

      /** THEMATISCHE HINTERGRUND-KEYWORDS (immer im Content präsent) */
      thematic: [
        'halal', 'vegan', 'vegetarisch', 'frische Zutaten', 'Gemüse',
        'Superfood', 'gesund essen', 'Gewürze', 'afrikanisches Essen',
        'afrikanische Gewürze', 'Äthiopien', 'Österreich Äthiopien',
        'Salzburg Äthiopien', 'Kultur', 'afrikanische Kultur',
        'Essen mit Fingern', 'Gemeinschaftsgericht', 'Injera als Teller',
        'Berbere', 'Mitmita', 'Niter Kibbeh', 'Teff', 'glutenfrei',
        'glutenarm', 'ohne Weizen', 'Zöliakie', 'Weizenunverträglichkeit',
        'Kaffeezeremonie', 'Jebena', 'Fastengerichte', 'Eritreisch',
      ],
    },

    // ── Open Graph (Social Sharing) ──────────────────────────────────────
    openGraph: {
      siteName: 'HABESHA – Äthiopisches Restaurant Salzburg',
      type: 'restaurant',
      locale: 'de_AT',
      image: 'https://www.habesha-salzburg.at/og-image.jpg',
      imageAlt: 'HABESHA – Äthiopisches Restaurant Salzburg – Injera und Wot-Gerichte',
      imageWidth: 1200,
      imageHeight: 630,
    },

    // ── Schema.org JSON-LD ───────────────────────────────────────────────
    schema: {
      type: ['Restaurant', 'FoodEstablishment'],
      servesCuisine: ['Ethiopian', 'African', 'Eritrean', 'Äthiopisch', 'Afrikanisch'],
      priceRange: '€€',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      currenciesAccepted: 'EUR',
      amenityFeature: [
        'Halal', 'Vegan Options', 'Vegetarian Options',
        'Gluten-Free Options', 'Takeaway', 'Delivery', 'Reservations',
      ],
    },
  },
} as const;

export type RestaurantConfig = typeof RESTAURANT_CONFIG;
