import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { X } from 'lucide-react';

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-[#1a3a32]/10 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#1a3a32]">{title}</h2>
          <button onClick={onClose} className="text-[#1a3a32]/60 hover:text-[#1a3a32] transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-6 text-[#1a3a32]/80 text-sm leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const { t, lang } = useLang();
  const [showImprint, setShowImprint] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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
              <button
                onClick={() => setShowImprint(true)}
                className={`text-white/40 text-xs hover:text-[#d4af37] transition-colors ${lang === 'am' ? 'font-ethiopic' : ''}`}
              >
                {t.footer_imprint}
              </button>
              <button
                onClick={() => setShowPrivacy(true)}
                className={`text-white/40 text-xs hover:text-[#d4af37] transition-colors ${lang === 'am' ? 'font-ethiopic' : ''}`}
              >
                {t.footer_privacy}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Impressum Modal */}
      {showImprint && (
        <Modal title={t.imprint_title} onClose={() => setShowImprint(false)}>
          <p><strong>Angaben gemäß § 5 ECG (E-Commerce-Gesetz)</strong></p>
          <p>
            <strong>Unternehmensbezeichnung:</strong> Habesha Äthiopisches Restaurant<br />
            <strong>Inhaber:</strong> Habtom G.<br />
            <strong>Adresse:</strong> Gebirgsjägerplatz 1, 5020 Salzburg, Österreich<br />
            <strong>Telefon:</strong> 0660 7324766<br />
            <strong>Unternehmensgegenstand:</strong> Gastronomie
          </p>
          <p>
            <strong>Haftungshinweis:</strong> Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </Modal>
      )}

      {/* Datenschutz Modal */}
      {showPrivacy && (
        <Modal title={t.privacy_title} onClose={() => setShowPrivacy(false)}>
          <p><strong>Datenschutzerklärung</strong></p>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
          </p>
          <p>
            <strong>Kontaktformular / Reservierungsformular:</strong><br />
            Die von Ihnen eingegebenen Daten (Name, Telefon, E-Mail, Datum, Uhrzeit, Personenanzahl) werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>
          <p>
            <strong>Google Maps:</strong><br />
            Diese Website verwendet Google Maps zur Darstellung einer interaktiven Karte. Bei der Nutzung von Google Maps werden Daten an Google LLC übertragen. Weitere Informationen finden Sie in der Datenschutzerklärung von Google.
          </p>
          <p>
            <strong>Stripe:</strong><br />
            Für die Zahlungsabwicklung verwenden wir Stripe. Ihre Zahlungsdaten werden verschlüsselt übertragen und von Stripe verarbeitet. Wir speichern keine Kreditkartendaten.
          </p>
          <p>
            <strong>Ihre Rechte:</strong><br />
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Wenden Sie sich dazu an: 0660 7324766
          </p>
        </Modal>
      )}
    </>
  );
}
