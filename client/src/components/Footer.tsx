import { useLang } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { openCookieSettings } from './CookieBanner';

export default function Footer() {
  const { t, lang } = useLang();


  return (
    <>
      <footer className="bg-[#0a0a0a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">HABESHA</h3>
              <p className="text-[#d4af37] text-xs tracking-[0.25em] uppercase mb-4">Äthiopisches Restaurant</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Gebirgsjägerplatz 1<br />
                5020 Salzburg, Österreich
              </p>
              {/* Ethiopian flag */}
              <div className="flex gap-1 mt-4">
                <div className="h-1 w-8 rounded-full bg-[#078930]" />
                <div className="h-1 w-8 rounded-full bg-[#FCDD09]" />
                <div className="h-1 w-8 rounded-full bg-[#DA121A]" />
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[#d4af37] text-xs tracking-[0.25em] uppercase font-medium mb-4">Navigation</h4>
              <ul className="space-y-2">
                {[
                  { label: t.nav_home, href: '/' },
                  { label: t.nav_menu, href: '/#menu' },
                  { label: t.nav_reserve, href: '/reservierung' },
                  { label: t.nav_order, href: '/bestellen' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`text-white/60 text-sm hover:text-[#d4af37] transition-colors ${lang === 'am' ? 'font-ethiopic' : ''}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#d4af37] text-xs tracking-[0.25em] uppercase font-medium mb-4">Kontakt</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <p>
                  <a href="tel:+436607324766" className="hover:text-[#d4af37] transition-colors">
                    0660 7324766
                  </a>
                </p>
                <p>
                  <a href="mailto:restaurant@habesha-salzburg.at" className="hover:text-[#d4af37] transition-colors">
                    restaurant@habesha-salzburg.at
                  </a>
                </p>
                <p className={`${lang === 'am' ? 'font-ethiopic' : ''} text-xs leading-relaxed`}>
                  Mi–Fr: 11–14 & 17–22 Uhr<br />
                  Sa–So: 13–22 Uhr<br />
                  Di: 17–22 Uhr | Mo: Geschlossen
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-white/40 text-xs ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.footer_copyright}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/impressum" className={`text-white/40 text-xs hover:text-[#d4af37] transition-colors ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.footer_imprint}
              </Link>
              <Link href="/datenschutz" className={`text-white/40 text-xs hover:text-[#d4af37] transition-colors ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.footer_privacy}
              </Link>
              <Link href="/agb" className="text-white/40 text-xs hover:text-[#d4af37] transition-colors">
                AGB
              </Link>
              <button
                onClick={openCookieSettings}
                className="text-white/40 text-xs hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>
      </footer>


    </>
  );
}
