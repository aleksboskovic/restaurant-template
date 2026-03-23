import { Phone, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';

export default function FloatingButtons() {
  const { itemCount, total } = useCart();
  const [, navigate] = useLocation();
  const hasItems = itemCount > 0;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Telefon – always visible */}
      <a
        href="tel:+436607324766"
        className="group flex items-center gap-2 bg-[#1a3a32] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#d4af37] hover:text-[#1a3a32] transition-all duration-300"
        title="Anrufen"
      >
        <Phone size={18} />
        <span className="text-xs font-semibold tracking-wide hidden sm:block">Anrufen</span>
      </a>

      {/* Warenkorb – only visible when items are in cart */}
      {hasItems && (
        <button
          onClick={() => navigate('/bestellen')}
          className="group flex items-center gap-2 bg-[#d4af37] text-[#1a3a32] px-4 py-3 rounded-full shadow-lg hover:bg-[#c49b2a] transition-all duration-300 animate-in slide-in-from-bottom-2"
          title="Warenkorb"
        >
          <div className="relative">
            <ShoppingCart size={18} />
            <span className="absolute -top-2 -right-2 bg-[#1a3a32] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          </div>
          <span className="text-xs font-semibold tracking-wide hidden sm:block">
            {total.toFixed(2).replace('.', ',')} €
          </span>
        </button>
      )}
    </div>
  );
}
