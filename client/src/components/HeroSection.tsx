import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLang } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

// CDN URLs der echten Bilder
const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/119502_0127f8b3.jpg';

export default function HeroSection() {
  const { t, lang } = useLang();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    const timer = setTimeout(() => {
      el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCulture = () => {
    document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Äthiopische Speisen bei Habesha"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        {/* Subtle green tint */}
        <div className="absolute inset-0 bg-[#1a3a32]/20" />
      </div>

      {/* Ethiopian flag stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#078930]" />
        <div className="flex-1 bg-[#FCDD09]" />
        <div className="flex-1 bg-[#DA121A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Subtitle */}
        <p className="text-[#d4af37] text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium">
          {t.hero_subtitle}
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className={`font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-2 leading-none ${
            lang === 'am' ? 'font-ethiopic' : ''
          }`}
        >
          {t.hero_title_main}
        </h1>

        {/* Sub Title */}
        <p className="text-white/80 text-lg md:text-xl tracking-[0.15em] uppercase mb-10">
          {t.hero_title_sub}
        </p>

        {/* Ethiopian flag decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="h-[2px] w-12 rounded-full" style={{ background: '#078930' }} />
          <div className="h-[2px] w-12 rounded-full" style={{ background: '#FCDD09' }} />
          <div className="h-[2px] w-12 rounded-full" style={{ background: '#DA121A' }} />
          <div className="w-2 h-2 rounded-full border-2 border-white/60 mx-1" />
          <div className="h-[2px] w-12 rounded-full" style={{ background: '#DA121A' }} />
          <div className="h-[2px] w-12 rounded-full" style={{ background: '#FCDD09' }} />
          <div className="h-[2px] w-12 rounded-full" style={{ background: '#078930' }} />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="btn-premium px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase min-w-[200px]"
          >
            {t.hero_cta_menu}
          </button>
          <Link
            href="/reservierung"
            className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase min-w-[200px] border-2 border-white text-white hover:bg-white hover:text-[#1a3a32] transition-all duration-300 text-center"
          >
            {t.hero_cta_reserve}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToCulture}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Nach unten scrollen"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
