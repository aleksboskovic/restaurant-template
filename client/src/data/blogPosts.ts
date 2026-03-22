export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  date: string; // ISO date string
  category: string;
  readingTime: number; // minutes
  image: string;
  imageAlt: string;
  teaser: string;
  content: Section[];
}

export interface Section {
  type: 'paragraph' | 'heading' | 'list' | 'cta';
  text?: string;
  items?: string[];
}

export const blogPosts: BlogPost[] = [
  // 1 — 10.03.2026
  {
    slug: 'injera-das-brot-aethiopiens',
    title: 'Injera: Das Brot, der Teller und das Besteck Äthiopiens in einem',
    metaDescription: 'Was ist Injera und warum ist es so besonders? Erfahre alles über das traditionelle äthiopische Teff-Fladenbrot, das im Habesha Restaurant Salzburg das Herzstück jeder Mahlzeit ist.',
    keywords: ['Injera Brot', 'Teff glutenfrei', 'äthiopisches Fladenbrot', 'Habesha Salzburg', 'traditionelles Essen Äthiopien'],
    date: '2026-03-10',
    category: 'Kultur & Zutaten',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/injera-platter_e2dae96c.jpg',
    imageAlt: 'Traditionelle äthiopische Injera-Platte mit verschiedenen Gerichten',
    teaser: 'Injera ist gleichzeitig Brot, Teller und Besteck – und das Herzstück jeder äthiopischen Mahlzeit. Erfahre, was diesen Sauerteigfladen aus Teff so besonders macht und warum er seit Jahrtausenden die Habesha-Küche prägt.',
    content: [
      {
        type: 'paragraph',
        text: 'Wenn du zum ersten Mal in einem äthiopischen Restaurant sitzt und die Bestellung kommt, wirst du vielleicht überrascht sein: Es gibt keinen Teller, keine Gabel, kein Messer. Stattdessen liegt vor dir ein großer, runder, leicht schwammiger Fladen – das Injera. Und genau dieser Fladen ist gleichzeitig dein Teller, dein Besteck und dein Brot.',
      },
      {
        type: 'heading',
        text: 'Was ist Injera?',
      },
      {
        type: 'paragraph',
        text: 'Injera ist ein traditionelles äthiopisches Sauerteigfladenbrot, das aus Teff-Mehl hergestellt wird. Teff ist eine uralte Getreideart, die seit über 3.000 Jahren in den Hochlagen Äthiopiens und Eritreas angebaut wird. Das Getreide ist winzig – kleiner als ein Stecknadelkopf – aber nährstoffreich: Es enthält viel Eisen, Kalzium, Ballaststoffe und ist von Natur aus glutenfrei.',
      },
      {
        type: 'heading',
        text: 'Die Kunst der Fermentation',
      },
      {
        type: 'paragraph',
        text: 'Das Besondere am Injera ist sein Herstellungsprozess. Der Teff-Teig wird mehrere Tage fermentiert, bevor er auf einer großen, runden Platte (Mitad) gebacken wird. Diese Fermentation gibt dem Injera seinen charakteristischen, leicht säuerlichen Geschmack – ähnlich wie bei einem guten Sauerteigbrot – und seine einzigartige, schwammige Textur mit den kleinen Poren, die so perfekt die Soßen aufsaugen.',
      },
      {
        type: 'heading',
        text: 'Teller, Besteck und Brot in einem',
      },
      {
        type: 'paragraph',
        text: 'Im Habesha Restaurant wird das Injera auf einem großen Tablett ausgebreitet. Darauf werden die verschiedenen Gerichte – Linsen, Fleisch, Gemüse – direkt angerichtet. Zum Essen reißt man ein Stück vom Rand des Injera ab, rollt es um ein wenig Soße oder Beilage und schiebt es in den Mund. Kein Besteck, keine Umwege – pures, sinnliches Essen.',
      },
      {
        type: 'paragraph',
        text: 'Diese Art zu essen ist nicht nur praktisch, sondern auch zutiefst gemeinschaftlich. Man isst von derselben Platte, teilt die Gerichte und kommt sich dabei automatisch näher. Kein Wunder, dass das äthiopische Sprichwort sagt: „Wer von einer Platte isst, streitet nicht."',
      },
      {
        type: 'cta',
        text: 'Erlebe das Injera-Erlebnis selbst – reserviere jetzt deinen Tisch im Habesha Restaurant Salzburg!',
      },
    ],
  },

  // 10 — 22.03.2026 — Kaffeezeremonie
  {
    slug: 'aethiopische-kaffeezeremonie-salzburg',
    title: 'Die äthiopische Kaffeezeremonie: Wo der beste Kaffee in Salzburg frisch geröstet wird',
    metaDescription: 'Erlebe die traditionelle äthiopische Kaffeezeremonie (Buna) im Habesha Restaurant Salzburg. Frisch gerösteter Hochlandkaffee & echte Gastfreundschaft.',
    keywords: ['Kaffeezeremonie Salzburg', 'Äthiopischer Kaffee Salzburg', 'Habesha Restaurant', 'Buna Kaffee', 'Kaffee Rösten Salzburg', 'traditioneller Kaffee Äthiopien'],
    date: '2026-03-22',
    category: 'Kultur & Tradition',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/coffee-ceremony_2cf07b22.jpg',
    imageAlt: 'Äthiopische Kaffeezeremonie mit Jebena-Kanne und kleinen Tassen',
    teaser: 'Kaffee stammt aus Äthiopien – und im Habesha Restaurant Salzburg können Sie erleben, wie er dort seit Jahrhunderten zubereitet wird: frisch geröstet, in der Jebena aufgebrüht, in drei Runden serviert. Ein Ritual, das Entschleunigung pur bedeutet.',
    content: [
      {
        type: 'paragraph',
        text: 'Wüsstest du, dass Kaffee seinen Ursprung in Äthiopien hat? Während man in Europa oft schnell einen Espresso im Stehen trinkt, ist Kaffee in seiner Heimat weit mehr als ein Wachmacher. Er ist das Herzstück des sozialen Lebens. Im Habesha Restaurant in Salzburg bringen wir dieses jahrhundertealte Ritual direkt zu dir.',
      },
      {
        type: 'heading',
        text: 'Buna: Mehr als nur ein Getränk',
      },
      {
        type: 'paragraph',
        text: 'In Äthiopien nennt man Kaffee „Buna“. Die Kaffeezeremonie ist ein Zeichen von Gastfreundschaft und Respekt. Es geht nicht darum, Koffein zu tanken, sondern sich Zeit zu nehmen – für Freunde, für die Familie und für gute Gespräche.',
      },
      {
        type: 'heading',
        text: 'Der Ablauf: Ein Erlebnis für alle Sinne',
      },
      {
        type: 'paragraph',
        text: 'Eine echte Zeremonie dauert Zeit und folgt festen Regeln. Wenn du uns in Salzburg besuchst, kannst du dieses Erlebnis oft schon am Duft erkennen, der durch das Restaurant zieht.',
      },
      {
        type: 'list',
        items: [
          'Das Waschen: Die grünen Rohkaffeebohnen werden gründlich gewaschen.',
          'Das Rösten (Mankeshksh): Die Bohnen werden frisch in einer flachen Pfanne vor deinen Augen geröstet. Sobald sie dunkel glänzen, wird der aromatische Rauch im Raum verteilt.',
          'Das Mahlen: Die frisch gerösteten Bohnen werden traditionell mit Mörser und Stößel zerkleinert.',
          'Das Aufbrühen (Jebena): Der Kaffee wird in der Jebena – einer bauchigen Tonkanne – mit heißem Wasser aufgebrüht.',
          'Das Servieren: Der Kaffee wird aus großer Höhe in kleinen Tassen (Cini) eingegossen. Dazu reichen wir oft traditionell geröstetes Popcorn oder Dabo (Brot).',
        ],
      },
      {
        type: 'heading',
        text: 'Die drei Runden: Abol, Tona und Baraka',
      },
      {
        type: 'paragraph',
        text: 'Bei einer traditionellen Zeremonie trinkt man drei Tassen, jede mit eigenem Namen und eigener Bedeutung: Abol (die erste Runde, stark und rein), Tona (die zweite Runde, milder) und Baraka (die dritte Runde, „Segen“ – die Krönung der Zeremonie).',
      },
      {
        type: 'heading',
        text: 'Warum du den Kaffee im Habesha Salzburg probieren musst',
      },
      {
        type: 'paragraph',
        text: 'Wir verwenden ausschließlich hochwertigen äthiopischen Hochlandkaffee. Durch das schonende, frische Rösten vor Ort verliert der Kaffee seine Bitterstoffe und entfaltet ein fruchtiges, fast schokoladiges Aroma, das du so in keinem Supermarkt findest.',
      },
      {
        type: 'cta',
        text: 'Komm vorbei und erlebe Entschleunigung pur mitten in Salzburg – bei einer echten äthiopischen Kaffeezeremonie im Habesha Restaurant.',
      },
    ],
  },

  // 2 — 11.03.2026
  {
    slug: 'vegan-essen-salzburg-aethiopische-kueche',
    title: 'Vegan essen in Salzburg: Warum die äthiopische Küche ein Paradies für Pflanzenliebhaber ist',
    metaDescription: 'Suchst du veganes Essen in Salzburg? Entdecke, warum die äthiopische Küche von Natur aus pflanzlich ist – und probiere unsere veganen Injera-Platten im Habesha!',
    keywords: ['Vegan essen Salzburg', 'vegetarisches Restaurant Salzburg', 'pflanzliche Küche', 'Habesha', 'Misir Wot'],
    date: '2026-03-11',
    category: 'Vegane Küche',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/misir-wot_ac7aa5b2.jpg',
    imageAlt: 'Misir Wot – äthiopisches Rote-Linsen-Ragout auf Injera',
    teaser: 'Wer in Salzburg vegan essen gehen möchte, kennt das Problem: Die Auswahl beschränkt sich oft auf Beilagensalat oder Fleischersatz. Doch es gibt eine Küche, die seit Jahrhunderten eine riesige Vielfalt rein pflanzlicher Gerichte bietet.',
    content: [
      {
        type: 'paragraph',
        text: 'Wer in Salzburg vegan oder vegetarisch essen gehen möchte, kennt das Problem vielleicht: Oft beschränkt sich die Auswahl auf den obligatorischen Beilagensalat, ein liebloses Nudelgericht oder hochverarbeitete Fleischersatzprodukte. Doch was wäre, wenn es eine Küche gäbe, die von Natur aus – aus tiefster jahrhundertealter Tradition heraus – eine riesige Vielfalt an rein pflanzlichen Gerichten bietet?',
      },
      {
        type: 'paragraph',
        text: 'Willkommen in der Welt der Habesha-Küche! Wer einmal echtes äthiopisches Essen probiert hat, weiß: Für den besten veganen Genuss braucht es kein künstliches „Fake-Fleisch" – sondern nur die besten Linsen, frisches Gemüse und unvergleichliche Gewürze.',
      },
      {
        type: 'heading',
        text: 'Das Geheimnis: Warum äthiopisches Essen von Natur aus vegan ist',
      },
      {
        type: 'paragraph',
        text: 'Dass die äthiopische Küche ein Traum für Veganer und Vegetarier ist, hat einen spannenden kulturellen Hintergrund: die Religion. Ein großer Teil der Bevölkerung in Äthiopien und Eritrea gehört der orthodoxen Kirche an. In dieser Glaubensrichtung gibt es strenge und ausgedehnte Fastenzeiten, das sogenannte Tsom. An etwa 200 bis 250 Tagen im Jahr verzichten strenggläubige orthodoxe Christen auf jegliche tierische Produkte. Die pflanzliche Küche ist in Äthiopien kein moderner Lifestyle-Trend, sondern wird seit Jahrhunderten perfektioniert.',
      },
      {
        type: 'heading',
        text: 'Keine Ersatzprodukte – 100 % natürlicher Geschmack',
      },
      {
        type: 'paragraph',
        text: 'Im Gegensatz zu vielen modernen Food-Trends kommen unsere veganen Gerichte im Habesha Restaurant in Salzburg völlig ohne industriell verarbeitete Ersatzprodukte aus. Hier sind einige unserer beliebtesten veganen Klassiker:',
      },
      {
        type: 'list',
        items: [
          'Misir Wot: Ein herzhaftes, leicht scharfes Rote-Linsen-Ragout, das stundenlang mit roten Zwiebeln und der traditionellen Gewürzmischung Berbere geköchelt wird.',
          'Kik Alicha: Ein mildes, aromatisches Gericht aus gelben Erbsen, verfeinert mit Kurkuma, Knoblauch und Ingwer.',
          'Gomen: Fein gewürzter, gedünsteter Blattkohl oder Spinat, der perfekt mit den herzhaften Linsengerichten harmoniert.',
          'Shiro: Ein cremiges Püree aus geröstetem Kichererbsenmehl mit unglaublicher Geschmackstiefe.',
        ],
      },
      {
        type: 'cta',
        text: 'Jetzt Tisch reservieren und die Vielfalt der Habesha-Küche in Salzburg entdecken!',
      },
    ],
  },

  // 3 — 13.03.2026
  {
    slug: 'teff-superfood-injera-gesund',
    title: 'Teff – Das äthiopische Superfood: Warum unser Injera so gesund ist',
    metaDescription: 'Kennst du das kleinste Getreide der Welt? Erfahre, warum Teff-Mehl ein echtes Superfood ist und unser traditionelles Fladenbrot (Injera) im Habesha Salzburg so gesund macht.',
    keywords: ['Glutenfrei essen Salzburg', 'gesundes Restaurant Salzburg', 'Teff Mehl', 'äthiopisches Fladenbrot', 'Superfood'],
    date: '2026-03-13',
    category: 'Gesundheit & Ernährung',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/teff-superfood_3a4f5ba6.jpg',
    imageAlt: 'Teff-Körner – das kleinste und nährstoffreichste Getreide der Welt',
    teaser: 'Wenn wir an Superfoods denken, fallen uns Chia-Samen oder Quinoa ein. Doch eines der ältesten und stärksten Superfoods der Welt landet bei uns direkt als köstliches, weiches Fladenbrot auf deinem Tisch.',
    content: [
      {
        type: 'paragraph',
        text: 'Wenn wir heute an „Superfoods" denken, fallen uns meistens Chia-Samen, Quinoa oder Goji-Beeren ein. Doch was wäre, wenn eines der ältesten und stärksten Superfoods der Welt direkt in Form eines köstlichen, weichen Fladenbrots auf deinem Teller landet?',
      },
      {
        type: 'paragraph',
        text: 'Willkommen in der Welt von Teff! Dieses winzige Getreide bildet die Basis für unser traditionelles äthiopisches Fladenbrot (Injera) und ist der Grund, warum ein Besuch im Habesha Restaurant in Salzburg nicht nur ein kulturelles Erlebnis, sondern auch eine Wohltat für deinen Körper ist.',
      },
      {
        type: 'heading',
        text: 'Was ist Teff? Das kleinste Getreide der Welt',
      },
      {
        type: 'paragraph',
        text: 'Teff, im Deutschen auch Zwerghirse genannt, ist eine uralte Getreideart, die fast ausschließlich im Hochland von Äthiopien und Eritrea angebaut wird. Ein einziges Weizenkorn ist etwa 150-mal größer als ein Teffkorn. Doch lass dich von der Größe nicht täuschen: Was dem Teffkorn an Volumen fehlt, macht es durch seine immense Nährstoffdichte mehr als wett.',
      },
      {
        type: 'heading',
        text: 'Ein echtes Nährstoffwunder: Die Power im Teff-Mehl',
      },
      {
        type: 'list',
        items: [
          'Viel Eisen: Teff ist eine fantastische pflanzliche Eisenquelle – besonders in Kombination mit unseren leicht säuerlichen Soßen (Vitamin C fördert die Eisenaufnahme).',
          'Reich an Proteinen: Das Getreide enthält viele essenzielle Aminosäuren und ist damit eine hervorragende Proteinquelle für Veganer und Vegetarier.',
          'Ballaststoffe für eine lange Sättigung: Ein Injera hält dich lange und angenehm satt, ohne das typische Völlegefühl auszulösen.',
          'Von Natur aus glutenfrei: Teff ist zu 100 % glutenfrei – eine exzellente Wahl für Menschen mit Zöliakie oder Glutenunverträglichkeit.',
        ],
      },
      {
        type: 'heading',
        text: 'Gesund für den Darm durch Fermentation',
      },
      {
        type: 'paragraph',
        text: 'Unser Injera ist nicht nur wegen des Teff-Mehls so gesund, sondern auch wegen seiner Zubereitung. Der flüssige Teig wird über mehrere Tage hinweg fermentiert, bevor er wie ein großer Crêpe gebacken wird. Dieser natürliche Sauerteig-Prozess verleiht dem Fladenbrot nicht nur seinen charakteristischen, leicht säuerlichen Geschmack, sondern wirkt auch probiotisch und fördert eine gesunde Darmflora.',
      },
      {
        type: 'cta',
        text: 'Lust auf einen gesunden und unglaublich leckeren Abend? Besuche unser gesundes Restaurant in Salzburg!',
      },
    ],
  },

  // 4 — 15.03.2026
  {
    slug: 'berbere-gewuerz-geheimnis-habesha-kueche',
    title: 'Das Geheimnis der Habesha-Küche: Was ist eigentlich Berbere?',
    metaDescription: 'Würzig, scharf, unverwechselbar: Entdecke das Geheimnis des Berbere-Gewürzes, das unseren Habesha-Gerichten in Salzburg ihren einzigartigen Geschmack verleiht.',
    keywords: ['Berbere Gewürz', 'scharf essen Salzburg', 'äthiopische Gewürze', 'Doro Wot', 'afrikanische Zutaten'],
    date: '2026-03-15',
    category: 'Kultur & Zutaten',
    readingTime: 6,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/berbere-spice_c7161fb9.jpg',
    imageAlt: 'Berbere – das feuerrote Herzgewürz der äthiopischen Küche',
    teaser: 'Wer das erste Mal ein äthiopisches Restaurant betritt, dem steigt sofort ein unvergleichlicher, warmer und intensiver Duft in die Nase. Das Geheimnis dahinter hat einen Namen: Berbere.',
    content: [
      {
        type: 'paragraph',
        text: 'Wer das erste Mal ein äthiopisches oder eritreisches Restaurant betritt, dem steigt sofort ein unvergleichlicher, warmer und intensiver Duft in die Nase. Es ist eine Mischung aus geröstetem Kaffee, einem Hauch von Weihrauch und vor allem: einer tiefen, komplexen Gewürznote, die man in Europa so kaum kennt.',
      },
      {
        type: 'paragraph',
        text: 'Wenn du in Salzburg auf der Suche nach wirklich authentischen Geschmackserlebnissen bist, kommst du an einem bestimmten Begriff nicht vorbei: Berbere. Dieses feuerrote Pulver ist die absolute Seele der Habesha-Küche.',
      },
      {
        type: 'heading',
        text: 'Mehr als nur scharf: Was steckt in Berbere?',
      },
      {
        type: 'paragraph',
        text: 'Oft wird Berbere einfach als „äthiopisches Chilipulver" abgetan – doch das wird dieser Meisterleistung der Gewürzkunst absolut nicht gerecht. Eine gute Berbere-Mischung besteht aus bis zu 20 verschiedenen Zutaten, die oft tagelang in der Sonne getrocknet, geröstet und dann von Hand gemahlen werden. Jede Familie hat ihr eigenes, streng gehütetes Geheimrezept.',
      },
      {
        type: 'list',
        items: [
          'Chili: Sorgt für die leuchtend rote Farbe und die charakteristische Hitze.',
          'Knoblauch & Ingwer: Für die würzige, wärmende Basis.',
          'Korarima (Äthiopischer Kardamom): Ein leicht rauchiges, süßliches Gewürz, das nur in Ostafrika wächst.',
          'Bockshornklee & Nelken: Für eine erdige, tiefe Note.',
          'Kreuzkümmel, Koriander & Piment: Runden die Mischung mit einer warmen, aromatischen Fülle ab.',
        ],
      },
      {
        type: 'heading',
        text: 'Speisekarte verstehen: Wot vs. Alicha',
      },
      {
        type: 'paragraph',
        text: 'Wenn du bei uns im Habesha Restaurant in Salzburg die Speisekarte studierst, wirst du zwei Begriffe immer wieder lesen: Wot und Alicha. Wot-Gerichte (wie Misir Wot) enthalten Berbere und haben eine tiefrote Farbe mit kräftiger Schärfe. Alicha-Gerichte werden ohne Berbere zubereitet – hier dominieren milde Gewürze wie Kurkuma, Ingwer und Knoblauch.',
      },
      {
        type: 'heading',
        text: 'Der König der äthiopischen Küche: Doro Wot',
      },
      {
        type: 'paragraph',
        text: 'Um die wahre Magie von Berbere zu erleben, musst du unbedingt das Nationalgericht Äthiopiens probieren: Doro Wot. Für diesen weltberühmten Hühnereintopf werden Unmengen an fein gehackten roten Zwiebeln stundenlang ohne Öl weichgekocht. Erst dann wird großzügig Berbere hinzugefügt, wodurch eine unglaublich dicke, dunkelrote und geschmacksintensive Soße entsteht. Darin schmoren schließlich zarte Hühnerkeulen und hartgekochte Eier.',
      },
      {
        type: 'cta',
        text: 'Bereit für eine Geschmacksexplosion? Komm vorbei und entdecke die faszinierende Welt der äthiopischen Gewürze in Salzburg!',
      },
    ],
  },

  // 5 — 16.03.2026
  {
    slug: 'date-night-salzburg-injera-platte',
    title: 'Date Night in Salzburg: Warum das Teilen einer Injera-Platte das perfekte Date ist',
    metaDescription: 'Schluss mit steifen Dinner-Dates! Entdecke, warum das gemeinsame Essen von einer äthiopischen Platte im Habesha Salzburg das Eis bricht und für einen unvergesslichen Abend sorgt.',
    keywords: ['Romantisches Restaurant Salzburg', 'Date Night Ideen Salzburg', 'erstes Date Restaurant', 'Erlebnis für zwei'],
    date: '2026-03-16',
    category: 'Erlebnisse',
    readingTime: 4,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/date-night_6cef59d4.jpg',
    imageAlt: 'Romantisches Abendessen zu zweit im äthiopischen Restaurant',
    teaser: 'Traditionelle Dinner-Dates sind oft steif: jeder starrt auf seinen eigenen Teller. Wie wäre es stattdessen mit einem Erlebnis, das von der ersten Sekunde an verbindet, das Eis bricht und richtig Spaß macht?',
    content: [
      {
        type: 'paragraph',
        text: 'Die Planung für das erste Date steht an oder ihr möchtet euren Jahrestag gebührend feiern, und ihr seid auf der Suche nach originellen Date Night Ideen in Salzburg? Doch oft sind traditionelle Dinner-Dates ziemlich steif: Man sitzt sich an einem viel zu großen Tisch gegenüber, jeder starrt auf seinen eigenen Teller und man überlegt krampfhaft, worüber man beim Schneiden des Schnitzels reden soll.',
      },
      {
        type: 'paragraph',
        text: 'Wie wäre es stattdessen mit einem Erlebnis für zwei, das von der ersten Sekunde an verbindet, das Eis bricht und richtig Spaß macht? Willkommen zu eurer Date Night im Habesha Restaurant!',
      },
      {
        type: 'heading',
        text: 'Die Psychologie des Teilens: Warum gemeinsames Essen verbindet',
      },
      {
        type: 'paragraph',
        text: 'In der äthiopischen Kultur gibt es keine getrennten Teller. Wenn ihr bei uns bestellt, servieren wir eure ausgewählten Speisen gemeinsam auf einem einzigen, großen Injera-Sauerteigfladen. Psychologen wissen längst: Wenn Menschen von einem gemeinsamen Teller essen, baut das unbewusst Barrieren ab. Das Teilen der Nahrung schafft Vertrauen und ein Gefühl der Zusammengehörigkeit.',
      },
      {
        type: 'heading',
        text: 'Mit den Händen essen: Sinnlich und spielerisch',
      },
      {
        type: 'paragraph',
        text: 'Vergesst Messer und Gabel. Bei uns esst ihr traditionell mit den Händen – genauer gesagt, mit der rechten Hand und dem Injera-Fladen als Werkzeug. Das Essen mit den Händen hat etwas wunderbar Sinnliches und Spielerisches. Es nimmt sofort die Formalität aus dem Abend. Anstatt sich Sorgen zu machen, ob man die richtige Gabel benutzt, könnt ihr euch entspannen, gemeinsam lachen und das Essen mit allen Sinnen genießen.',
      },
      {
        type: 'heading',
        text: 'Ein Hauch von Romantik: Die Tradition des "Gursha"',
      },
      {
        type: 'paragraph',
        text: 'Wenn ihr euch im Laufe des Abends schon etwas vertrauter seid, könnt ihr sogar eine der schönsten äthiopischen Traditionen ausprobieren: das Gursha. In Äthiopien ist es ein Zeichen von tiefer Zuneigung und Respekt, dem Gegenüber einen besonders leckeren Bissen direkt in den Mund zu geben – ein kleines, liebevolles Füttern, das eure Date Night zu einem unvergesslichen und intimen Erlebnis macht.',
      },
      {
        type: 'cta',
        text: 'Überrasche dein Date mit etwas ganz Besonderem – jetzt Tisch reservieren!',
      },
    ],
  },

  // 6 — 17.03.2026
  {
    slug: 'gursha-aethiopischer-liebesbeweis',
    title: '"Gursha" – Der äthiopische Liebesbeweis beim Essen',
    metaDescription: 'Hast du schon mal von "Gursha" gehört? Erfahre, warum man sich in Äthiopien beim Essen gegenseitig füttert und was das mit Respekt, Freundschaft und Gemeinschaft zu tun hat.',
    keywords: ['Gursha Bedeutung', 'äthiopische Tradition', 'Habesha Kultur', 'Respekt in Äthiopien', 'afrikanische Esskultur'],
    date: '2026-03-17',
    category: 'Kultur & Tradition',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/hands-eating_815eedb0.jpg',
    imageAlt: 'Traditionelles Essen mit den Händen von einer gemeinsamen Injera-Platte',
    teaser: 'In Europa denkt man beim gegenseitigen Füttern an frisch Verliebte. In der Habesha-Kultur hat diese Geste eine viel tiefere, alltäglichere und wunderschöne Bedeutung: Das Gursha.',
    content: [
      {
        type: 'paragraph',
        text: 'Wenn man in Europa daran denkt, sich beim Essen gegenseitig zu füttern, hat man meistens ein frisch verliebtes Paar beim Candle-Light-Dinner im Kopf. In der Habesha-Kultur (also in Äthiopien und Eritrea) hat diese Geste jedoch eine viel tiefere, alltäglichere und wunderschöne Bedeutung.',
      },
      {
        type: 'heading',
        text: 'Was genau ist ein Gursha?',
      },
      {
        type: 'paragraph',
        text: 'Das Wort Gursha (oder Gorsha) stammt aus der amharischen Sprache und bedeutet wörtlich übersetzt so viel wie „ein Bissen" oder „ein Mundvoll". Man reißt ein besonders schönes Stückchen Injera ab und wickelt darin sorgfältig die besten Stücke der Speiseplatte ein – zum Beispiel ein zartes Stück Doro Wot oder besonders viel leckere Soße. Diesen perfekten Bissen reicht man dann direkt in den Mund des Gegenübers.',
      },
      {
        type: 'heading',
        text: 'Die Gursha-Bedeutung: Mehr als nur Essen',
      },
      {
        type: 'list',
        items: [
          'Respekt: Wenn ein Gastgeber dir das erste Gursha des Abends anbietet, ist das eine große Ehre. Es zeigt, dass du als Gast hochgeschätzt wirst.',
          'Liebe und Freundschaft: Unter Freunden und Familienmitgliedern ist es ein Ausdruck von Zuneigung – man gibt dem anderen den besten Bissen.',
          'Zusammenhalt: Das gegenseitige Füttern bricht soziale Barrieren ab und schafft ein tiefes Gefühl der Verbundenheit.',
        ],
      },
      {
        type: 'heading',
        text: 'Die ungeschriebenen Regeln des Gursha',
      },
      {
        type: 'list',
        items: [
          'Niemals ablehnen: Ein angebotenes Gursha abzulehnen, gilt in Äthiopien als unhöflich.',
          'Der Gastgeber fängt an: Oft ist es das Familienoberhaupt oder der Gastgeber, der das erste Gursha austeilt.',
          'Gursha kommt selten allein: Ein einzelnes Gursha gilt als unvollständig – es wird meist erwidert oder direkt ein zweites hinterhergeschickt.',
          'Auf die Finger achten: Ein perfektes Gursha wird so gereicht, dass die Finger des Gebenden die Lippen des Empfangenden nicht berühren.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Wenn du das nächste Mal mit Freunden, deiner Familie oder deinem Date bei uns im Habesha Restaurant in Salzburg zu Gast bist, trau dich doch einfach mal! Reiß ein Stück Injera ab, fülle es mit etwas leckerem Misir Wot und überrasche dein Gegenüber mit einem Gursha. Es ist ein kleiner Moment, der garantiert für ein Lächeln sorgt.',
      },
      {
        type: 'cta',
        text: 'Möchtest du diese und andere faszinierende Traditionen selbst erleben? Reserviere jetzt deinen Tisch in Salzburg!',
      },
    ],
  },

  // 7 — 18.03.2026
  {
    slug: 'geburtstag-feiern-salzburg-afrikanische-art',
    title: 'Geburtstag feiern in Salzburg: Gemeinsam genießen auf afrikanische Art',
    metaDescription: 'Suchst du eine besondere Location für deinen Geburtstag in Salzburg? Im Habesha Restaurant teilt ihr euch große, bunte Speiseplatten – perfekt für Gruppen und Firmenfeiern.',
    keywords: ['Geburtstag Location Salzburg', 'Restaurant für Gruppen Salzburg', 'Firmenfeier Salzburg', 'Essen zum Teilen'],
    date: '2026-03-18',
    category: 'Feiern & Gruppen',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/group-sharing_e62a915d.jpg',
    imageAlt: 'Gruppe von Freunden teilt eine große äthiopische Speiseplatte',
    teaser: 'Wer eine besondere Geburtstag-Location in Salzburg sucht, steht oft vor einem Problem: Wohin mit einer größeren Gruppe, wenn es nicht das klassische Dreigänge-Menü sein soll? Wir haben die Antwort.',
    content: [
      {
        type: 'paragraph',
        text: 'Die Planung steht an: Ein runder Geburtstag, die jährliche Weihnachtsfeier oder ein gemütliches Get-together mit den besten Freunden. Wer eine besondere Geburtstag-Location in Salzburg sucht, steht oft vor einem Problem: Wohin mit einer größeren Gruppe, wenn es nicht das klassische, etwas steife Dreigänge-Menü sein soll?',
      },
      {
        type: 'paragraph',
        text: 'Wenn ihr nach einem Ort sucht, an dem herzhaft gelacht wird, das Eis sofort bricht und das Essen zu einem echten Gemeinschaftserlebnis wird, dann haben wir im Habesha Restaurant genau das Richtige für euch: Unser authentisches afrikanisches Essen zum Teilen.',
      },
      {
        type: 'heading',
        text: 'Das Geheimnis eines perfekten Abends: Das Sharing-Konzept',
      },
      {
        type: 'paragraph',
        text: 'Wenn ihr als Gruppe zu uns kommt, servieren wir eure Speisen nicht auf Einzelportionen. Stattdessen bereiten wir riesige, farbenprächtige Speiseplatten vor, die in der Mitte des Tisches platziert werden. Die Basis bildet unser traditionelles Injera, darauf richten wir kreisförmig die verschiedensten Köstlichkeiten an: würziges Rindfleisch (Tibs), scharfes Hühnchenragout (Doro Wot), cremige Linsen (Misir Wot), frischen Blattkohl und vieles mehr.',
      },
      {
        type: 'heading',
        text: 'Die perfekte Location für eure Firmenfeier in Salzburg',
      },
      {
        type: 'paragraph',
        text: 'Gerade bei Firmenfeiern oder Teamevents ist unser Sharing-Konzept der ultimative Eisbrecher. Weil man gemeinsam mit den Händen isst, fallen sofort alle formellen Barrieren ab. Und da wir traditionell eine riesige Auswahl an veganen und vegetarischen Gerichten haben, können wir eure Platten so zusammenstellen, dass sowohl Fleischliebhaber als auch Veganer zu 100 % glücklich werden.',
      },
      {
        type: 'paragraph',
        text: 'Für den perfekten Abschluss eurer Feier empfehlen wir unsere traditionelle äthiopische Kaffeezeremonie – ein Highlight, das noch lange in Erinnerung bleiben wird.',
      },
      {
        type: 'cta',
        text: 'Plant ihr eine Feier? Kontaktiert uns rechtzeitig – wir reservieren einen schönen Bereich und planen eure individuellen Speiseplatten!',
      },
    ],
  },

  // 8 — 20.03.2026
  {
    slug: 'digital-detox-dinner-salzburg',
    title: 'Digital Detox beim Dinner: Warum das Handy bei uns garantiert in der Tasche bleibt',
    metaDescription: 'Ständig am Smartphone? Bei Habesha Salzburg erlebst du echtes Digital Detox. Wer mit den Händen isst, hat keine Zeit fürs Handy – dafür aber für echte Gespräche!',
    keywords: ['Digital Detox Salzburg', 'achtsam essen', 'Restaurant Erlebnis', 'Handyfreie Zone', 'echtes Miteinander'],
    date: '2026-03-20',
    category: 'Erlebnisse',
    readingTime: 4,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/hands-eating_815eedb0.jpg',
    imageAlt: 'Essen mit den Händen – vollständig im Moment präsent',
    teaser: 'Man sitzt mit Freunden im Restaurant, das Essen sieht fantastisch aus – und zack, schon liegt das Smartphone auf dem Tisch. Bei uns bleibt das Handy ganz natürlich in der Tasche. Das Geheimnis? Wir essen mit den Händen.',
    content: [
      {
        type: 'paragraph',
        text: 'Kennst du das? Man sitzt mit Freunden oder dem Partner im Restaurant, das Essen sieht fantastisch aus – und zack, schon liegt das Smartphone auf dem Tisch. Ein kurzes Foto für Instagram hier, ein schneller Blick auf die WhatsApp-Nachrichten da. Richtig abschalten fällt im Alltag oft schwer.',
      },
      {
        type: 'paragraph',
        text: 'Wer in Salzburg ein echtes Restaurant-Erlebnis sucht, bei dem das Handy ganz von allein in der Tasche bleibt, ist in der äthiopischen Habesha-Küche genau richtig. Bei uns gibt es zwar kein striktes Handyverbot, aber unsere Art zu essen sorgt für ein ganz natürliches Digital Detox. Wie das funktioniert? Ganz einfach: Wir essen mit den Händen!',
      },
      {
        type: 'heading',
        text: 'Die beste Ausrede, nicht ans Telefon zu gehen',
      },
      {
        type: 'paragraph',
        text: 'In der äthiopischen und eritreischen Kultur gibt es traditionell weder Messer noch Gabel. Unser Besteck ist das Injera – ein weicher, feinporiger Sauerteigfladen. Man reißt ein Stück des Fladens ab und greift damit geschickt die verschiedenen Soßen und Gerichte direkt von einer großen, gemeinsamen Platte. Wer mit den Fingern in aromatische Soßen und würziges Linsen-Ragout taucht, hat schlichtweg keine freie (und saubere!) Hand, um über den Touchscreen zu wischen.',
      },
      {
        type: 'heading',
        text: 'Achtsam essen: Genuss mit allen Sinnen',
      },
      {
        type: 'paragraph',
        text: 'Wenn der visuelle Reiz des Bildschirms wegfällt, schärfen sich unsere anderen Sinne. Das Essen mit den Händen verstärkt dieses Gefühl enorm. Du spürst die weiche Textur des Injera-Fladens, die angenehme Wärme der Speisen und schmeckst die komplexe Vielfalt unserer Gewürze viel intensiver. Es ist ein sinnliches Erlebnis, das dich sofort erdet und den Alltagsstress vergessen lässt.',
      },
      {
        type: 'heading',
        text: 'Echtes Miteinander statt endloser Screen-Time',
      },
      {
        type: 'paragraph',
        text: 'Das Herzstück der Habesha-Kultur ist die Gemeinschaft. Wir servieren unsere Gerichte auf einer großen, bunten Platte, die in der Mitte des Tisches steht. Dieses Sharing-Konzept bricht sofort das Eis und schafft ein echtes Miteinander. Anstatt stumm auf Bildschirme zu starren, schaut man sich in die Augen, reicht sich gegenseitig die besten Bissen und führt endlich wieder ungestörte, tiefgründige Gespräche.',
      },
      {
        type: 'cta',
        text: 'Brauchst du eine Pause vom Alltag? Reserviere jetzt deinen Tisch bei uns in Salzburg und erlebe ein Dinner, das verbindet!',
      },
    ],
  },

  // 9 — 22.03.2026
  {
    slug: 'afrikanisch-vs-aethiopisch-habesha-kueche',
    title: 'Afrikanisches vs. Äthiopisches Essen: Was macht die Habesha-Küche so einzigartig?',
    metaDescription: 'Afrikanisches Essen ist nicht gleich afrikanisches Essen. Entdecke die einzigartigen Gewürze und Zutaten, die Äthiopiens Küche vom Rest Afrikas abheben – im Habesha Salzburg.',
    keywords: ['Afrikanisches Restaurant Salzburg', 'Unterschied afrikanisch äthiopisch', 'Berbere Gewürz', 'ostafrikanische Küche'],
    date: '2026-03-22',
    category: 'Kultur & Zutaten',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/injera-platter_e2dae96c.jpg',
    imageAlt: 'Äthiopische Injera-Platte – einzigartig in ganz Afrika',
    teaser: 'Wenn Gäste nach einem "Afrikanischen Restaurant in Salzburg" suchen und bei uns landen, sind sie oft überrascht: Kein Couscous, kein Fufu. Warum? Weil Afrika kein Land ist – und die äthiopische Küche eine Welt für sich.',
    content: [
      {
        type: 'paragraph',
        text: 'Wenn Gäste in Suchmaschinen nach einem „Afrikanischen Restaurant in Salzburg" suchen und bei uns im Habesha landen, sind sie oft im ersten Moment überrascht. Auf unserer Speisekarte finden sie weder Couscous noch Erdnusseintopf oder Fufu. Die Antwort ist einfach, wird aber oft vergessen: Afrika ist kein Land, sondern ein riesiger Kontinent mit 54 sehr unterschiedlichen Nationen.',
      },
      {
        type: 'heading',
        text: '1. Fufu, Couscous oder Injera? Die Basis macht den Unterschied',
      },
      {
        type: 'paragraph',
        text: 'In vielen westafrikanischen Ländern ist Fufu die Sättigungsbeilage Nummer eins – ein fester, klebriger Brei aus Maniok und Kochbananen. In Nordafrika dominiert hingegen Couscous. Die äthiopische und eritreische Küche hat jedoch ein völlig anderes, einzigartiges Grundnahrungsmittel: das Injera. Dieses weiche, schwammartige Fladenbrot wird aus Teff gebacken, über mehrere Tage fermentiert und dient gleichzeitig als Teller und Besteck.',
      },
      {
        type: 'heading',
        text: '2. Die einzigartige Gewürzwelt: Das Geheimnis von Berbere',
      },
      {
        type: 'paragraph',
        text: 'Während in Nordafrika oft süßliche Gewürze wie Zimt und in Westafrika kräftige Erdnuss- und Palmölaromen vorherrschen, hat Äthiopien ein ganz eigenes, feuriges Herzstück: das Berbere-Gewürz. Berbere ist eine hochkomplexe Gewürzmischung aus bis zu 20 verschiedenen Zutaten – darunter scharfe Chilis, Knoblauch, Ingwer, Korarima (äthiopischer Kardamom), Bockshornklee und Nelken. Wer äthiopisch isst, schmeckt Aromen, die es nirgendwo sonst auf der Welt gibt.',
      },
      {
        type: 'heading',
        text: '3. Keine Vorspeisen, keine Desserts – Die Kunst des Teilens',
      },
      {
        type: 'paragraph',
        text: 'Bei uns gibt es klassischerweise keine klassische Menüfolge mit Vor-, Haupt- und Nachspeise auf separaten Tellern. Stattdessen wird alles – von scharfen Fleischgerichten bis hin zu milden, veganen Linsen- und Kohlkreationen – in kleinen Portionen kreisförmig auf einem einzigen, riesigen Injera-Fladen in der Mitte des Tisches angerichtet. Diese große Speiseplatte (oft Beyaynetu genannt) ist ein Fest für die Augen und den Gaumen.',
      },
      {
        type: 'cta',
        text: 'Möchtest du den wahren Geschmack Äthiopiens und Eritreas erleben? Besuche uns im Habesha – deinem authentischen ostafrikanischen Restaurant in Salzburg!',
      },
    ],
  },

  // 11 — 22.03.2026 — Tej
  {
    slug: 'tej-aethiopischer-honigwein',
    title: 'Tej: Der süße Geschmack Äthiopiens – Mehr als nur Honigwein',
    metaDescription: 'Was ist Tej? Entdecke Äthiopiens traditionellen Honig-Wein – fermentiert aus Honig, Wasser und Gesho-Zweigen. Im Habesha Restaurant Salzburg erleben.',
    keywords: ['Tej Honigwein', 'Honig Wein Äthiopien', 'äthiopischer Wein Salzburg', 'Berele Glas', 'Gesho Honigwein', 'Habesha Restaurant Salzburg'],
    date: '2026-03-22',
    category: 'Kultur & Getränke',
    readingTime: 4,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/tej_blog_94372d5b.jpg',
    imageAlt: 'Tej – äthiopischer Honigwein in traditionellen Berele-Glasflaschen',
    teaser: 'Tej ist Äthiopiens ältestes Nationalgetränk – ein fermentierter Honig-Wein, der seit Jahrtausenden bei Festen und Feierlichkeiten getrunken wird. Süß, leicht bitter, unverwechselbar.',
    content: [
      {
        type: 'paragraph',
        text: 'In der faszinierenden Welt der äthiopischen Kulinarik gibt es ein Getränk, das so alt ist wie die Legenden des Landes selbst: Tej. Oft einfach als „äthiopischer Honigwein" bezeichnet, ist Tej weit mehr als nur ein alkoholisches Getränk – es ist ein kulturelles Symbol, ein Zeichen der Gastfreundschaft und ein fester Bestandteil von Feierlichkeiten.',
      },
      {
        type: 'heading',
        text: 'Was ist Tej genau?',
      },
      {
        type: 'paragraph',
        text: 'Tej ist ein fermentierter Wein, der traditionell aus drei Hauptzutaten hergestellt wird: Honig, Wasser und den Blättern des Gesho-Strauchs (Rhamnus prinoides) – einer Hopfenart, die ihm seine charakteristische bittere Note verleiht. Je nach Fermentationsdauer kann Tej von süß und alkoholarm bis hin zu trocken und sehr stark reichen.',
      },
      {
        type: 'heading',
        text: 'Honig-Wein: Ein Shorttail-Keyword mit Geschichte',
      },
      {
        type: 'paragraph',
        text: '„Tej" ist ein sehr spezifischer Begriff, nach dem vielleicht nicht jeder sucht. Doch wer nach „Honig Wein" sucht, meint oft genau dieses uralte Getränk. Indem wir Begriffe wie „Honig Wein" verwenden, erreichen wir auch jene, die noch nie von Tej gehört haben – und entdecken lassen, was Äthiopiens Nationalgetränk so besonders macht.',
      },
      {
        type: 'heading',
        text: 'Tej und das äthiopische Festmahl',
      },
      {
        type: 'paragraph',
        text: 'Kein äthiopisches Fest ist vollständig ohne Tej. Er wird aus charakteristischen, langhalsigen Glasflaschen – den sogenannten Berele – getrunken. Wenn Sie das nächste Mal ein traditionelles äthiopisches Gericht wie Doro Wat probieren, bestellen Sie unbedingt ein Glas Tej dazu. Die Süße des Honigs balanciert die Schärfe der Gewürze perfekt aus und lässt Sie tief in die Aromen Äthiopiens eintauchen.',
      },
      {
        type: 'cta',
        text: 'Neugierig auf Tej? Besuchen Sie uns im Habesha Restaurant Salzburg und erleben Sie den Geschmack Äthiopiens!',
      },
    ],
  },

  // 12 — 22.03.2026 — Niter Kibbeh
  {
    slug: 'niter-kibbeh-goldenes-geheimnis',
    title: 'Niter Kibbeh: Das goldene Geheimnis der äthiopischen Küche',
    metaDescription: 'Was ist Niter Kibbeh? Das gewürzte Butterschmalz ist die Seele der äthiopischen Küche – Herzstück von Doro Wat, Kitfo und Injera. Alles über Nitir Qibe im Habesha Salzburg.',
    keywords: ['Niter Kibbeh', 'Nitir Qibe', 'gewürztes Butterschmalz', 'äthiopisches Ghee', 'Doro Wat Zutat', 'äthiopische Küche Salzburg'],
    date: '2026-03-22',
    category: 'Kultur & Zutaten',
    readingTime: 5,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/kaffezeremonie_blog_34bc8619.jpg',
    imageAlt: 'Goldenes gewürztes Butterschmalz – Niter Kibbeh, das Herzstück der äthiopischen Küche',
    teaser: 'Niter Kibbeh ist mehr als Butterschmalz – es ist das goldene Herzstück der äthiopischen Küche. Gewürzt mit Knoblauch, Ingwer, Kardamom und Besobila verwandelt es jedes Gericht in ein Festmahl.',
    content: [
      {
        type: 'paragraph',
        text: 'Wenn Sie jemals die Ehre hatten, ein traditionelles äthiopisches Gericht zu probieren, haben Sie sich vielleicht gefragt, was ihm diesen unvergleichlichen, tiefen und komplexen Geschmack verleiht. Die Antwort liegt oft in einer unscheinbaren, aber essenziellen Zutat: Niter Kibbeh (auch Nitir Qibe).',
      },
      {
        type: 'heading',
        text: 'Was ist Niter Kibbeh?',
      },
      {
        type: 'paragraph',
        text: 'Niter Kibbeh ist viel mehr als nur Butterschmalz (Ghee). Es ist eine gewürzte, geklärte Butter, die das Herzstück vieler äthiopischer Eintöpfe (Wats) bildet. Die Butter wird langsam geschmolzen und dann mit einer Vielzahl aromatischer Gewürze und Kräuter infundiert – ein aufwendiger und liebevoller Prozess.',
      },
      {
        type: 'heading',
        text: 'Die Magie der Gewürze',
      },
      {
        type: 'list',
        items: [
          'Knoblauch & Ingwer – aromatische Basis',
          'Zwiebeln – für Süße und Tiefe',
          'Besobila (äthiopisches Basilikum) – leicht minzig und blumig',
          'Korerima (äthiopischer Kardamom) – unverzichtbar für das authentische Aroma',
          'Nelken, Zimt, Bockshornklee – für Wärme und Komplexität',
        ],
      },
      {
        type: 'heading',
        text: 'Verwendung in der äthiopischen Küche',
      },
      {
        type: 'paragraph',
        text: 'Niter Kibbeh ist nicht nur ein Fett zum Braten – es ist ein Geschmacksträger. Es bildet die unverzichtbare Basis für das Nationalgericht Doro Wat (Hühnchen-Eintopf) und Kitfo (rohes Rinderhackfleisch). Selbst das traditionelle Fladenbrot Injera wird manchmal mit Niter Kibbeh und Berbere-Gewürz bestrichen als Snack genossen.',
      },
      {
        type: 'heading',
        text: 'Ein Hauch von Gold',
      },
      {
        type: 'paragraph',
        text: 'In Äthiopien ist Niter Kibbeh ein Zeichen von Wohlstand und kulinarischem Können. Es ist das „goldene Geheimnis", das gewöhnliche Zutaten in ein Festmahl verwandelt. Probieren Sie es selbst aus – und Sie werden verstehen, warum dieses gewürzte Butterschmalz der wahre Geist der äthiopischen Küche ist.',
      },
      {
        type: 'cta',
        text: 'Entdecken Sie den Geschmack von Niter Kibbeh in unseren authentischen Gerichten – besuchen Sie uns im Habesha Restaurant Salzburg!',
      },
    ],
  },

];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getLatestBlogPosts(count: number): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
