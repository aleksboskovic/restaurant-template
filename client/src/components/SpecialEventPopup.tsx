/**
 * SpecialEventPopup — zeigt alle aktiven Events die KEIN "geschlossen/closed"-Event sind
 * als schwebendes Pop-up beim Seitenaufruf.
 * Klick auf das Pop-up öffnet eine Vollansicht mit allen Details.
 */
import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { useLang } from '@/contexts/LanguageContext';
import { X, Calendar, ChevronLeft, ChevronRight, Clock, ArrowLeft } from 'lucide-react';

function isClosedNotice(title: string): boolean {
  const lower = title.toLowerCase();
  return lower.includes('geschlossen') || lower.includes('closed') || lower.includes('ዛሬ ተዘግተናል');
}

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

interface SanityEvent {
  _id: string;
  title: string;
  description?: string;
  description_en?: string;
  description_am?: string;
  validFrom: string;
  validUntil: string;
  imageUrl?: string;
}

// ── Detail View (full info after clicking) ──────────────────────────────────

function EventDetailView({ event, lang, onBack }: { event: SanityEvent; lang: string; onBack: () => void }) {
  const now = new Date();
  const isComing = new Date(event.validFrom) > now;
  const countdownTarget = isComing ? event.validFrom : event.validUntil;
  const timeLeft = useCountdown(countdownTarget);

  const description =
    lang === 'en' ? (event.description_en || event.description || '') :
    lang === 'am' ? (event.description_am || event.description || '') :
    (event.description || '');

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('de-AT', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col h-full">
      {/* Banner image */}
      {event.imageUrl && (
        <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-2xl flex-shrink-0">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a32]/70 via-transparent to-transparent" />
          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft size={12} />
            Zurück
          </button>
        </div>
      )}

      {!event.imageUrl && (
        <div className="flex items-center px-5 pt-5">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[#1a3a32]/50 hover:text-[#1a3a32] text-xs transition-colors">
            <ArrowLeft size={12} />
            Zurück
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1 overflow-y-auto">
        <h3 className="font-serif text-2xl font-bold text-[#1a3a32] leading-tight">{event.title}</h3>

        {/* Date range */}
        <div className="flex items-start gap-2 text-sm text-[#1a3a32]/60">
          <Clock size={14} className="mt-0.5 shrink-0" />
          <div>
            <div>{formatDate(event.validFrom)}</div>
            <div>bis {formatDate(event.validUntil)}</div>
          </div>
        </div>

        {/* Full description */}
        {description && (
          <p className="text-[#1a3a32]/70 text-sm leading-relaxed whitespace-pre-line">{description}</p>
        )}

        {/* Countdown */}
        <div className="mt-auto pt-4 border-t border-[#1a3a32]/10">
          <p className="text-[10px] uppercase tracking-widest text-[#1a3a32]/40 mb-3">
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
                  <span className="text-3xl font-bold text-[#1a3a32] tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#1a3a32]/40 mt-1">{unit.label}</span>
                </div>
                {i < 3 && <span className="text-[#1a3a32]/30 text-xl font-bold mb-4">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card Preview (initial popup view) ────────────────────────────────────────

function EventCardPreview({ event, lang, onClick }: { event: SanityEvent; lang: string; onClick: () => void }) {
  const now = new Date();
  const isComing = new Date(event.validFrom) > now;
  const countdownTarget = isComing ? event.validFrom : event.validUntil;
  const timeLeft = useCountdown(countdownTarget);

  const description =
    lang === 'en' ? (event.description_en || event.description || '') :
    lang === 'am' ? (event.description_am || event.description || '') :
    (event.description || '');

  const shortDesc = description.split('\n')[0];

  return (
    <div className="flex flex-col cursor-pointer group" onClick={onClick}>
      {/* Banner image */}
      {event.imageUrl ? (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-t-2xl flex-shrink-0">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a32]/70 via-transparent to-transparent" />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
              isComing ? 'bg-[#d4af37] text-[#1a3a32]' : 'bg-green-500 text-white'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {isComing ? 'BALD' : 'JETZT AKTIV'}
            </span>
          </div>
          {/* "Mehr erfahren" overlay */}
          <div className="absolute bottom-3 right-3 bg-white/90 text-[#1a3a32] text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Mehr erfahren →
          </div>
        </div>
      ) : (
        <div className="relative w-full h-24 overflow-hidden rounded-t-2xl flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a47 60%, #1a3a32 100%)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
          />
          <Calendar size={36} className="text-[#d4af37]/60 relative z-10" />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
              isComing ? 'bg-[#d4af37] text-[#1a3a32]' : 'bg-green-500 text-white'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {isComing ? 'BALD' : 'JETZT AKTIV'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-serif text-xl font-bold text-[#1a3a32] leading-tight">{event.title}</h3>
        {shortDesc && (
          <p className="text-[#1a3a32]/65 text-sm leading-relaxed line-clamp-2">{shortDesc}</p>
        )}

        {/* Tap hint */}
        <p className="text-[#1a3a32]/40 text-xs">Tippen für alle Details →</p>

        {/* Mini countdown */}
        <div className="pt-3 border-t border-[#1a3a32]/10">
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
                  <span className="text-xl font-bold text-[#1a3a32] tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#1a3a32]/40 mt-0.5">{unit.label}</span>
                </div>
                {i < 3 && <span className="text-[#1a3a32]/30 text-base font-bold mb-2.5">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Popup ────────────────────────────────────────────────────────────────

export default function SpecialEventPopup() {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  // Show once per session
  useEffect(() => {
    if (sessionStorage.getItem('habesha_event_popup_dismissed')) {
      setDismissed(true);
    }
  }, []);

  const { data: allEvents = [] } = trpc.specialEvents.getActive.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  // Only show non-closed events in the popup
  const events = allEvents.filter(e => !isClosedNotice(e.title));

  if (!events.length || dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem('habesha_event_popup_dismissed', '1');
    setDismissed(true);
  };

  const prev = () => { setShowDetail(false); setCurrentIndex(i => (i - 1 + events.length) % events.length); };
  const next = () => { setShowDetail(false); setCurrentIndex(i => (i + 1) % events.length); };

  const event = events[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
      onClick={showDetail ? undefined : handleDismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#fdfbf7] rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden border border-[#1a3a32]/10"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ethiopian flag stripe */}
        <div className="flex w-full h-[3px] flex-shrink-0">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#1a3a32]/60 hover:text-[#1a3a32] hover:bg-white transition-all"
          aria-label="Schließen"
        >
          <X size={16} />
        </button>

        {/* Content: preview or detail */}
        {showDetail ? (
          <EventDetailView event={event} lang={lang} onBack={() => setShowDetail(false)} />
        ) : (
          <EventCardPreview event={event} lang={lang} onClick={() => setShowDetail(true)} />
        )}

        {/* Pagination (only in preview, only if multiple events) */}
        {!showDetail && events.length > 1 && (
          <div className="flex items-center justify-between px-5 pb-4">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-[#1a3a32]/20 flex items-center justify-center text-[#1a3a32]/60 hover:border-[#1a3a32]/60 hover:text-[#1a3a32] transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setShowDetail(false); }}
                  className={`h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#1a3a32] w-4' : 'bg-[#1a3a32]/20 w-2'}`}
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

        {/* Dismiss hint (only in preview) */}
        {!showDetail && (
          <p className="text-center text-[#1a3a32]/30 text-xs pb-4 px-5">
            Tippen Sie außerhalb, um zu schließen
          </p>
        )}
      </div>
    </div>
  );
}
