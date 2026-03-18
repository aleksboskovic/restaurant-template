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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CultureSection />
      <PressSection />

      {/* Fakt 1: Injera – passend zur Speisekarte */}
      <FactCard factKey={1} variant="light" />

      <MenuSection />

      {/* Fakt 2: Kaffee – Übergang zur Kaffeezeremonie */}
      <FactCard factKey={2} variant="light" />

      <CoffeeCeremonySection />

      <ReviewsSection />

      {/* Fakt 3: Äthiopischer Kalender – im Footer-Bereich */}
      <FactCard factKey={3} variant="dark" />

      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
