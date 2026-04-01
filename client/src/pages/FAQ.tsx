import { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';

const faqCategories = [
  {
    category: 'Küche & Kultur',
    icon: '🌍',
    questions: [
      {
        q: 'Muss ich bei euch mit den Händen essen?',
        a: 'Äthiopische Küche wird traditionell mit den Händen gegessen – das gehört zur Kultur und macht das Erlebnis besonders. Man reißt ein Stück Injera ab und greift damit Soßen und Beilagen. Natürlich kannst du auch mit Besteck essen – sag uns einfach Bescheid und wir bringen es dir gerne.',
      },
      {
        q: 'Was genau ist "Injera" und woraus besteht es?',
        a: 'Injera ist das Herzstück der Habesha-Küche – ein weiches, luftiges Sauerteig-Fladenbrot aus Teff-Mehl (Zwerghirse). Teff ist ein traditionelles äthiopisches Getreide: extrem eisenreich, ballaststoffreich und von Natur aus glutenfrei. Injera dient gleichzeitig als Teller und Besteck.',
      },
      {
        q: 'Ist afrikanisches Essen immer sehr scharf?',
        a: 'Nein, bei uns ist für jeden Geschmack etwas dabei! Gerichte mit unserer Gewürzmischung Berbere (Chili, Ingwer, Knoblauch) sind pikant bis scharf (oft „Wot" genannt). Viele unserer Gerichte sind aber mild und aromatisch – sogenannte „Alicha"-Gerichte mit Kurkuma und Ingwer.',
      },
      {
        q: 'Was ist Berbere?',
        a: 'Berbere ist die wichtigste Gewürzmischung der äthiopischen Küche – eine Komposition aus Chili, Ingwer, Knoblauch, Kreuzkümmel und weiteren Gewürzen. Sie gibt vielen Gerichten ihre typische rote Farbe und ihren komplexen, aromatischen Geschmack.',
      },
      {
        q: 'Was ist Misir Wot?',
        a: 'Misir Wot ist ein würziger roter Linseneintopf mit Berbere-Gewürz – eines unserer beliebtesten veganen Gerichte. Reich an Protein und Ballaststoffen und absolut empfehlenswert für Erstbesucher.',
      },
      {
        q: 'Was macht das Habesha Restaurant in Salzburg besonders?',
        a: 'Das Habesha ist das einzige authentische äthiopisch-eritreische Restaurant in Salzburg. Wir kochen nach traditionellen Familienrezepten, verwenden frische Gewürze und servieren unsere Gerichte auf der typischen Injera-Platte zum gemeinsamen Teilen. Kaffeezeremonie, Kulturerlebnis und herzliche Atmosphäre inklusive.',
      },
      {
        q: 'Was ist der Unterschied zwischen äthiopischer und eritreischer Küche?',
        a: 'Die beiden Küchen sind eng verwandt und teilen viele Grundzutaten wie Injera, Berbere und Teff. Eritreische Gerichte sind oft etwas milder und verwenden häufiger Fisch. Im Habesha vereinen wir beide Traditionen und bieten die besten Gerichte beider Kulturen.',
      },
    ],
  },
  {
    category: 'Ernährung & Allergien',
    icon: '🌱',
    questions: [
      {
        q: 'Ist das HABESHA Restaurant halal?',
        a: 'Ja, alle Fleischgerichte bei HABESHA sind halal-zertifiziert.',
      },
      {
        q: 'Gibt es bei euch eine gute Auswahl an veganen oder vegetarischen Gerichten?',
        a: 'Absolut! Die äthiopische Küche ist ein echtes Paradies für Veganer. Aufgrund der strengen orthodoxen Fastenzeiten in Äthiopien gibt es bei uns fantastische, von Natur aus vegane Gerichte. Über 60% unserer Speisekarte ist vegan – besonders beliebt: Misir Wot, Shiro und frische Gemüsevariationen.',
      },
      {
        q: 'Bietet ihr glutenfreies Essen an?',
        a: 'Unser Injera wird aus Teff-Mehl gebacken und ist von Natur aus glutenfrei – ideal für Zöliakie-Betroffene. Da wir in der Küche auch weizenhaltige Produkte verarbeiten, bitten wir Gäste mit Zöliakie, uns vorab zu kontaktieren.',
      },
      {
        q: 'Gibt es laktosefreie Gerichte?',
        a: 'Ja, die meisten unserer veganen Gerichte sind automatisch laktosefrei. Frag uns gerne bei der Reservierung nach Details – wir bereiten uns gerne optimal für dich vor.',
      },
      {
        q: 'Ist äthiopisches Essen gesund?',
        a: 'Ja, äthiopische Küche gilt als eine der gesündesten der Welt! Teff-Mehl ist reich an Eisen, Kalzium und Ballaststoffen. Hülsenfrüchte liefern pflanzliches Protein. Kurkuma, Ingwer und Knoblauch wirken entzündungshemmend. Viele Gerichte sind von Natur aus vegan und fettarm.',
      },
    ],
  },
  {
    category: 'Kaffeezeremonie & Specials',
    icon: '☕',
    questions: [
      {
        q: 'Was ist eine äthiopische Kaffeezeremonie (Buna)?',
        a: 'Äthiopien ist das Ursprungsland des Kaffees! Bei der traditionellen Kaffeezeremonie (Buna) rösten wir grüne Kaffeebohnen frisch vor Ihren Augen. Der Kaffee wird in einer Tonkanne (Jebena) aufgebrüht und mit brennendem Weihrauch serviert. Ein absolutes Muss für Kaffee-Liebhaber in Salzburg!',
      },
      {
        q: 'Was ist Tej?',
        a: 'Tej ist traditioneller äthiopischer Honigwein – eines der ältesten alkoholischen Getränke Afrikas, hergestellt aus Honig und dem Gesho-Strauch. Ein echtes Highlight für Genießer, bei HABESHA erhältlich.',
      },
      {
        q: 'Was bedeutet "Gursha"?',
        a: 'Gursha ist eine äthiopische Tradition der Zuneigung: Man formt ein Stück Injera mit Beilage und gibt es direkt in den Mund einer anderen Person – als Zeichen von Freundschaft und Wertschätzung. Bei uns darf gegurshot werden!',
      },
      {
        q: 'Kann man eure Speiseplatten gut in Gruppen teilen?',
        a: 'Genau dafür sind sie gemacht! Äthiopisches Essen ist „Sharing Culture" pur. Alle Soßen und Fleischgerichte werden gemeinsam auf einer großen Injera-Platte serviert – ideal für Date-Nights, Geburtstage oder Firmenfeiern.',
      },
      {
        q: 'Kann man bei HABESHA etwas über äthiopische Kultur lernen?',
        a: 'Ja! Wir leben äthiopische Kultur – vom Essen mit den Händen über die Kaffeezeremonie bis zu traditionellen Gewürzen und afrikanischem Geschirr. Jeder Besuch ist ein authentisches Kulturerlebnis direkt in Salzburg.',
      },
    ],
  },
  {
    category: 'Reservierung & Besuch',
    icon: '🎉',
    questions: [
      {
        q: 'Muss man im Habesha Restaurant reservieren?',
        a: 'Eine Reservierung wird besonders am Wochenende und für Gruppen ab 4 Personen empfohlen. Unter der Woche sind spontane Besuche meist kein Problem. Einfach anrufen: +43 660 7324766 – wir freuen uns auf Sie!',
      },
      {
        q: 'Wie groß können Gruppen sein?',
        a: 'Wir begrüßen gerne Gruppen jeder Größe. Für Runden ab 8 Personen bitte vorab anrufen, damit wir alles optimal vorbereiten können: +43 660 7324766.',
      },
      {
        q: 'Kann man im Habesha einen Geburtstag oder eine Firmenfeier feiern?',
        a: 'Ja, sehr gerne! Das Habesha eignet sich hervorragend für Gruppenevents. Unsere Sharing-Platten sind ideal für gemeinsame Feiern. Bitte kontaktieren Sie uns im Voraus für größere Gruppen – wir machen Ihren Anlass unvergesslich.',
      },
      {
        q: 'Gibt es einen Mittagstisch oder ein Tagesmenü?',
        a: 'Ja! Mittwoch bis Freitag von 11:00 bis 14:00 Uhr bieten wir ein wechselndes Tagesmenü mit traditionellen äthiopischen Gerichten zu attraktiven Mittagspreisen an – ideal für eine besondere Mittagspause in Salzburg.',
      },
      {
        q: 'Gibt es kinderfreundliche Gerichte?',
        a: 'Ja! Unsere milden Alicha-Gerichte und die Injera-Platte sind ideal für Kinder. Das gemeinsame Essen von einer Platte macht Kindern besonders viel Spaß und weckt die Neugier auf neue Geschmäcker.',
      },
    ],
  },
  {
    category: 'Standort & Öffnungszeiten',
    icon: '📍',
    questions: [
      {
        q: 'Wo genau befindet sich das Habesha Restaurant in Salzburg?',
        a: 'Das Habesha Restaurant befindet sich am Gebirgsjägerplatz 1, 5020 Salzburg. Gut erreichbar mit öffentlichen Verkehrsmitteln.',
      },
      {
        q: 'Wie sind die Öffnungszeiten des Habesha Restaurants?',
        a: 'Dienstag: 17:00–22:00 Uhr | Mittwoch bis Freitag: 11:00–14:00 und 17:00–22:00 Uhr | Samstag und Sonntag: 13:00–22:00 Uhr | Montag: Ruhetag. Für Feiertage empfehlen wir, vorab anzurufen.',
      },
      {
        q: 'Gibt es Parkplätze in der Nähe des Habesha Restaurants?',
        a: 'In der Nähe des Gebirgsjägerplatzes gibt es öffentliche Parkmöglichkeiten. Wir empfehlen die Anreise mit öffentlichen Verkehrsmitteln. Bei Fragen zur Anreise helfen wir gerne weiter.',
      },
      {
        q: 'Verkauft HABESHA auch afrikanisches Geschirr?',
        a: 'Ja! Bei HABESHA gibt es afrikanisches Porzellan und Dekorationsartikel direkt im Restaurant zu kaufen – schöne Mitbringsel oder Geschenkideen mit afrikanischem Flair.',
      },
    ],
  },
  {
    category: 'Lieferung & Bestellung',
    icon: '🛵',
    questions: [
      {
        q: 'Liefert ihr das Essen auch nach Hause?',
        a: 'Ja! Wir bringen das authentische Habesha-Erlebnis direkt ins Wohnzimmer. Online bestellen auf habesha-salzburg.at – bequem mit Kreditkarte, Apple Pay oder Google Pay bezahlen.',
      },
      {
        q: 'Wie lange dauert die Lieferung?',
        a: 'Die durchschnittliche Lieferzeit beträgt ca. 45 Minuten. Bestellungen nehmen wir bis 30 Minuten vor Geschäftsschluss entgegen.',
      },
      {
        q: 'Gibt es eine Mindestbestellmenge?',
        a: 'Ja, die Mindestbestellmenge beträgt 25 Euro.',
      },
      {
        q: 'Wohin liefert HABESHA?',
        a: 'Wir liefern hauptsächlich im Salzburger Stadtgebiet. Für Lieferungen in die Umgebung einfach anrufen – wir helfen gerne weiter: +43 660 7324766.',
      },
      {
        q: 'Welche Zahlungsmethoden werden akzeptiert?',
        a: 'Online: Kreditkarte, Debitkarte, Apple Pay und Google Pay. Bei Abholung auch Barzahlung möglich.',
      },
      {
        q: 'Kommt das Injera bei der Lieferung nicht matschig an?',
        a: 'Keine Sorge! Wir verpacken das frische Injera-Brot und die warmen Soßen separat. So bleibt das Brot schön fluffig und Sie können sich die Platte zu Hause selbst anrichten.',
      },
      {
        q: 'Gibt es ein Takeaway-Angebot?',
        a: 'Ja! Gerichte zum Mitnehmen einfach online auf habesha-salzburg.at bestellen oder anrufen. Wir bereiten alles frisch für Sie vor.',
      },
      {
        q: 'Was kostet ein Hauptgericht im Habesha Restaurant?',
        a: 'Unsere Hauptgerichte beginnen ab ca. 12 Euro. Die großen Sharing-Platten für zwei Personen liegen zwischen 20 und 28 Euro – faire Preise bei höchster Qualität.',
      },
    ],
  },
];

// Build flat list for JSON-LD
const allFaqs = faqCategories.flatMap(c => c.questions);

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#d4af37]/20 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-base leading-snug group-hover:text-[#d4af37] transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 mt-0.5 text-[#d4af37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-white/75 leading-relaxed text-sm">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // Inject JSON-LD FAQ schema
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById('faq-schema')?.remove();
    };
  }, []);

  const toggle = (key: string) => setOpenIndex(prev => (prev === key ? null : key));

  return (
    <div className="min-h-screen bg-[#0d1f1a]">
      <SEOHead
        title="FAQ – Häufige Fragen | HABESHA Salzburg"
        description="33 Antworten rund um HABESHA Salzburg: halal, vegan, glutenfrei, Injera, Kaffeezeremonie, Lieferung, Öffnungszeiten, Reservierung & mehr. Äthiopisches Restaurant Salzburg."
        canonical="https://www.habesha-salzburg.at/faq"
        keywords="veganes Restaurant Salzburg FAQ, halal Restaurant Salzburg Fragen, glutenfreies Essen Salzburg, äthiopisches Restaurant Salzburg FAQ, Kaffeezeremonie Salzburg, vegan essen Salzburg, wo halal essen Salzburg, vegetarisch essen Salzburg, Lieferung Salzburg Restaurant, Öffnungszeiten HABESHA, Berbere Gewürz Salzburg, Injera glutenfrei Salzburg, Misir Wot vegan, Tej Honigwein Salzburg, Gursha äthiopische Tradition, afrikanisches Geschirr Salzburg, kinderfreundliches Restaurant Salzburg, Mindestbestellmenge Lieferung Salzburg, Gruppenessen Salzburg"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.habesha-salzburg.at/" },
              { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.habesha-salzburg.at/faq" }
            ]
          }
        ]}
      />
      <Navbar />
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pt-24 pb-0 flex items-center gap-2 text-xs text-white/30 flex-wrap">
        <Link href="/" className="flex items-center gap-1 hover:text-[#d4af37] transition-colors"><Home size={11} /><span>Start</span></Link>
        <ChevronRight size={10} />
        <span className="text-white/50">FAQ</span>
      </nav>

      {/* Hero */}
      <section className="pt-6 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex gap-0.5">
            <div className="h-px w-8 bg-[#078930]" />
            <div className="h-px w-8 bg-[#FCDD09]" />
            <div className="h-px w-8 bg-[#DA121A]" />
          </div>
          <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Häufige Fragen</span>
          <div className="flex gap-0.5">
            <div className="h-px w-8 bg-[#DA121A]" />
            <div className="h-px w-8 bg-[#FCDD09]" />
            <div className="h-px w-8 bg-[#078930]" />
          </div>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
          Fragen & Antworten
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-base">
          Alles, was Sie über das Habesha Restaurant, unsere Küche und unseren Service wissen möchten.
        </p>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-3xl mx-auto px-4 pb-24 space-y-10">
        {faqCategories.map((cat) => (
          <div key={cat.category} className="bg-[#1a3a32]/60 rounded-2xl p-6 ring-1 ring-[#d4af37]/20">
            <h2 className="text-[#d4af37] font-semibold text-lg mb-4 flex items-center gap-2">
              <span>{cat.icon}</span>
              {cat.category}
            </h2>
            {cat.questions.map((item, i) => {
              const key = `${cat.category}-${i}`;
              return (
                <AccordionItem
                  key={key}
                  q={item.q}
                  a={item.a}
                  isOpen={openIndex === key}
                  onToggle={() => toggle(key)}
                />
              );
            })}
          </div>
        ))}

        {/* CTA */}
        <div className="text-center pt-4">
          <p className="text-white/60 mb-4 text-sm">Ihre Frage ist nicht dabei?</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a3a32] font-bold px-6 py-3 rounded-full hover:bg-[#d4af37]/90 transition-colors text-sm uppercase tracking-wide"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
