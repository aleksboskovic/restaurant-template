// HABESHA Menu Data – alle Gerichte in DE/EN/AM
// Basiert auf der originalen index.html

export interface MenuItem {
  id: string;
  nameDe: string;
  nameEn: string;
  nameAm: string;
  descDe: string;
  descEn: string;
  descAm: string;
  price: string;          // Display-String z.B. "19,40 €"
  priceNum: number;       // Numerisch für Warenkorb
  category: 'mains' | 'vegan' | 'plates' | 'sides';
  isVegan?: boolean;
  isVegetarian?: boolean;
  badge?: string;         // z.B. "Chef's Choice"
}

export const menuItems: MenuItem[] = [
  // ── FLEISCHGERICHTE ──────────────────────────────────────────
  {
    id: 'zilzil-tibs',
    nameDe: 'Zilzil Tibs',
    nameEn: 'Zilzil Tibs',
    nameAm: 'ዝልዝል ጥብስ',
    descDe: 'Durchgebratenes Rindfleisch in Streifen mit Zwiebeln, grüner Paprika und frischen Kräutern.',
    descEn: 'Well-done beef strips with onions, green paprika, and fresh herbs.',
    descAm: 'በጥሩ ሁኔታ የተጠበሰ የበሬ ሥጋ ከሽንኩርት፣ አረንጓዴ በርበሬ እና ትኩስ ቅጠላቅጠሎች ጋር።',
    price: '19,40 €',
    priceNum: 19.40,
    category: 'mains',
  },
  {
    id: 'tibs-small',
    nameDe: 'Tibs (Klein)',
    nameEn: 'Tibs (Small)',
    nameAm: 'ጥብስ (ትንሽ)',
    descDe: 'Zartes Rindfleisch gebraten mit gemahlener Paprika, gewürzter Butter und Zwiebeln.',
    descEn: 'Tender beef roasted with ground paprika, spiced butter, and onions.',
    descAm: 'ለስላሳ የበሬ ሥጋ ከቀይ በርበሬ፣ ቅቤ እና ሽንኩርት ጋር የተጠበሰ።',
    price: '19,40 €',
    priceNum: 19.40,
    category: 'mains',
  },
  {
    id: 'tibs-large',
    nameDe: 'Tibs (Groß)',
    nameEn: 'Tibs (Large)',
    nameAm: 'ጥብስ (ትልቅ)',
    descDe: 'Zartes Rindfleisch gebraten mit gemahlener Paprika, gewürzter Butter und Zwiebeln.',
    descEn: 'Tender beef roasted with ground paprika, spiced butter, and onions.',
    descAm: 'ለስላሳ የበሬ ሥጋ ከቀይ በርበሬ፣ ቅቤ እና ሽንኩርት ጋር የተጠበሰ።',
    price: '23,90 €',
    priceNum: 23.90,
    category: 'mains',
  },
  {
    id: 'doro-wot',
    nameDe: 'Doro Wot',
    nameEn: 'Doro Wot',
    nameAm: 'ዶሮ ወጥ',
    descDe: 'Hähnchenkeule geschmort in pikanter Sauce, serviert mit Ei, Frischkäse und Salat.',
    descEn: 'Chicken leg braised in a spicy sauce, served with egg, fresh cheese, and salad.',
    descAm: 'የዶሮ ጭን በቀይ ወጥ ውስጥ የተቀቀለ፣ ከእንቁላል፣ አይብ እና ሰላጣ ጋር ይቀርባል።',
    price: '19,40 €',
    priceNum: 19.40,
    category: 'mains',
    badge: "Chef's Choice",
  },
  {
    id: 'cas-light',
    nameDe: 'Cas Light',
    nameEn: 'Cas Light',
    nameAm: 'ካስ ላይት',
    descDe: 'Klein geschnittenes, angebratenes, saftiges Rindfleisch.',
    descEn: 'Finely chopped, roasted, juicy beef.',
    descAm: 'ትንሽ ተቆርጦ የተጠበሰ ጭማቂ የበሬ ሥጋ።',
    price: '19,40 €',
    priceNum: 19.40,
    category: 'mains',
  },
  {
    id: 'bozena-shiro',
    nameDe: 'Bozena Shiro',
    nameEn: 'Bozena Shiro',
    nameAm: 'ቦዘና ሽሮ',
    descDe: 'Milde Sauce aus Kichererbsenmehl mit Rindfleischstücken, Zwiebeln und Salat.',
    descEn: 'Mild chickpea flour sauce with beef pieces, onions, and salad.',
    descAm: 'ከሽምብራ ዱቄት የተሰራ ቀለል ያለ ወጥ ከበሬ ሥጋ ቁርጥ፣ ሽንኩርት እና ሰላጣ ጋር።',
    price: '19,40 €',
    priceNum: 19.40,
    category: 'mains',
  },
  {
    id: 'kitfo',
    nameDe: 'Kitfo',
    nameEn: 'Kitfo',
    nameAm: 'ክትፎ',
    descDe: 'Gehacktes Rindfleisch (Tartar) mit Chili, Butter, Ayib und Grünkohl.',
    descEn: 'Minced beef (tartare) with chili, butter, Ayib, and kale.',
    descAm: 'የተፈጨ የበሬ ሥጋ (ታርታር) ከሚጥሚጣ፣ ቅቤ፣ አይብ እና ጎመን ጋር።',
    price: '19,40 €',
    priceNum: 19.40,
    category: 'mains',
  },

  // ── VEGAN & VEGGIE ───────────────────────────────────────────
  {
    id: 'shiro-wot',
    nameDe: 'Shiro Wot',
    nameEn: 'Shiro Wot',
    nameAm: 'ሽሮ ወጥ',
    descDe: 'Milde Sauce aus geröstetem Kichererbsenmehl, serviert mit Injera.',
    descEn: 'Mild sauce made from roasted chickpea flour, served with Injera.',
    descAm: 'ከተቆላ ሽምብራ ዱቄት የተሰራ ቀለል ያለ ወጥ ከእንጀራ ጋር ይቀርባል።',
    price: '14,90 €',
    priceNum: 14.90,
    category: 'vegan',
    isVegan: true,
  },
  {
    id: 'yellow-peas',
    nameDe: 'Gelbe Spalterbsen mit Salat',
    nameEn: 'Yellow Split Peas with Salad',
    nameAm: 'ቢጫ ምስር ከሰላጣ ጋር',
    descDe: 'Gelbe Spalterbsen in einem milden Curry mit frischem Beilagensalat.',
    descEn: 'Yellow split peas in a mild curry with a fresh side salad.',
    descAm: 'ቢጫ ምስር በቀለል ያለ ካሪ ከትኩስ ሰላጣ ጋር።',
    price: '14,90 €',
    priceNum: 14.90,
    category: 'vegan',
    isVegan: true,
  },
  {
    id: 'lentil-sauce',
    nameDe: 'Linsensauce mit Salat',
    nameEn: 'Lentil Sauce with Salad',
    nameAm: 'ምስር ወጥ ከሰላጣ ጋር',
    descDe: 'Linsen in einer milden Paprikasauce mit einem frischen Beilagensalat.',
    descEn: 'Lentils in a mild paprika sauce with a fresh side salad.',
    descAm: 'ምስር በቀለል ያለ ቀይ በርበሬ ወጥ ከትኩስ ሰላጣ ጋር።',
    price: '14,90 €',
    priceNum: 14.90,
    category: 'vegan',
    isVegan: true,
  },
  {
    id: 'gomen',
    nameDe: 'Gomen (Grünkohl)',
    nameEn: 'Gomen (Kale)',
    nameAm: 'ጎመን',
    descDe: 'Gedünsteter Grünkohl mit Zwiebeln, Knoblauch und äthiopischen Gewürzen.',
    descEn: 'Steamed kale with onions, garlic, and Ethiopian spices.',
    descAm: 'ከሽንኩርት፣ ነጭ ሽንኩርት እና የኢትዮጵያ ቅመማቅመሞች ጋር የተቀቀለ ጎመን።',
    price: '14,90 €',
    priceNum: 14.90,
    category: 'vegan',
    isVegan: true,
  },
  {
    id: 'misir-wot',
    nameDe: 'Misir Wot',
    nameEn: 'Misir Wot',
    nameAm: 'ምስር ወጥ',
    descDe: 'Rote Linsen in einer würzigen Berbere-Sauce, traditionell äthiopisch.',
    descEn: 'Red lentils in a spicy Berbere sauce, traditionally Ethiopian.',
    descAm: 'ቀይ ምስር በቅመማቅመም ቤርቤሬ ወጥ ውስጥ፣ ባህላዊ የኢትዮጵያ ምግብ።',
    price: '14,90 €',
    priceNum: 14.90,
    category: 'vegan',
    isVegan: true,
  },

  // ── KOMBIPLATTEN ─────────────────────────────────────────────
  {
    id: 'kombi-1',
    nameDe: 'Habesha Kombi Platte (1 Person)',
    nameEn: 'Habesha Combo Platter (1 Person)',
    nameAm: 'ሀበሻ ኮምቢ ሳህን (1 ሰው)',
    descDe: 'Die perfekte Wahl: Eine gemischte Platte aus verschiedenen Fleischgerichten.',
    descEn: 'The perfect choice: A mixed platter of various meat dishes.',
    descAm: 'ምርጥ ምርጫ፡ ከተለያዩ የስጋ ምግቦች የተዘጋጀ ድብልቅ ሳህን።',
    price: '24,90 €',
    priceNum: 24.90,
    category: 'plates',
  },
  {
    id: 'kombi-2',
    nameDe: 'Habesha Kombi Platte (2 Personen)',
    nameEn: 'Habesha Combo Platter (2 Persons)',
    nameAm: 'ሀበሻ ኮምቢ ሳህን (2 ሰዎች)',
    descDe: 'Ideal zum Teilen: Gemischte Platte aus verschiedenen Hausgerichten.',
    descEn: 'Ideal for sharing: Mixed platter of various house specialties.',
    descAm: 'ለመካፈል ተስማሚ፡ ከተለያዩ የቤት ምግቦች የተዘጋጀ ድብልቅ ሳህን።',
    price: '44,90 €',
    priceNum: 44.90,
    category: 'plates',
    badge: 'Beliebt',
  },
  {
    id: 'kombi-vegan',
    nameDe: 'Habesha Kombi (Vegan/Vegetarisch)',
    nameEn: 'Habesha Combo (Vegan/Vegetarian)',
    nameAm: 'ሀበሻ ኮምቢ (ቪጋን/ቬጀቴሪያን)',
    descDe: 'Eine bunte Palette aus verschiedenen veganen und vegetarischen Gerichten.',
    descEn: 'A colorful palette of various vegan and vegetarian dishes.',
    descAm: 'ከተለያዩ ቪጋን እና ቬጀቴሪያን ምግቦች የተዘጋጀ ቀለማማ ሳህን።',
    price: '19,90 €',
    priceNum: 19.90,
    category: 'plates',
    isVegan: true,
  },

  // ── BEILAGEN & SALATE ────────────────────────────────────────
  {
    id: 'salad-small',
    nameDe: 'Salat Klein',
    nameEn: 'Salad Small',
    nameAm: 'ሰላጣ ትንሽ',
    descDe: 'Blattsalat mit Tomaten, Gurkenscheiben und Dressing.',
    descEn: 'Leaf salad with tomatoes, cucumber slices, and dressing.',
    descAm: 'ቅጠላቅጠል ሰላጣ ከቲማቲም፣ ዱባ እና ሶስ ጋር።',
    price: '4,50 €',
    priceNum: 4.50,
    category: 'sides',
    isVegan: true,
  },
  {
    id: 'salad-large',
    nameDe: 'Salat Groß',
    nameEn: 'Salad Large',
    nameAm: 'ሰላጣ ትልቅ',
    descDe: 'Blattsalat mit Tomaten, Gurkenscheiben und Dressing.',
    descEn: 'Leaf salad with tomatoes, cucumber slices, and dressing.',
    descAm: 'ቅጠላቅጠል ሰላጣ ከቲማቲም፣ ዱባ እና ሶስ ጋር።',
    price: '7,50 €',
    priceNum: 7.50,
    category: 'sides',
    isVegan: true,
  },
  {
    id: 'sambusa-veggie',
    nameDe: 'Sambusa (Gemüse)',
    nameEn: 'Sambusa (Vegetable)',
    nameAm: 'ሳምቡሳ (አትክልት)',
    descDe: 'Frittierte Teigtaschen gefüllt mit Gemüse.',
    descEn: 'Fried pastries filled with vegetables.',
    descAm: 'ከአትክልት ጋር የተሞላ የተጠበሰ ሳምቡሳ።',
    price: '5,90 €',
    priceNum: 5.90,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 'sambusa-beef',
    nameDe: 'Sambusa (Rind)',
    nameEn: 'Sambusa (Beef)',
    nameAm: 'ሳምቡሳ (ሥጋ)',
    descDe: 'Frittierte Teigtaschen gefüllt mit Rindfleisch.',
    descEn: 'Fried pastries filled with beef.',
    descAm: 'ከሥጋ ጋር የተሞላ የተጠበሰ ሳምቡሳ።',
    price: '6,50 €',
    priceNum: 6.50,
    category: 'sides',
  },
  {
    id: 'lentil-soup',
    nameDe: 'Linsensuppe',
    nameEn: 'Lentil Soup',
    nameAm: 'የምስር ሾርባ',
    descDe: 'Im äthiopischen Stil aus Linsen und Karotten.',
    descEn: 'Ethiopian style with lentils and carrots.',
    descAm: 'ከምስር እና ካሮት ጋር በኢትዮጵያ ዘዴ የተዘጋጀ።',
    price: '5,90 €',
    priceNum: 5.90,
    category: 'sides',
    isVegan: true,
  },
  {
    id: 'injera-side',
    nameDe: 'Injera (2 Rollen)',
    nameEn: 'Injera (2 Rolls)',
    nameAm: 'እንጀራ (2 ሮሎ)',
    descDe: '2 Rollen frisches Injera-Fladenbrot als Beilage.',
    descEn: '2 rolls of fresh Injera flatbread as a side.',
    descAm: '2 ሮሎ ትኩስ እንጀራ እንደ ጎን ምግብ።',
    price: '3,50 €',
    priceNum: 3.50,
    category: 'sides',
    isVegan: true,
  },
];

export function getMenuByCategory(category: MenuItem['category']) {
  return menuItems.filter(item => item.category === category);
}

export function getItemName(item: MenuItem, lang: 'de' | 'en' | 'am'): string {
  if (lang === 'en') return item.nameEn;
  if (lang === 'am') return item.nameAm;
  return item.nameDe;
}

export function getItemDesc(item: MenuItem, lang: 'de' | 'en' | 'am'): string {
  if (lang === 'en') return item.descEn;
  if (lang === 'am') return item.descAm;
  return item.descDe;
}
