import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useLang, Lang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

// Flag emoji + label for each language
const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'am', flag: '🇪🇹', label: 'አማርኛ' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [location] = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  const isHome = location === '/';
  const isTransparent = !isScrolled && isHome;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentLang = LANG_OPTIONS.find(l => l.code === lang)!;

  const navLinks = [
    { label: t.nav_home, action: () => scrollTo('hero') },
    { label: t.nav_culture, action: () => scrollTo('culture') },
    { label: t.nav_menu, action: () => scrollTo('menu') },
    { label: t.nav_reviews, action: () => scrollTo('reviews') },
    { label: t.nav_contact, action: () => scrollTo('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent ? 'bg-transparent' : 'bg-[#fdfbf7]/96 backdrop-blur-md shadow-sm'
      }`}
    >
      {/* Ethiopian flag stripe at very top */}
      <div className="h-[3px] flex w-full">
        <div className="flex-1 bg-[#078930]" />
        <div className="flex-1 bg-[#FCDD09]" />
        <div className="flex-1 bg-[#DA121A]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className={`font-serif text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-[#1a3a32]'
            }`}>
              HABESHA
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] transition-colors duration-300">
              Äthiopisches Restaurant
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className={`relative text-xs font-semibold tracking-[0.12em] uppercase px-3 py-2 transition-colors duration-300 hover:text-[#d4af37] group ${
                  isTransparent ? 'text-white/90' : 'text-[#1a3a32]'
                }`}
              >
                {label}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4af37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Language Dropdown */}
            <div className="hidden md:block relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-sm ${
                  isTransparent
                    ? 'border-white/30 text-white hover:border-white/60'
                    : 'border-[#1a3a32]/20 text-[#1a3a32] hover:border-[#d4af37]'
                }`}
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-[#1a3a32]/10 overflow-hidden min-w-[140px] z-50">
                  {LANG_OPTIONS.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#1a3a32]/5 ${
                        lang === code ? 'bg-[#1a3a32]/8 font-semibold text-[#1a3a32]' : 'text-[#1a3a32]/80'
                      } ${code === 'am' ? 'font-ethiopic' : ''}`}
                    >
                      <span className="text-lg leading-none">{flag}</span>
                      <span>{label}</span>
                      {lang === code && <span className="ml-auto text-[#d4af37]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/bestellen" className="relative p-1">
              <ShoppingCart
                size={22}
                className={`transition-colors duration-300 hover:text-[#d4af37] ${
                  isTransparent ? 'text-white' : 'text-[#1a3a32]'
                }`}
              />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DA121A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Reserve Button */}
            <Link
              href="/reservierung"
              className="hidden md:block bg-[#1a3a32] text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-[#d4af37] hover:text-[#1a3a32] transition-all duration-300 shadow-sm"
            >
              {t.nav_reserve}
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              {mobileOpen ? (
                <X size={24} className={isTransparent ? 'text-white' : 'text-[#1a3a32]'} />
              ) : (
                <Menu size={24} className={isTransparent ? 'text-white' : 'text-[#1a3a32]'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-t border-[#1a3a32]/10 px-6 py-6 space-y-4">
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="block w-full text-left text-sm font-semibold tracking-wide uppercase text-[#1a3a32] hover:text-[#d4af37] transition-colors py-2.5 border-b border-[#1a3a32]/8"
            >
              {label}
            </button>
          ))}

          {/* Language switcher mobile */}
          <div className="flex items-center gap-2 pt-2">
            {LANG_OPTIONS.map(({ code, flag, label }) => (
              <button
                key={code}
                onClick={() => { setLang(code); setMobileOpen(false); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-all ${
                  lang === code
                    ? 'bg-[#1a3a32] text-white border-[#1a3a32]'
                    : 'text-[#1a3a32] border-[#1a3a32]/20 hover:border-[#d4af37]'
                } ${code === 'am' ? 'font-ethiopic' : ''}`}
              >
                <span className="text-base leading-none">{flag}</span>
                <span className="text-xs">{code.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href="/reservierung"
              onClick={() => setMobileOpen(false)}
              className="flex-1 bg-[#1a3a32] text-white text-center text-xs font-semibold tracking-widest uppercase px-4 py-3 rounded-full hover:bg-[#d4af37] hover:text-[#1a3a32] transition-all"
            >
              {t.nav_reserve}
            </Link>
            <Link
              href="/bestellen"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-xs font-semibold tracking-widest uppercase px-4 py-3 rounded-full border-2 border-[#1a3a32] text-[#1a3a32] hover:bg-[#1a3a32] hover:text-white transition-all"
            >
              {t.nav_order}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
