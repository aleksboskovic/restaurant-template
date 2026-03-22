/**
 * SpecialEventBanner — zeigt Events mit isClosedNotice=true (oder Titel enthält "geschlossen"/"closed")
 * als fixer Streifen direkt unter der Navbar.
 * Alle anderen Events erscheinen als Pop-up (SpecialEventPopup).
 */
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useLang } from '@/contexts/LanguageContext';
import { X, AlertCircle } from 'lucide-react';

function isClosedNotice(title: string): boolean {
  const lower = title.toLowerCase();
  return lower.includes('geschlossen') || lower.includes('closed') || lower.includes('ዛሬ ተዘግተናል');
}

export default function SpecialEventBanner() {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState(false);

  const { data: events = [] } = trpc.specialEvents.getActive.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  // Only show "closed" type events in the banner
  const closedEvents = events.filter(e => isClosedNotice(e.title));
  const event = closedEvents[0];

  if (!event || dismissed) return null;

  const title = lang === 'en'
    ? (event.title || '')
    : lang === 'am'
    ? (event.title || '')
    : event.title;

  const description = lang === 'en'
    ? (event.description_en || event.description || '')
    : lang === 'am'
    ? (event.description_am || event.description || '')
    : (event.description || '');

  // Show only first line of description in the banner
  const shortDesc = description.split('\n')[0];

  return (
    <div
      className="fixed left-0 right-0 overflow-hidden z-40"
      style={{
        top: '64px',
        background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
      }}
    >
      {/* Ethiopian flag stripe */}
      <div className="absolute top-0 left-0 right-0 h-0.5 flex">
        <div className="flex-1 bg-[#078930]" />
        <div className="flex-1 bg-[#FCDD09]" />
        <div className="flex-1 bg-[#DA121A]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
        {/* Icon */}
        <AlertCircle size={16} className="text-red-200 shrink-0" />

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="text-xs font-bold uppercase tracking-widest text-red-200">
            ● HEUTE GESCHLOSSEN
          </span>
          <span className="text-sm font-semibold text-white truncate">{title}</span>
          {shortDesc && (
            <span className="hidden sm:inline text-xs text-red-200/70 truncate max-w-xs">{shortDesc}</span>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Banner schließen"
        >
          <X size={10} className="text-white/70" />
        </button>
      </div>
    </div>
  );
}
