import { Phone, CalendarCheck } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Quandoo Reservierung */}
      <a
        href="https://www.quandoo.at/place/habesha-athiopisches-restaurant-salzburg-77777"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#1a3a32] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#d4af37] hover:text-[#1a3a32] transition-all duration-300"
        title="Tisch reservieren via Quandoo"
      >
        <CalendarCheck size={18} />
        <span className="text-xs font-semibold tracking-wide hidden sm:block">Quandoo</span>
      </a>

      {/* Telefon */}
      <a
        href="tel:+436607324766"
        className="group flex items-center gap-2 bg-[#d4af37] text-[#1a3a32] px-4 py-3 rounded-full shadow-lg hover:bg-[#1a3a32] hover:text-white transition-all duration-300"
        title="Anrufen"
      >
        <Phone size={18} />
        <span className="text-xs font-semibold tracking-wide hidden sm:block">Anrufen</span>
      </a>
    </div>
  );
}
