import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { trpc } from '@/lib/trpc';
import { Plus, Minus, ShoppingCart, Leaf, Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import OrdersClosedModal from '@/components/OrdersClosedModal';

type Tab = 'mains' | 'vegan' | 'plates' | 'sides';

interface MenuItem {
  _id: string;
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
  allergens?: string[];
  isHalal?: boolean;
}

// EU Allergen legend A–R
const ALLERGEN_LEGEND: { code: string; label: string }[] = [
  { code: 'A', label: 'Glutenhaltiges Getreide' },
  { code: 'B', label: 'Krebstiere' },
  { code: 'C', label: 'Ei' },
  { code: 'D', label: 'Fisch' },
  { code: 'E', label: 'Erdnuss' },
  { code: 'F', label: 'Soja' },
  { code: 'G', label: 'Milch / Laktose' },
  { code: 'H', label: 'Schalenfrüchte' },
  { code: 'L', label: 'Sellerie' },
  { code: 'M', label: 'Senf' },
  { code: 'N', label: 'Sesam' },
  { code: 'O', label: 'Sulfite' },
  { code: 'P', label: 'Lupinen' },
  { code: 'R', label: 'Weichtiere' },
];

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

function HalalBadge() {
  return (
    <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-[#078930] uppercase leading-none border border-[#078930]/40 rounded px-1 py-0.5">
      HALAL
    </span>
  );
}

function AllergenBadges({ allergens }: { allergens?: string[] }) {
  if (!allergens || allergens.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {allergens.map((code) => (
        <span
          key={code}
          title={ALLERGEN_LEGEND.find(a => a.code === code)?.label || code}
          className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#1a3a32]/10 text-[#1a3a32] text-[10px] font-bold border border-[#1a3a32]/20 cursor-default"
        >
          {code}
        </span>
      ))}
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { lang } = useLang();
  const { items, addItem, removeItem } = useCart();
  const cartItem = items.find(i => i.id === item._id);
  const qty = cartItem?.quantity || 0;

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
            {item.isHalal && <HalalBadge />}
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
        <span className="text-[#1a3a32] font-bold text-sm whitespace-nowrap">
          {item.priceNum.toFixed(2).replace('.', ',')} €
        </span>
      </div>

      {/* Description */}
      <p className={`text-[#1a3a32]/65 text-sm leading-relaxed flex-1 mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
        {desc}
      </p>

      {/* Allergen badges */}
      <AllergenBadges allergens={item.allergens} />

      {/* Add to cart */}
      <div className="flex items-center justify-between mt-auto pt-3">
        {qty === 0 ? (
          <button
            onClick={() => addItem({
              id: item._id,
              name: item.nameDe,
              nameEn: item.nameEn || item.nameDe,
              nameAm: item.nameAm || item.nameDe,
              price: item.priceNum,
            })}
            className="flex items-center gap-2 bg-[#1a3a32] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#1a3a32]/90 transition-colors"
          >
            <Plus size={14} />
            <span>Hinzufügen</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => removeItem(item._id)}
              className="w-8 h-8 rounded-full border-2 border-[#1a3a32] text-[#1a3a32] flex items-center justify-center hover:bg-[#1a3a32] hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-[#1a3a32] font-bold text-sm w-4 text-center">{qty}</span>
            <button
              onClick={() => addItem({
                id: item._id,
                name: item.nameDe,
                nameEn: item.nameEn || item.nameDe,
                nameAm: item.nameAm || item.nameDe,
                price: item.priceNum,
              })}
              className="w-8 h-8 rounded-full bg-[#1a3a32] text-white flex items-center justify-center hover:bg-[#1a3a32]/90 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AllergenLegend() {
  return (
    <div className="mt-12 bg-[#1a3a32]/5 border border-[#1a3a32]/15 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#1a3a32] text-xs font-bold tracking-[0.2em] uppercase">Allergeninformation</span>
        <span className="text-[#1a3a32]/40 text-xs">gemäß Codex-Empfehlung</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-4 gap-y-1.5">
        {ALLERGEN_LEGEND.map(({ code, label }) => (
          <div key={code} className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#1a3a32]/10 text-[#1a3a32] text-[10px] font-bold border border-[#1a3a32]/20 flex-shrink-0">
              {code}
            </span>
            <span className="text-[#1a3a32]/70 text-[11px] leading-tight">{label}</span>
          </div>
        ))}
        {/* HALAL */}
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-[#078930] uppercase border border-[#078930]/40 rounded px-1 py-0.5 flex-shrink-0">
            HALAL
          </span>
          <span className="text-[#1a3a32]/70 text-[11px] leading-tight">Halal-zertifiziert</span>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const { t, lang } = useLang();
  const { itemCount, total } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('mains');
  const [ordersClosedModalOpen, setOrdersClosedModalOpen] = useState(false);

  const { data: orderSettingsData } = trpc.orderSettings.getEnabled.useQuery();
  const ordersEnabled = orderSettingsData?.enabled ?? true;

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

  const allItems = (sanityItems as MenuItem[] | undefined) ?? [];
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
              <MenuCard key={item._id} item={item} />
            ))}
            {items.length === 0 && (
              <div className="col-span-3 text-center py-12 text-[#1a3a32]/50">
                Keine Gerichte in dieser Kategorie verfügbar.
              </div>
            )}
          </div>
        )}

        {/* Allergen Legend */}
        {!isLoading && !isError && <AllergenLegend />}

        {/* Floating Cart Bar */}
        {itemCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
            {ordersEnabled ? (
              <Link
                href="/bestellen"
                className="flex items-center justify-between bg-[#1a3a32] text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-[#1a3a32]/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#d4af37] text-[#1a3a32] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {itemCount}
                  </div>
                  <span className="text-sm font-semibold">Warenkorb ansehen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{total.toFixed(2).replace('.', ',')} €</span>
                  <ShoppingCart size={18} />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => setOrdersClosedModalOpen(true)}
                className="w-full flex items-center justify-between bg-[#1a3a32] text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-[#1a3a32]/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {itemCount}
                  </div>
                  <span className="text-sm font-semibold">Bestellungen pausiert</span>
                </div>
                <ShoppingCart size={18} />
              </button>
            )}
          </div>
        )}
        <OrdersClosedModal open={ordersClosedModalOpen} onClose={() => setOrdersClosedModalOpen(false)} />
      </div>
    </section>
  );
}
