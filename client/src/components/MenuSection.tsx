import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { ShoppingCart, Leaf, Loader2 } from 'lucide-react';
import DeliveryComingSoonModal from '@/components/DeliveryComingSoonModal';

type Tab = 'mains' | 'vegan' | 'plates' | 'sides';

interface MenuItem {
  id: string;
  nameDe: string;
  nameEn: string;
  nameAm: string;
  descDe: string;
  descEn: string;
  descAm: string;
  price: string;
  priceNum: number;
  category: 'mains' | 'vegan' | 'plates' | 'sides';
  isVegan?: boolean;
  isVegetarian?: boolean;
  badge?: string;
}

function VeganBadge({ isVegan, isVegetarian }: { isVegan?: boolean; isVegetarian?: boolean }) {
  if (isVegan) return (
    <span className="inline-flex items-center gap-0.5 text-green-600 text-xs font-medium">
      <Leaf size={10} className="fill-green-600" />
      <Leaf size={10} className="fill-green-600" />
    </span>
  );
  if (isVegetarian) return (
    <span className="inline-flex items-center gap-0.5 text-green-600 text-xs font-medium">
      <Leaf size={10} className="fill-green-600" />
    </span>
  );
  return null;
}

function MenuCard({ item, onOrderClick }: { item: MenuItem; onOrderClick: () => void }) {
  const { lang } = useLang();

  // Lokalisierter Name und Beschreibung direkt aus Sanity-Feldern
  const name = lang === 'en' ? (item.nameEn || item.nameDe)
             : lang === 'am' ? (item.nameAm || item.nameDe)
             : item.nameDe;

  const desc = lang === 'en' ? (item.descEn || item.descDe)
             : lang === 'am' ? (item.descAm || item.descDe)
             : item.descDe;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#1a3a32]/8 hover:shadow-md hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-serif text-base font-bold text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {name}
            </h3>
            <VeganBadge isVegan={item.isVegan} isVegetarian={item.isVegetarian} />
            {item.badge && (
              <span className="text-[10px] bg-[#d4af37] text-white px-2 py-0.5 rounded-full font-medium tracking-wide">
                {item.badge}
              </span>
            )}
          </div>
          {/* Amharischer Name falls nicht AM-Sprache */}
          {lang !== 'am' && item.nameAm && (
            <p className="text-[#d4af37] text-xs font-ethiopic mt-0.5">{item.nameAm}</p>
          )}
        </div>
        <span className="text-[#1a3a32] font-bold text-sm whitespace-nowrap">{item.price}</span>
      </div>

      {/* Description */}
      <p className={`text-[#1a3a32]/65 text-sm leading-relaxed flex-1 mb-4 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
        {desc}
      </p>

      {/* Order button */}
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={onOrderClick}
          className="flex items-center gap-2 bg-[#1a3a32] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#d4af37] hover:text-[#1a3a32] transition-colors"
        >
          <ShoppingCart size={14} />
          <span>Bestellen</span>
        </button>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>('mains');
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  // Sanity-Daten laden
  const { data: sanityItems, isLoading, isError } = trpc.menu.getAll.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: 'mains', label: t.menu_tab_mains },
    { key: 'vegan', label: t.menu_tab_vegan },
    { key: 'plates', label: t.menu_tab_plates },
    { key: 'sides', label: t.menu_tab_sides },
  ];

  const allItems: MenuItem[] = (sanityItems as MenuItem[] | undefined) ?? [];
  const items = allItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-0.5">
              <div className="h-px w-6" style={{ background: '#078930' }} />
              <div className="h-px w-6" style={{ background: '#FCDD09' }} />
              <div className="h-px w-6" style={{ background: '#DA121A' }} />
            </div>
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Speisekarte</span>
            <div className="flex gap-0.5">
              <div className="h-px w-6" style={{ background: '#DA121A' }} />
              <div className="h-px w-6" style={{ background: '#FCDD09' }} />
              <div className="h-px w-6" style={{ background: '#078930' }} />
            </div>
          </div>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-[#1a3a32] mb-4 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.menu_title}
          </h2>
          <p className={`text-[#1a3a32]/70 max-w-2xl mx-auto text-sm leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.menu_subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === key
                  ? 'menu-tab-active'
                  : 'bg-white text-[#1a3a32] hover:bg-[#1a3a32]/10 border border-[#1a3a32]/20'
              } ${lang === 'am' ? 'font-ethiopic' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-[#1a3a32]" size={32} />
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="text-center py-12 text-[#1a3a32]/50">
            Speisekarte konnte nicht geladen werden. Bitte versuchen Sie es später erneut.
          </div>
        )}

        {/* Menu Grid */}
        {!isLoading && !isError && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} onOrderClick={() => setDeliveryModalOpen(true)} />
            ))}
            {items.length === 0 && (
              <div className="col-span-3 text-center py-12 text-[#1a3a32]/50">
                Keine Gerichte in dieser Kategorie verfügbar.
              </div>
            )}
          </div>
        )}

        {/* Lieferando CTA Bar */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setDeliveryModalOpen(true)}
            className="flex items-center gap-3 bg-[#1a3a32] text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-[#d4af37] hover:text-[#1a3a32] transition-all font-semibold text-sm"
          >
            <ShoppingCart size={18} />
            <span>Jetzt bestellen</span>
          </button>
        </div>
        <DeliveryComingSoonModal open={deliveryModalOpen} onClose={() => setDeliveryModalOpen(false)} />
      </div>
    </section>
  );
}
