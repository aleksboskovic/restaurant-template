import { useState, useMemo } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { getItemName as getStaticItemName, getItemDesc as getStaticItemDesc } from '@/lib/menuData';
import { Plus, Minus, ShoppingCart, Leaf, Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';

type Tab = 'mains' | 'vegan' | 'plates' | 'sides';

// Sanity MenuItem interface
interface SanityMenuItem {
  _id: string;
  name: string;
  name_en?: string;
  name_am?: string;
  description?: string;
  description_en?: string;
  description_am?: string;
  price: number;
  category: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  badge?: string;
  isAvailable?: boolean;
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

function MenuCard({ item }: { item: SanityMenuItem }) {
  const { lang } = useLang();
  const { items, addItem, removeItem } = useCart();
  const cartItem = items.find(i => i.id === item._id);
  const qty = cartItem?.quantity || 0;

  const name = useMemo(() => {
    if (lang === 'am' && item.name_am) return item.name_am;
    if (lang === 'en' && item.name_en) return item.name_en;
    return item.name;
  }, [item, lang]);

  const desc = useMemo(() => {
    if (lang === 'am' && item.description_am) return item.description_am;
    if (lang === 'en' && item.description_en) return item.description_en;
    return item.description;
  }, [item, lang]);

  if (item.isAvailable === false) return null;

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
          {lang !== 'am' && item.name_am && (
            <p className="text-[#d4af37] text-xs font-ethiopic mt-0.5">{item.name_am}</p>
          )}
        </div>
        <span className="text-[#1a3a32] font-bold text-sm whitespace-nowrap">
          {item.price.toFixed(2).replace('.', ',')} €
        </span>
      </div>

      {/* Description */}
      <p className={`text-[#1a3a32]/65 text-sm leading-relaxed flex-1 mb-4 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
        {desc}
      </p>

      {/* Add to cart */}
      <div className="flex items-center justify-between mt-auto">
        {qty === 0 ? (
          <button
            onClick={() => addItem({ 
              id: item._id, 
              name: item.name, 
              nameEn: item.name_en || item.name, 
              nameAm: item.name_am || item.name, 
              price: item.price 
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
                name: item.name, 
                nameEn: item.name_en || item.name, 
                nameAm: item.name_am || item.name, 
                price: item.price 
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

export default function MenuSection() {
  const { t, lang } = useLang();
  const { itemCount, total } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('mains');

  const { data: menuItemsData, isLoading } = trpc.menu.getAll.useQuery();

  const tabs: { key: Tab; label: string }[] = [
    { key: 'mains', label: t.menu_tab_mains },
    { key: 'vegan', label: t.menu_tab_vegan },
    { key: 'plates', label: t.menu_tab_plates },
    { key: 'sides', label: t.menu_tab_sides },
  ];

  const filteredItems = useMemo(() => {
    if (!menuItemsData) return [];
    return (menuItemsData as SanityMenuItem[]).filter(item => item.category === activeTab);
  }, [menuItemsData, activeTab]);

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

        {/* Menu Grid / Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
            <p className="text-[#1a3a32]/60 text-sm">Speisekarte wird geladen...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* Floating Cart Bar */}
        {itemCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
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
          </div>
        )}
      </div>
    </section>
  );
}


        {/* Floating Cart Bar */}
        {itemCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
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
          </div>
        )}
      </div>
    </section>
  );
}
