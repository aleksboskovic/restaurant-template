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

const MANUSCRIPT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/gaesteerlebnis-bg_ebbf3e17.jpg';
const TEXTILE_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/navbar-textile-pattern_ee4e72f4.jpg';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
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

      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
