import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useLang, Lang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

// CDN URLs für die Hintergrundbilder
const TEXTILE_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/navbar-textile-pattern_ee4e72f4.jpg';
const MANUSCRIPT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/gaesteerlebnis-bg_ebbf3e17.jpg';

// Sektions-Konfiguration: welche Sektion → welcher Navbar-Stil
type NavTheme = 'transparent' | 'textile' | 'manuscript' | 'dark' | 'light';

const SECTION_THEMES: { id: string; theme: NavTheme }[] = [
  { id: 'hero',     theme: 'transparent' }, // Hero: komplett transparent
  { id: 'culture',  theme: 'textile' },     // Kultur: Textilmuster
  { id: 'press',    theme: 'dark' },        // Presse: dunkelgrün
  { id: 'menu',     theme: 'manuscript' },  // Speisekarte: Manuskript
  { id: 'kaffee',   theme: 'manuscript' },  // Kaffee: Manuskript
  { id: 'reviews',  theme: 'manuscript' },  // Bewertungen: Manuskript
  { id: 'contact',  theme: 'dark' },        // Kontakt: dunkelgrün
];

// Flag emoji + label for each language
const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'am', flag: '🇪🇹', label: 'አማርኛ' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { itemCount } = useCart();
  const [activeTheme, setActiveTheme] = useState<NavTheme>('transparent');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [location] = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  const isHome = location === '/';

  // ── IntersectionObserver: aktive Sektion erkennen ──────────────────────────
  useEffect(() => {
    if (!isHome) {
      setActiveTheme('light');
      return;
    }

    // Erst nach kurzem Delay beobachten, damit DOM gerendert ist
    const timer = setTimeout(() => {
      const observers: IntersectionObserver[] = [];

      SECTION_THEMES.forEach(({ id, theme }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveTheme(theme);
              }
            });
          },
          {
            // Trigger wenn Sektion oben in den Viewport kommt (Navbar-Höhe ~80px)
            rootMargin: '-80px 0px -60% 0px',
            threshold: 0,
          }
        );
        obs.observe(el);
        observers.push(obs);
      });

      return () => observers.forEach(o => o.disconnect());
    }, 100);

    return () => clearTimeout(timer);
  }, [isHome, location]);

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
    { label: t.nav_home,     action: () => scrollTo('hero') },
    { label: t.nav_culture,  action: () => scrollTo('culture') },
    { label: t.nav_menu,     action: () => scrollTo('menu') },
    { label: t.nav_reviews,  action: () => scrollTo('reviews') },
    { label: t.nav_contact,  action: () => scrollTo('contact') },
  ];

  // ── Theme-abhängige Styles ──────────────────────────────────────────────────
  const isTransparent = activeTheme === 'transparent';
  const isDark = activeTheme === 'dark';
  const isTextile = activeTheme === 'textile';
  const isManuscript = activeTheme === 'manuscript';

  // Hintergrund-Style für den Header
  const headerStyle: React.CSSProperties = (() => {
    if (isTransparent) return {};
    if (isTextile) return {
      backgroundImage: `url('${TEXTILE_BG}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
    };
    if (isManuscript) return {
      backgroundImage: `url('${MANUSCRIPT_BG}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
    };
    if (isDark) return {
      backgroundColor: '#1a3a32',
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
    };
    // light fallback
    return { backgroundColor: '#fdfbf7', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' };
  })();

  // Overlay-Farbe je nach Theme
  const overlayClass = (() => {
    if (isTextile)    return 'absolute inset-0 bg-[#fdfbf7]/80 backdrop-blur-[1px] pointer-events-none';
    if (isManuscript) return 'absolute inset-0 bg-[#fdfbf7]/82 backdrop-blur-[1px] pointer-events-none';
    return null;
  })();

  // Text-Farben je nach Theme
  const textColor = (isDark || isTransparent) ? 'text-white' : 'text-[#1a3a32]';
  const textColorMuted = (isDark || isTransparent) ? 'text-white/90' : 'text-[#1a3a32]';
  const borderColor = (isDark || isTransparent) ? 'border-white/30 hover:border-white/60' : 'border-[#1a3a32]/20 hover:border-[#d4af37]';
  const reserveBtnClass = isDark || isTransparent
    ? 'bg-[#d4af37] text-[#1a3a32] hover:bg-white hover:text-[#1a3a32]'
    : 'bg-[#1a3a32] text-white hover:bg-[#d4af37] hover:text-[#1a3a32]';

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={headerStyle}
    >
      {/* Overlay (nur bei Textil/Manuskript) */}
      {overlayClass && <div className={overlayClass} />}

      {/* Ethiopian flag stripe – immer sichtbar */}
      <div className="relative z-10 h-[3px] flex w-full">
        <div className="flex-1 bg-[#078930]" />
        <div className="flex-1 bg-[#FCDD09]" />
        <div className="flex-1 bg-[#DA121A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className={`font-serif text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300 ${textColor}`}>
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
                className={`relative text-xs font-semibold tracking-[0.12em] uppercase px-3 py-2 transition-colors duration-300 hover:text-[#d4af37] group ${textColorMuted}`}
              >
                {label}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4af37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </button>
            ))}
            <Link
              href="/blog"
              className={`relative text-xs font-semibold tracking-[0.12em] uppercase px-3 py-2 transition-colors duration-300 hover:text-[#d4af37] group ${textColorMuted}`}
            >
              Blog
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4af37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </Link>
            <Link
              href="/faq"
              className={`relative text-xs font-semibold tracking-[0.12em] uppercase px-3 py-2 transition-colors duration-300 hover:text-[#d4af37] group ${textColorMuted}`}
            >
              FAQ
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4af37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Language Dropdown */}
            <div className="hidden md:block relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-sm ${textColorMuted} ${borderColor}`}
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
                className={`transition-colors duration-300 hover:text-[#d4af37] ${textColor}`}
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
              className={`hidden md:block text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm ${reserveBtnClass}`}
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
                <X size={24} className={textColor} />
              ) : (
                <Menu size={24} className={textColor} />
              )}
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Menu - fixed outside header, overflow-hidden fix */}
      {mobileOpen && (
        <div
          className="fixed left-0 right-0 md:hidden border-t border-[#1a3a32]/10 px-6 py-6 z-[49] overflow-y-auto"
          style={{
            top: '67px',
            maxHeight: 'calc(100vh - 67px)',
            ...(isTextile ? {
              backgroundImage: `url('${TEXTILE_BG}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : isManuscript ? {
              backgroundImage: `url('${MANUSCRIPT_BG}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : isDark || isTransparent ? {
              backgroundColor: '#1a3a32',
            } : {
              backgroundColor: '#fdfbf7',
            })
          }}
        >
          {(isTextile || isManuscript) && (
            <div className="absolute inset-0 bg-[#fdfbf7]/88 backdrop-blur-[2px] pointer-events-none" />
          )}
          <div className="relative z-10 space-y-4">
            {navLinks.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className={`block w-full text-left text-sm font-semibold tracking-wide uppercase transition-colors py-2.5 border-b hover:text-[#d4af37] ${
                  isDark || isTransparent
                    ? 'text-white border-white/10'
                    : 'text-[#1a3a32] border-[#1a3a32]/8'
                }`}
              >
                {label}
              </button>
            ))}
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-left text-sm font-semibold tracking-wide uppercase transition-colors py-2.5 border-b hover:text-[#d4af37] ${
                isDark || isTransparent
                  ? 'text-white border-white/10'
                  : 'text-[#1a3a32] border-[#1a3a32]/8'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-left text-sm font-semibold tracking-wide uppercase transition-colors py-2.5 border-b hover:text-[#d4af37] ${
                isDark || isTransparent
                  ? 'text-white border-white/10'
                  : 'text-[#1a3a32] border-[#1a3a32]/8'
              }`}
            >
              FAQ
            </Link>

            {/* Language switcher mobile */}
            <div className="flex items-center gap-2 pt-2">
              {LANG_OPTIONS.map(({ code, flag, label: lbl }) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setMobileOpen(false); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-all ${
                    lang === code
                      ? 'bg-[#1a3a32] text-white border-[#1a3a32]'
                      : isDark || isTransparent
                        ? 'text-white border-white/30 hover:border-white'
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
        </div>
      )}
    </>
  );
}
