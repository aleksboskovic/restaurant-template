import { useLang } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';

interface FactCardProps {
  factKey: 1 | 2 | 3;
  variant?: 'light' | 'dark';
}

/**
 * Wiederverwendbare FactCard-Komponente für äthiopische Kulturwissen-Fakten.
 * Platzierung: zwischen bestehenden Sektionen.
 * factKey: 1 = Injera, 2 = Kaffee, 3 = Kalender
 * variant: 'light' = heller Hintergrund, 'dark' = dunkler Hintergrund
 */
export default function FactCard({ factKey, variant = 'light' }: FactCardProps) {
  const { t, lang } = useLang();

  const titleKey = `fact${factKey}_title` as keyof typeof t;
  const textKey = `fact${factKey}_text` as keyof typeof t;

  const isDark = variant === 'dark';

  return (
    <div className={`py-6 px-4 ${isDark ? 'bg-[#1a3a32]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`
            relative flex items-start gap-4 rounded-2xl px-6 py-5 max-w-2xl mx-auto
            ${isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white border border-[#1a3a32]/8 shadow-sm'
            }
          `}
        >
          {/* Ethiopian flag left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl flex flex-col overflow-hidden">
            <div className="flex-1" style={{ background: '#078930' }} />
            <div className="flex-1" style={{ background: '#FCDD09' }} />
            <div className="flex-1" style={{ background: '#DA121A' }} />
          </div>

          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5 pl-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.15)' }}
            >
              <Info size={16} className="text-[#d4af37]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-[#d4af37] text-[10px] tracking-[0.25em] uppercase font-semibold mb-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t[titleKey] as string}
            </p>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-[#1a3a32]/75'} ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t[textKey] as string}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
