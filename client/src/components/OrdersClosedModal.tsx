import { X, Phone } from 'lucide-react';

interface OrdersClosedModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrdersClosedModal({ open, onClose }: OrdersClosedModalProps) {
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
        className="relative bg-[#fdfbf7] rounded-3xl shadow-2xl max-w-sm w-full p-8 border border-[#1a3a32]/20"
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
        <div className="text-5xl mb-4 text-center">🔒</div>

        {/* Heading */}
        <h2 className="font-serif text-2xl font-bold text-[#1a3a32] text-center mb-3">
          Bestellungen pausiert
        </h2>

        {/* Message */}
        <p className="text-[#1a3a32]/70 text-sm leading-relaxed text-center mb-6">
          Wir nehmen gerade keine Online-Bestellungen an.<br />
          Bitte rufen Sie uns an oder versuchen Sie es später erneut.
        </p>

        {/* Phone CTA */}
        <a
          href="tel:+436607324766"
          className="flex items-center justify-center gap-2 w-full bg-[#1a3a32] hover:bg-[#1a3a32]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-colors mb-3"
          onClick={onClose}
        >
          <Phone size={16} />
          <span>+43 660 732 47 66</span>
        </a>

        {/* Footnote */}
        <p className="text-center text-[#1a3a32]/40 text-xs mt-2">
          Mo geschlossen · Di–So ab 17:00 Uhr
        </p>
      </div>
    </div>
  );
}
