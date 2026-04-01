import { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type LegalSection = 'impressum' | 'datenschutz' | 'agb';

export default function Legal() {
  const [location] = useLocation();
  const section: LegalSection =
    location.includes('datenschutz') ? 'datenschutz' :
    location.includes('agb') ? 'agb' :
    'impressum';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  const tabs: { key: LegalSection; label: string }[] = [
    { key: 'impressum', label: 'Impressum' },
    { key: 'datenschutz', label: 'Datenschutz' },
    { key: 'agb', label: 'AGB' },
  ];

  const seoTitles: Record<LegalSection, string> = {
    impressum: 'Impressum',
    datenschutz: 'Datenschutzerklärung',
    agb: 'Allgemeine Geschäftsbedingungen',
  };
  const seoCanonicals: Record<LegalSection, string> = {
    impressum: 'https://www.habesha-salzburg.at/impressum',
    datenschutz: 'https://www.habesha-salzburg.at/datenschutz',
    agb: 'https://www.habesha-salzburg.at/agb',
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <SEOHead
        title={seoTitles[section]}
        description={`${seoTitles[section]} – HABESHA Äthiopisches Restaurant Salzburg, Schallmooser Hauptstraße 34, 5020 Salzburg.`}
        canonical={seoCanonicals[section]}
        noIndex={true}
      />
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1a3a32] tracking-wide mb-2">
              {section === 'impressum' ? 'Impressum' : section === 'datenschutz' ? 'Datenschutzerklärung' : 'Allgemeine Geschäftsbedingungen'}
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-10 border-b border-[#1a3a32]/10">
            {tabs.map(tab => (
              <a
                key={tab.key}
                href={`/${tab.key}`}
                className={`px-5 py-3 text-sm font-semibold tracking-wide transition-colors border-b-2 -mb-px ${
                  section === tab.key
                    ? 'border-[#d4af37] text-[#1a3a32]'
                    : 'border-transparent text-[#1a3a32]/50 hover:text-[#1a3a32]'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-[#1a3a32]/80 space-y-6">
            {section === 'impressum' && <Impressum />}
            {section === 'datenschutz' && <Datenschutz />}
            {section === 'agb' && <AGB />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-[#1a3a32] mb-3 pb-2 border-b border-[#d4af37]/30">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="font-semibold text-[#1a3a32] min-w-[180px]">{label}:</span>
      <span className="text-[#1a3a32]/70">{value}</span>
    </div>
  );
}

function Impressum() {
  return (
    <>
      <Section title="Angaben gemäß § 5 ECG">
        <Row label="Unternehmensname" value="Habesha Cafe Bar & Restaurant e.U." />
        <Row label="Betriebsart" value="Gastgewerbe in der Betriebsart Restaurant" />
        <Row label="Inhaber" value="Herr Daniel Yemane" />
        <Row label="Adresse" value="Stauffeneggstraße 29/10, 5020 Salzburg, Austria" />
        <Row label="Firmenbuchnummer" value="FN 632525 i" />
        <Row label="UID-Nummer" value="ATU80437047" />
        <Row label="Firmenbuchgericht" value="Landesgericht Salzburg" />
        <Row label="Telefon" value={<a href="tel:+436607324766" className="text-[#d4af37] hover:underline">+43 660 732 4766</a>} />
        <Row label="E-Mail" value={<a href="mailto:restaurant@habesha-salzburg.at" className="text-[#d4af37] hover:underline">restaurant@habesha-salzburg.at</a>} />
        <Row label="Website" value={<a href="https://www.habesha-salzburg.at" className="text-[#d4af37] hover:underline">www.habesha-salzburg.at</a>} />
      </Section>

      <Section title="Aufsicht & Mitgliedschaften">
        <Row label="Aufsichtsbehörde" value="Magistrat der Stadt Salzburg" />
        <Row label="Mitgliedschaft" value="Wirtschaftskammer Salzburg (WKÖ)" />
        <Row label="Gewerbeordnung" value={<a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">www.ris.bka.gv.at</a>} />
      </Section>

      <Section title="Online-Streitbeilegung">
        <p>
          Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten:{' '}
          <a href="http://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">
            http://ec.europa.eu/odr
          </a>
          . Sie können allfällige Beschwerden auch an die oben angegebene E-Mail-Adresse richten.
        </p>
        <p className="text-[#1a3a32]/60 text-xs mt-2">
          Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>
    </>
  );
}

function Datenschutz() {
  return (
    <>
      <Section title="Verantwortlicher">
        <p>Daniel Yemane, Stauffeneggstraße 29/10, 5020 Salzburg</p>
        <p>
          Kontakt:{' '}
          <a href="mailto:restaurant@habesha-salzburg.at" className="text-[#d4af37] hover:underline">
            restaurant@habesha-salzburg.at
          </a>
        </p>
      </Section>

      <Section title="1. Datenverarbeitung bei Bestellung">
        <p>
          Für die Abwicklung Ihrer Online-Bestellung speichern wir: Name, Adresse, Telefonnummer, E-Mail-Adresse und die gewählte Zahlungsmethode.
          Dies ist zur Vertragserfüllung notwendig (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          <strong>Speicherdauer:</strong> Bestelldaten werden gemäß § 132 BAO und § 212 UGB für 7 Jahre aufbewahrt und danach gelöscht.
        </p>
      </Section>

      <Section title="2. Zahlungsdienstleister (Stripe)">
        <p>
          Wir bieten Online-Zahlungen via Stripe an. Bei Auswahl einer Online-Zahlungsart (Kreditkarte, Google Pay, Apple Pay etc.) werden Ihre
          Zahlungsdaten sicher an Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland übermittelt.
          Dies erfolgt ausschließlich zum Zweck der Zahlungsabwicklung. Ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO ist abgeschlossen.
        </p>
      </Section>

      <Section title="3. Eigene Zustellung">
        <p>
          Ihre Adressdaten werden an unsere hauseigenen Fahrer weitergegeben, um die Zustellung durchzuführen.
          Eine Weitergabe an externe Logistikplattformen findet nicht statt.
        </p>
      </Section>

      <Section title="4. E-Mail-Versand (EmailJS)">
        <p>
          Für den Versand von Bestellbestätigungen nutzen wir EmailJS (EmailJS Ltd., Großbritannien). Dabei werden Name und
          E-Mail-Adresse des Bestellers sowie Bestelldetails übermittelt. Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung). Ein Auftragsverarbeitungsvertrag (AVV) ist abgeschlossen.
        </p>
      </Section>

      <Section title="5. Inhalts-Verwaltungssystem (Sanity CMS)">
        <p>
          Speisekarte und Veranstaltungsinhalte werden über Sanity (Sanity AS, Norwegen) verwaltet.
          Dabei werden ausschließlich redaktionelle Inhaltsdaten (Gerichte, Preise, Bilder) verarbeitet – keine personenbezogenen Kundendaten.
          Ein Auftragsverarbeitungsvertrag (AVV) ist abgeschlossen.
        </p>
      </Section>

      <Section title="6. Google Analytics">
        <p>
          Diese Website nutzt Google Analytics zur Analyse der Website-Nutzung. Daten werden anonymisiert erhoben (IP-Anonymisierung aktiv).
          Die Verarbeitung erfolgt nur nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) über unseren Cookie-Banner.
          Sie können Ihre Einwilligung jederzeit widerrufen.
        </p>
      </Section>

      <Section title="7. Ihre Rechte">
        <p>
          Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung und Widerspruch zu.
          Kontaktieren Sie uns dazu bitte unter{' '}
          <a href="mailto:restaurant@habesha-salzburg.at" className="text-[#d4af37] hover:underline">
            restaurant@habesha-salzburg.at
          </a>
          .
        </p>
        <p>
          Beschwerderecht bei der Österreichischen Datenschutzbehörde:{' '}
          <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">
            www.dsb.gv.at
          </a>
        </p>
      </Section>
    </>
  );
}

function AGB() {
  return (
    <>
      <Section title="§ 1 Geltungsbereich">
        <p>
          Diese AGB gelten für alle Bestellungen über die Website{' '}
          <a href="https://www.habesha-salzburg.at" className="text-[#d4af37] hover:underline">www.habesha-salzburg.at</a>{' '}
          zwischen dem Kunden und der Habesha Cafe Bar & Restaurant e.U.
        </p>
      </Section>

      <Section title="§ 2 Vertragsschluss">
        <p>
          Die Darstellung der Speisen ist kein bindendes Angebot. Erst durch Klicken auf den Button „Zahlungspflichtig bestellen"
          gibt der Kunde eine verbindliche Bestellung ab.
        </p>
      </Section>

      <Section title="§ 3 Zahlung & Preise">
        <p>Alle Preise verstehen sich in Euro inkl. der gesetzlichen MwSt.</p>
        <p><strong>Online-Zahlung:</strong> Erfolgt via Stripe (Kreditkarte, Google Pay, Apple Pay). Bei Lieferung ist ausschließlich Online-Zahlung möglich.</p>
        <p><strong>Barzahlung:</strong> Nur bei Abholung im Restaurant möglich.</p>
      </Section>

      <Section title="§ 4 Lieferung durch eigene Fahrer">
        <p>1. Wir liefern mit eigenem Personal im ausgewiesenen Liefergebiet.</p>
        <p>2. Der Kunde muss zum Lieferzeitpunkt unter der angegebenen Adresse erreichbar sein.</p>
        <p>
          3. Da unsere Speisen frisch zubereitet werden, bleibt die Zahlungspflicht auch bei Unzustellbarkeit
          aufgrund falscher Angaben oder Abwesenheit des Kunden bestehen.
        </p>
      </Section>

      <Section title="§ 5 Ausschluss des Widerrufsrechts">
        <p>
          Gemäß § 18 Abs 1 Z 10 FAGG besteht kein Widerrufsrecht für Waren, die schnell verderben können
          (frisch zubereitete Speisen und offene Getränke). Eine Stornierung nach Beginn der Zubereitung ist ausgeschlossen.
        </p>
      </Section>

      <Section title="§ 6 Mängel & Reklamation">
        <p>
          Sollte ein Grund zur Beanstandung vorliegen, kontaktieren Sie uns bitte sofort telefonisch unter{' '}
          <a href="tel:+436607324766" className="text-[#d4af37] hover:underline">+43 660 732 4766</a>.
          Eine Erstattung oder Nachbesserung erfolgt nur gegen Rückgabe der nicht verzehrten Ware.
        </p>
      </Section>

      <Section title="§ 7 Jugendschutz">
        <p>
          Alkoholische Getränke werden nur an Personen ab dem gesetzlich vorgeschriebenen Mindestalter
          (18 Jahre für Spirituosen, 16 Jahre für Wein/Bier) abgegeben.
        </p>
      </Section>
    </>
  );
}
