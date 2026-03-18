import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLang, Lang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const langs: { code: Lang; label: string }[] = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'am', label: 'አማ' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome ? 'glass-header shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className={`font-serif text-xl md:text-2xl font-bold tracking-wider transition-colors ${
                isScrolled || !isHome ? 'text-[#1a3a32]' : 'text-white'
              }`}
            >
              HABESHA
            </span>
            <span
              className={`text-[10px] tracking-[0.25em] uppercase transition-colors ${
                isScrolled || !isHome ? 'text-[#d4af37]' : 'text-[#d4af37]'
              }`}
            >
              Äthiopisches Restaurant
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: t.nav_home, action: () => scrollTo('hero') },
              { label: t.nav_culture, action: () => scrollTo('culture') },
              { label: t.nav_menu, action: () => scrollTo('menu') },
              { label: t.nav_reviews, action: () => scrollTo('reviews') },
              { label: t.nav_contact, action: () => scrollTo('contact') },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#d4af37] ${
                  isScrolled || !isHome ? 'text-[#1a3a32]' : 'text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 border border-[#d4af37]/40 rounded-full px-2 py-1">
              {langs.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`text-xs px-2 py-0.5 rounded-full transition-all font-medium ${
                    lang === code
                      ? 'bg-[#1a3a32] text-white'
                      : isScrolled || !isHome
                      ? 'text-[#1a3a32] hover:text-[#d4af37]'
                      : 'text-white hover:text-[#d4af37]'
                  } ${code === 'am' ? 'font-ethiopic' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Cart */}
            <Link href="/bestellen" className="relative">
              <ShoppingCart
                size={22}
                className={`transition-colors ${
                  isScrolled || !isHome ? 'text-[#1a3a32]' : 'text-white'
                } hover:text-[#d4af37]`}
              />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Reserve Button */}
            <Link
              href="/reservierung"
              className="hidden md:block btn-premium text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
            >
              {t.nav_reserve}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              {mobileOpen ? (
                <X size={24} className={isScrolled || !isHome ? 'text-[#1a3a32]' : 'text-white'} />
              ) : (
                <Menu size={24} className={isScrolled || !isHome ? 'text-[#1a3a32]' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-t border-[#1a3a32]/10 px-6 py-6 space-y-4">
          {[
            { label: t.nav_home, action: () => scrollTo('hero') },
            { label: t.nav_culture, action: () => scrollTo('culture') },
            { label: t.nav_menu, action: () => scrollTo('menu') },
            { label: t.nav_reviews, action: () => scrollTo('reviews') },
            { label: t.nav_contact, action: () => scrollTo('contact') },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="block w-full text-left text-sm font-medium tracking-wide uppercase text-[#1a3a32] hover:text-[#d4af37] transition-colors py-2 border-b border-[#1a3a32]/10"
            >
              {label}
            </button>
          ))}

          {/* Language switcher mobile */}
          <div className="flex items-center gap-2 pt-2">
            {langs.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { setLang(code); setMobileOpen(false); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                  lang === code
                    ? 'bg-[#1a3a32] text-white border-[#1a3a32]'
                    : 'text-[#1a3a32] border-[#1a3a32]/30 hover:border-[#d4af37]'
                } ${code === 'am' ? 'font-ethiopic' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href="/reservierung"
              onClick={() => setMobileOpen(false)}
              className="flex-1 btn-premium text-center text-xs font-semibold tracking-widest uppercase px-4 py-3 rounded-full"
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
