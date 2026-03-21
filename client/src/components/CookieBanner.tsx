import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { X, ChevronDown, ChevronUp, Shield, BarChart2, Megaphone } from 'lucide-react';

export type CookieConsent = {
  necessary: true;       // immer true, nicht änderbar
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const STORAGE_KEY = 'habesha_cookie_consent';
const CONSENT_VERSION = 1; // erhöhen wenn neue Kategorien hinzukommen

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.consent as CookieConsent;
  } catch {
    return null;
  }
}

function saveCookieConsent(consent: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: CONSENT_VERSION, consent }));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      // Kurze Verzögerung damit die Seite zuerst lädt
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  function acceptAll() {
    saveCookieConsent({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });
    setVisible(false);
  }

  function rejectAll() {
    saveCookieConsent({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });
    setVisible(false);
  }

  function saveSelection() {
    saveCookieConsent({ necessary: true, analytics, marketing, timestamp: Date.now() });
    setVisible(false);
  }

  return (
    <>
      {/* Backdrop blur on mobile */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] md:hidden" />

      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] md:bottom-6 md:left-6 md:right-auto md:max-w-md"
        role="dialog"
        aria-modal="true"
        aria-label="Cookie-Einstellungen"
      >
        <div className="bg-[#1a1208] border border-[#c9a84c]/30 md:rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          {/* Gold top border */}
          <div className="h-0.5 bg-gradient-to-r from-[#2d6a4f] via-[#c9a84c] to-[#c0392b]" />

          <div className="p-5 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <h2 className="text-white font-serif text-base leading-tight">
                    Ihre Privatsphäre
                  </h2>
                  <p className="text-white/40 text-xs">Habesha Restaurant Salzburg</p>
                </div>
              </div>
              <button
                onClick={rejectAll}
                className="text-white/30 hover:text-white/60 transition-colors mt-0.5 flex-shrink-0"
                aria-label="Schließen (nur notwendige Cookies)"
              >
                <X size={16} />
              </button>
            </div>

            {/* Text */}
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten.
              Notwendige Cookies sind für den Betrieb erforderlich. Weitere Cookies helfen uns,
              die Website zu verbessern.{' '}
              <Link href="/datenschutz">
                <span className="text-[#c9a84c] hover:underline cursor-pointer">
                  Datenschutzerklärung
                </span>
              </Link>
            </p>

            {/* Expandable details */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 text-[#c9a84c]/70 hover:text-[#c9a84c] text-xs mb-4 transition-colors"
            >
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetails ? 'Weniger anzeigen' : 'Einstellungen anpassen'}
            </button>

            {showDetails && (
              <div className="space-y-3 mb-5 border border-[#c9a84c]/15 rounded-xl p-4 bg-black/20">
                {/* Notwendige Cookies */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Shield size={14} className="text-[#2d6a4f] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs font-medium">Notwendige Cookies</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                        Warenkorb, Session, Sicherheit. Immer aktiv.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[#2d6a4f] text-xs font-medium bg-[#2d6a4f]/15 px-2 py-0.5 rounded-full">
                      Immer aktiv
                    </span>
                  </div>
                </div>

                {/* Analyse */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <BarChart2 size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs font-medium">Analyse-Cookies</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                        Helfen uns zu verstehen, wie die Website genutzt wird (z.B. Google Analytics).
                      </p>
                    </div>
                  </div>
                  <button
                    role="switch"
                    aria-checked={analytics}
                    onClick={() => setAnalytics(!analytics)}
                    className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 ${
                      analytics ? 'bg-[#c9a84c]' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                        analytics ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Megaphone size={14} className="text-[#c0392b] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs font-medium">Marketing-Cookies</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                        Für personalisierte Werbung auf externen Plattformen (z.B. Facebook Pixel).
                      </p>
                    </div>
                  </div>
                  <button
                    role="switch"
                    aria-checked={marketing}
                    onClick={() => setMarketing(!marketing)}
                    className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 ${
                      marketing ? 'bg-[#c9a84c]' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                        marketing ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={acceptAll}
                className="w-full bg-[#c9a84c] hover:bg-[#b8963d] text-[#1a1208] font-bold text-sm py-2.5 px-4 rounded-xl transition-colors"
              >
                Alle akzeptieren
              </button>
              <div className="flex gap-2">
                {showDetails ? (
                  <button
                    onClick={saveSelection}
                    className="flex-1 border border-[#c9a84c]/40 hover:border-[#c9a84c]/70 text-white/80 hover:text-white text-sm py-2 px-4 rounded-xl transition-colors"
                  >
                    Auswahl speichern
                  </button>
                ) : (
                  <button
                    onClick={rejectAll}
                    className="flex-1 border border-white/15 hover:border-white/30 text-white/50 hover:text-white/80 text-sm py-2 px-4 rounded-xl transition-colors"
                  >
                    Nur notwendige
                  </button>
                )}
              </div>
            </div>

            {/* Legal note */}
            <p className="text-white/25 text-xs text-center mt-3 leading-relaxed">
              Gem. DSGVO Art. 7 können Sie Ihre Einwilligung jederzeit widerrufen.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
