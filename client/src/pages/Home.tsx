import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CultureSection from '@/components/CultureSection';
import PressSection from '@/components/PressSection';
import MenuSection from '@/components/MenuSection';
import CoffeeCeremonySection from '@/components/CoffeeCeremonySection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import FactCard from '@/components/FactCard';
import SpecialEventBanner from '@/components/SpecialEventBanner';
import SpecialEventPopup from '@/components/SpecialEventPopup';
import BlogTeaser from '@/components/BlogTeaser';

const MANUSCRIPT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/gaesteerlebnis-bg_ebbf3e17.jpg';
const TEXTILE_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/navbar-textile-pattern_ee4e72f4.jpg';

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "FoodEstablishment"],
  "@id": "https://www.habesha-salzburg.at/#restaurant",
  "name": "HABESHA – Äthiopisches Restaurant Salzburg",
  "alternateName": ["Habesha Salzburg", "Ethiopian Restaurant Salzburg", "African Restaurant Salzburg", "Äthiopisches Restaurant Salzburg"],
  "description": "HABESHA ist das einzige authentische äthiopische Restaurant in Salzburg. Es bietet authentische Habesha-Küche mit halal-zertifizierten, veganen und glutenfreien Gerichten sowie eine traditionelle äthiopische Kaffeezeremonie. Ideal für Veganer, Halal-Esser und alle, die gesund und bewusst essen möchten.",
  "url": "https://www.habesha-salzburg.at",
  "telephone": "+436607324766",
  "email": "restaurant@habesha-salzburg.at",
  "servesCuisine": ["Ethiopian", "Eritrean", "African", "Äthiopisch", "Halal", "Vegan", "Vegetarisch", "Glutenfrei"],
  "priceRange": "€€",
  "hasMenu": "https://www.habesha-salzburg.at/bestellen",
  "acceptsReservations": "True",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Schallmooser Hauptstraße 34",
    "addressLocality": "Salzburg",
    "postalCode": "5020",
    "addressCountry": "AT"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 47.8095, "longitude": 13.0555 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "17:00", "closes": "22:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Wednesday","Thursday","Friday"], "opens": "11:00", "closes": "22:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "13:00", "closes": "22:00" }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Halal", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Vegan Options", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Gluten-Free Options", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Delivery", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Coffee Ceremony", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Takeaway", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Online Ordering", "value": true }
  ],
  "sameAs": [
    "https://www.facebook.com/habesha.salzburg",
    "https://www.instagram.com/habesha.salzburg"
  ]
};

const HOME_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "HABESHA Salzburg",
      "item": "https://www.habesha-salzburg.at/"
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="HABESHA – Äthiopisches Restaurant Salzburg"
        description="Authentische äthiopische Küche in Salzburg. Halal, vegan & glutenfrei. Injera, Tibs, Kitfo – jetzt online bestellen oder Tisch reservieren. Ethiopian food Salzburg."
        canonical="https://www.habesha-salzburg.at/"
        keywords="äthiopisches Restaurant Salzburg, Ethiopian restaurant Salzburg, halal Restaurant Salzburg, veganes Restaurant Salzburg, glutenfreies Restaurant Salzburg, Injera Salzburg, Kaffeezeremonie Salzburg, African food Salzburg, Zöliakie Restaurant Salzburg, äthiopische Küche, Ethiopian food, äthiopisches Essen"
        ogType="restaurant"
        ogImageAlt="HABESHA – Äthiopisches Restaurant Salzburg – Injera mit Wot-Gerichten"
        structuredData={HOME_SCHEMA}
      />
      <Navbar />
      <SpecialEventBanner />
      <SpecialEventPopup />
      <HeroSection />

      {/* CultureSection: Textilmuster-Hintergrund */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(${TEXTILE_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Helles Overlay – Textilmuster leicht durchscheinend */}
        <div className="absolute inset-0 bg-[#fdfbf7]/80 pointer-events-none" />
        <div className="relative z-10">
          <CultureSection />
        </div>
      </div>

      {/* PressSection bis Gästebewertungen: Manuskript-Hintergrund */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(${MANUSCRIPT_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Helles Overlay über dem gesamten Bereich */}
        <div className="absolute inset-0 bg-[#fdfbf7]/85 pointer-events-none" />

        <div className="relative z-10">
          <PressSection />

          {/* Fakt 1: Injera – passend zur Speisekarte */}
          <FactCard factKey={1} variant="light" />

          <MenuSection />

          {/* Fakt 2: Kaffee – Übergang zur Kaffeezeremonie */}
          <FactCard factKey={2} variant="light" />

          <CoffeeCeremonySection />

          <ReviewsSection />
        </div>
      </div>

      {/* Fakt 3: Äthiopischer Kalender – im Footer-Bereich */}
      <FactCard factKey={3} variant="dark" />

      <BlogTeaser />

      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
