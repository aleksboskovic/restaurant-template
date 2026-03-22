import { X, ExternalLink, Phone } from 'lucide-react';

interface DeliveryComingSoonModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeliveryComingSoonModal({ open, onClose }: DeliveryComingSoonModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#fdfbf7] rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#d4af37]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1a3a32]/8 hover:bg-[#1a3a32]/15 flex items-center justify-center text-[#1a3a32]/60 hover:text-[#1a3a32] transition-colors"
          aria-label="Schließen"
        >
          <X size={16} />
        </button>

        {/* Ethiopian flag stripe */}
        <div className="flex w-full h-[3px] rounded-full overflow-hidden mb-6">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>

        {/* Icon */}
        <div className="text-4xl mb-4 text-center">🚚</div>

        {/* Heading */}
        <h2 className="font-serif text-2xl font-bold text-[#1a3a32] text-center mb-3">
          Lieferung kommt bald!
        </h2>

        {/* Message */}
        <p className="text-[#1a3a32]/70 text-sm leading-relaxed text-center mb-6">
          Unsere eigene Online-Bestellung wird in wenigen Tagen verfügbar sein.
          Schauen Sie bald wieder vorbei!
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#1a3a32]/10" />
          <span className="text-[#1a3a32]/40 text-xs tracking-widest uppercase">Jetzt bestellen über</span>
          <div className="flex-1 h-px bg-[#1a3a32]/10" />
        </div>

        {/* Lieferando CTA */}
        <a
          href="https://www.lieferando.at/speisekarte/habesha-athiopische-restaurant-gebirgsjagerplatz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#ff8000] hover:bg-[#e67300] text-white font-bold py-3.5 px-6 rounded-2xl transition-colors mb-3"
          onClick={onClose}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lieferando_logo.svg/200px-Lieferando_logo.svg.png"
            alt="Lieferando"
            className="h-5 object-contain brightness-0 invert"
          />
          <span className="text-sm tracking-wide">Auf Lieferando bestellen</span>
          <ExternalLink size={14} className="opacity-70" />
        </a>

        {/* Phone CTA */}
        <a
          href="tel:+436607324766"
          className="flex items-center justify-center gap-2 w-full border-2 border-[#1a3a32] text-[#1a3a32] hover:bg-[#1a3a32] hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all text-sm"
          onClick={onClose}
        >
          <Phone size={15} />
          <span>Telefonisch nachfragen</span>
        </a>

        {/* Footnote */}
        <p className="text-center text-[#1a3a32]/40 text-xs mt-4">
          +43 660 732 47 66 · Mo geschlossen
        </p>
      </div>
    </div>
  );
}
