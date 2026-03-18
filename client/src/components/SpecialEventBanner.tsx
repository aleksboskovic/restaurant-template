import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useLang } from '@/contexts/LanguageContext';
import { X, Calendar, ChevronRight } from 'lucide-react';

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

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[2.5rem]">
      <span className="text-lg font-bold text-[#c8a96e] leading-none tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] uppercase tracking-widest text-white/60 mt-0.5">{label}</span>
    </div>
  );
}

export default function SpecialEventBanner() {
  const { lang } = useLang();
  const [, navigate] = useLocation();
  const [dismissed, setDismissed] = useState(false);

  // Alle zukünftigen Events laden (auch die die noch nicht begonnen haben)
  const { data: events } = trpc.specialEvents.getAll.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  // Nächstes aktives oder kommendes Event auswählen
  const now = new Date();
  const event = events?.find(e => {
    const until = new Date(e.validUntil);
    return until > now;
  });

  const timeLeft = useCountdown(event?.validFrom && new Date(event.validFrom) > now ? event.validFrom : event?.validUntil || '');

  if (!event || dismissed) return null;

  const isActive = new Date(event.validFrom) <= now && new Date(event.validUntil) >= now;
  const isComing = new Date(event.validFrom) > now;

  const title = lang === 'en' ? (event.title || '') : event.title;
  const description = lang === 'en' ? (event.description_en || event.description || '') :
    lang === 'am' ? (event.description_am || event.description || '') :
    (event.description || '');

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div
      className="fixed left-0 right-0 overflow-hidden cursor-pointer group z-40"
      onClick={handleClick}
      style={{
        top: '64px',
        background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a47 40%, #1a3a32 100%)',
      }}
    >
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Ethiopian flag stripe */}
      <div className="absolute top-0 left-0 right-0 h-0.5 flex">
        <div className="flex-1 bg-[#078930]" />
        <div className="flex-1 bg-[#FCDD09]" />
        <div className="flex-1 bg-[#DA121A]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Icon */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-[#c8a96e]/20 flex items-center justify-center">
          <Calendar size={14} className="text-[#c8a96e]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c8a96e]">
              {isActive ? '● JETZT' : isComing ? '● BALD' : ''}
            </span>
            <span className="text-sm font-semibold text-white truncate">{title}</span>
            {description && (
              <span className="hidden sm:inline text-xs text-white/60 truncate max-w-xs">{description}</span>
            )}
          </div>
        </div>

        {/* Countdown */}
        <div className="shrink-0 flex items-center gap-1 bg-black/20 rounded-lg px-3 py-1.5">
          {isComing ? (
            <>
              <span className="text-[9px] uppercase tracking-widest text-white/50 mr-1">Startet in</span>
              <CountdownUnit value={timeLeft.days} label="Tage" />
              <span className="text-white/30 text-xs mb-2">:</span>
              <CountdownUnit value={timeLeft.hours} label="Std" />
              <span className="text-white/30 text-xs mb-2">:</span>
              <CountdownUnit value={timeLeft.minutes} label="Min" />
              <span className="text-white/30 text-xs mb-2">:</span>
              <CountdownUnit value={timeLeft.seconds} label="Sek" />
            </>
          ) : isActive ? (
            <>
              <span className="text-[9px] uppercase tracking-widest text-white/50 mr-1">Endet in</span>
              <CountdownUnit value={timeLeft.days} label="Tage" />
              <span className="text-white/30 text-xs mb-2">:</span>
              <CountdownUnit value={timeLeft.hours} label="Std" />
              <span className="text-white/30 text-xs mb-2">:</span>
              <CountdownUnit value={timeLeft.minutes} label="Min" />
            </>
          ) : null}
        </div>

        {/* CTA */}
        <div className="shrink-0 hidden sm:flex items-center gap-1 text-xs text-[#c8a96e] group-hover:text-white transition-colors">
          <span>Mehr erfahren</span>
          <ChevronRight size={12} />
        </div>

        {/* Dismiss button */}
        <button
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          className="shrink-0 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Banner schließen"
        >
          <X size={10} className="text-white/70" />
        </button>
      </div>
    </div>
  );
}
