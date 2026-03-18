import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CultureSection from '@/components/CultureSection';
import PressSection from '@/components/PressSection';
import MenuSection from '@/components/MenuSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CultureSection />
      <PressSection />
      <MenuSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
