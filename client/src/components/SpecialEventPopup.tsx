import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { useLang } from '@/contexts/LanguageContext';
import { X, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
}

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description?: string;
    description_en?: string;
    description_am?: string;
    validFrom: string;
    validUntil: string;
    imageUrl?: string;
  };
  lang: string;
}

function EventCard({ event, lang }: EventCardProps) {
  const now = new Date();
  const isActive = new Date(event.validFrom) <= now && new Date(event.validUntil) >= now;
  const isComing = new Date(event.validFrom) > now;
  const countdownTarget = isComing ? event.validFrom : event.validUntil;
  const timeLeft = useCountdown(countdownTarget);

  const description =
    lang === 'en' ? (event.description_en || event.description || '') :
    lang === 'am' ? (event.description_am || event.description || '') :
    (event.description || '');

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('de-AT', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col h-full">
      {/* Banner image */}
      {event.imageUrl ? (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-t-2xl flex-shrink-0">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a32]/80 via-transparent to-transparent" />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
              isActive ? 'bg-green-500 text-white' : 'bg-[#d4af37] text-[#1a3a32]'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {isActive ? 'JETZT AKTIV' : 'BALD'}
            </span>
          </div>
        </div>
      ) : (
        /* Fallback: colored header when no image */
        <div className="relative w-full h-24 sm:h-28 overflow-hidden rounded-t-2xl flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a47 60%, #1a3a32 100%)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
          />
          <Calendar size={36} className="text-[#d4af37]/60 relative z-10" />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
              isActive ? 'bg-green-500 text-white' : 'bg-[#d4af37] text-[#1a3a32]'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {isActive ? 'JETZT AKTIV' : 'BALD'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-[#1a3a32] leading-tight">{event.title}</h3>

        {/* Description */}
        {description && (
          <p className="text-[#1a3a32]/65 text-sm leading-relaxed line-clamp-3">{description}</p>
        )}

        {/* Date range */}
        <div className="flex items-center gap-2 text-xs text-[#1a3a32]/50">
          <Clock size={12} />
          <span>{formatDate(event.validFrom)} – {formatDate(event.validUntil)}</span>
        </div>

        {/* Countdown */}
        <div className="mt-auto pt-3 border-t border-[#1a3a32]/10">
          <p className="text-[10px] uppercase tracking-widest text-[#1a3a32]/40 mb-2">
            {isComing ? 'Startet in' : 'Endet in'}
          </p>
          <div className="flex items-end gap-2">
            {[
              { value: timeLeft.days, label: 'Tage' },
              { value: timeLeft.hours, label: 'Std' },
              { value: timeLeft.minutes, label: 'Min' },
              { value: timeLeft.seconds, label: 'Sek' },
            ].map((unit, i) => (
              <div key={i} className="flex items-end gap-1">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#1a3a32] tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#1a3a32]/40 mt-0.5">{unit.label}</span>
                </div>
                {i < 3 && <span className="text-[#1a3a32]/30 text-lg font-bold mb-3">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpecialEventPopup() {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only show once per session
  useEffect(() => {
    const key = 'habesha_event_popup_dismissed';
    if (sessionStorage.getItem(key)) {
      setDismissed(true);
    }
  }, []);

  const { data: events = [] } = trpc.specialEvents.getActive.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  if (!events.length || dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem('habesha_event_popup_dismissed', '1');
    setDismissed(true);
  };

  const prev = () => setCurrentIndex(i => (i - 1 + events.length) % events.length);
  const next = () => setCurrentIndex(i => (i + 1) % events.length);

  const event = events[currentIndex];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
      onClick={handleDismiss}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#fdfbf7] rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden border border-[#1a3a32]/10"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Ethiopian flag stripe */}
        <div className="flex w-full h-[3px]">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#1a3a32]/60 hover:text-[#1a3a32] hover:bg-white transition-all"
          aria-label="Schließen"
        >
          <X size={16} />
        </button>

        {/* Event card */}
        <EventCard event={event} lang={lang} />

        {/* Pagination (only if multiple events) */}
        {events.length > 1 && (
          <div className="flex items-center justify-between px-5 pb-4">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-[#1a3a32]/20 flex items-center justify-center text-[#1a3a32]/60 hover:border-[#1a3a32]/60 hover:text-[#1a3a32] transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {/* Dots */}
            <div className="flex gap-1.5">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-[#1a3a32] w-4' : 'bg-[#1a3a32]/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-[#1a3a32]/20 flex items-center justify-center text-[#1a3a32]/60 hover:border-[#1a3a32]/60 hover:text-[#1a3a32] transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Dismiss hint */}
        <p className="text-center text-[#1a3a32]/30 text-xs pb-4 px-5">
          Tippen Sie irgendwo außerhalb, um zu schließen
        </p>
      </div>
    </div>
  );
}
