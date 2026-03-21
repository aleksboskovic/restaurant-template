import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';

const faqCategories = [
  {
    category: 'Das Erlebnis & Die Kultur',
    icon: '🌍',
    questions: [
      {
        q: 'Muss ich bei euch wirklich mit den Händen essen?',
        a: 'Ja, und das macht den Reichtum unserer Kultur aus! Traditionell isst man äthiopische Gerichte mit der rechten Hand. Das Injera (unser weiches Fladenbrot) dient dabei gleichzeitig als Teller und Besteck: Man reißt ein Stück ab und greift damit die Soßen und Beilagen. Das macht Spaß und verbindet. Wer sich unsicher fühlt, bekommt aber natürlich jederzeit klassisches Besteck von uns.',
      },
      {
        q: 'Was genau ist "Injera" und woraus besteht es?',
        a: 'Injera ist das Herzstück der Habesha-Küche. Es ist ein weiches, luftiges Sauerteig-Fladenbrot. Das Original wird aus Teff-Mehl (Zwerghirse) gebacken, einem traditionellen äthiopischen Getreide, das super gesund und extrem eisenreich ist.',
      },
      {
        q: 'Ist afrikanisches Essen immer sehr scharf?',
        a: 'Nein, bei uns ist für jeden Geschmack etwas dabei! Gerichte, die unsere rote Gewürzmischung Berbere (u.a. Chili, Ingwer, Knoblauch) enthalten, sind pikant bis scharf (oft "Wot" genannt). Wir bieten aber genauso viele milde, hocharomatische Alternativen an, die oft mit Kurkuma und Ingwer verfeinert sind (diese nennen sich "Alicha").',
      },
      {
        q: 'Was macht das Habesha Restaurant in Salzburg besonders?',
        a: 'Das Habesha ist das einzige authentische äthiopisch-eritreische Restaurant in Salzburg. Wir kochen nach traditionellen Familienrezepten, verwenden frische Gewürze und servieren unsere Gerichte auf der typischen Injera-Platte zum gemeinsamen Teilen. Die Kaffeezeremonie, das Essen mit den Händen und die herzliche Atmosphäre machen jeden Besuch zu einem echten Kulturerlebnis.',
      },
      {
        q: 'Was ist der Unterschied zwischen äthiopischer und eritreischer Küche?',
        a: 'Die beiden Küchen sind eng verwandt und teilen viele Grundzutaten wie Injera, Berbere und Teff. Der Unterschied liegt in den Gewürzmischungen und regionalen Spezialitäten. Eritreische Gerichte sind oft etwas milder und verwenden häufiger Fisch (besonders in Küstenregionen). Im Habesha vereinen wir beide Traditionen und bieten Ihnen die besten Gerichte beider Kulturen.',
      },
    ],
  },
  {
    category: 'Ernährung & Allergien',
    icon: '🌱',
    questions: [
      {
        q: 'Gibt es bei euch eine gute Auswahl an veganen oder vegetarischen Gerichten?',
        a: 'Absolut! Die äthiopische Küche ist ein echtes Paradies für Veganer. Aufgrund der strengen orthodoxen Fastenzeiten in Äthiopien (in denen auf alle tierischen Produkte verzichtet wird) gibt es bei uns fantastische, von Natur aus vegane Gerichte. Besonders beliebt sind unsere Linseneintöpfe (Misir Wot), Kichererbsenpüree (Shiro) und frische Gemüsevariationen.',
      },
      {
        q: 'Bietet ihr glutenfreies Essen an?',
        a: 'Unser traditionelles Injera-Fladenbrot wird aus Teff-Mehl gebacken, das von Natur aus glutenfrei ist. Da wir in der Küche jedoch auch weizenhaltige Produkte verarbeiten, bitten wir Gäste mit Zöliakie, uns vorab zu kontaktieren, damit wir gemeinsam die beste Option für Sie finden können.',
      },
      {
        q: 'Ist äthiopisches Essen gesund?',
        a: 'Ja, äthiopische Küche gilt als eine der gesündesten der Welt! Teff-Mehl ist reich an Eisen, Kalzium und Ballaststoffen. Unsere Hülsenfrüchte (Linsen, Kichererbsen) liefern pflanzliches Protein. Die Gewürze wie Kurkuma, Ingwer und Knoblauch haben entzündungshemmende Eigenschaften. Viele Gerichte sind von Natur aus vegan und fettarm.',
      },
    ],
  },
  {
    category: 'Specials & Reservierung',
    icon: '☕',
    questions: [
      {
        q: 'Was ist eine äthiopische Kaffeezeremonie (Buna)?',
        a: 'Äthiopien ist das Ursprungsland des Kaffees! Bei einer traditionellen Kaffeezeremonie (Buna) rösten wir die grünen Kaffeebohnen frisch vor Ihren Augen in der Pfanne. Der Kaffee wird dann in einer speziellen Tonkanne (Jebena) aufgebrüht und mit brennendem Weihrauch serviert. Ein absolutes Muss für Kaffee-Liebhaber in Salzburg!',
      },
      {
        q: 'Kann man eure Speiseplatten gut in Gruppen teilen?',
        a: 'Genau dafür sind sie gemacht! Äthiopisches Essen ist "Sharing Culture" pur. Wir servieren die verschiedenen Soßen und Fleischgerichte gemeinsam auf einer riesigen Injera-Platte in der Mitte des Tisches. So kann jeder von allem probieren – ideal für Date-Nights, Geburtstage oder Firmenfeiern.',
      },
      {
        q: 'Muss man im Habesha Restaurant reservieren?',
        a: 'Eine Reservierung wird besonders am Wochenende und für Gruppen ab 4 Personen empfohlen. Unter der Woche sind spontane Besuche meist kein Problem. Sie können bequem online über unsere Website reservieren oder uns telefonisch unter 0660 7324766 erreichen.',
      },
      {
        q: 'Kann man im Habesha einen Geburtstag oder eine Firmenfeier feiern?',
        a: 'Ja, sehr gerne! Das Habesha eignet sich hervorragend für Gruppen-Events. Unsere Sharing-Platten sind ideal für gemeinsame Feiern. Bitte kontaktieren Sie uns im Voraus für größere Gruppen, damit wir alles optimal vorbereiten können. Wir freuen uns, Ihren besonderen Anlass unvergesslich zu machen.',
      },
      {
        q: 'Gibt es einen Mittagstisch oder ein Tagesmenü?',
        a: 'Ja! Mittwoch bis Freitag sind wir von 11:00 bis 14:00 Uhr für den Mittagstisch geöffnet. Wir bieten ein wechselndes Tagesmenü mit traditionellen äthiopischen Gerichten zu einem attraktiven Mittagspreis an. Ideal für eine besondere Mittagspause in Salzburg.',
      },
    ],
  },
  {
    category: 'Standort & Öffnungszeiten',
    icon: '📍',
    questions: [
      {
        q: 'Wo genau befindet sich das Habesha Restaurant in Salzburg?',
        a: 'Das Habesha Restaurant befindet sich am Gebirgsjägerplatz 1, 5020 Salzburg. Wir sind gut mit öffentlichen Verkehrsmitteln erreichbar und befinden uns im Herzen von Salzburg.',
      },
      {
        q: 'Wie sind die Öffnungszeiten des Habesha Restaurants?',
        a: 'Dienstag: 17:00–22:00 Uhr | Mittwoch bis Freitag: 11:00–14:00 und 17:00–22:00 Uhr | Samstag und Sonntag: 13:00–22:00 Uhr | Montag: Ruhetag. Für Feiertage und besondere Anlässe empfehlen wir, vorab anzurufen.',
      },
      {
        q: 'Gibt es Parkplätze in der Nähe des Habesha Restaurants?',
        a: 'In der Nähe des Gebirgsjägerplatzes gibt es öffentliche Parkmöglichkeiten. Wir empfehlen jedoch die Anreise mit öffentlichen Verkehrsmitteln, da Salzburg gut erschlossen ist. Bei Fragen zur Anreise helfen wir Ihnen gerne telefonisch weiter.',
      },
    ],
  },
  {
    category: 'Lieferung & Bestellung',
    icon: '🛵',
    questions: [
      {
        q: 'Liefert ihr das Essen auch nach Hause?',
        a: 'Ja! Wir bringen Ihnen das authentische Habesha-Erlebnis direkt ins Wohnzimmer. Wir liefern in ausgewiesenen Gebieten in Salzburg mit unseren eigenen Fahrern. Sie können bequem online bestellen und entweder bar an der Tür oder vorab sicher mit Kreditkarte, Google Pay oder Revolut Pay bezahlen.',
      },
      {
        q: 'Kommt das Injera bei der Lieferung nicht matschig an?',
        a: 'Keine Sorge! Wir verpacken das frische Injera-Brot und die warmen Soßen (Wots) separat. So bleibt das Brot schön fluffig und Sie können sich Ihre Platte zu Hause selbst anrichten.',
      },
      {
        q: 'Was kostet ein Hauptgericht im Habesha Restaurant?',
        a: 'Unsere Hauptgerichte beginnen ab ca. 12 Euro. Die großen Sharing-Platten für zwei Personen liegen zwischen 20 und 28 Euro. Wir legen Wert auf faire Preise bei höchster Qualität und Authentizität.',
      },
      {
        q: 'Gibt es ein Mitnahme-/Takeaway-Angebot?',
        a: 'Ja! Sie können unsere Gerichte auch zum Mitnehmen bestellen. Rufen Sie uns einfach an oder bestellen Sie online über unsere Website. Wir bereiten alles frisch für Sie vor.',
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
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
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
            href="/#contact"
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
