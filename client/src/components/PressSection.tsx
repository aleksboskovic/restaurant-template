import { useLang } from '@/contexts/LanguageContext';

const PRESS_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/119503_c906377f.jpg';

export default function PressSection() {
  const { t, lang } = useLang();

  return (
    <section className="py-20 bg-[#1a3a32] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                <div className="h-px w-5" style={{ background: '#078930' }} />
                <div className="h-px w-5" style={{ background: '#FCDD09' }} />
                <div className="h-px w-5" style={{ background: '#DA121A' }} />
              </div>
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">
                {t.press_label}
              </span>
            </div>

            <blockquote>
              <p className={`font-serif text-2xl md:text-3xl text-white leading-relaxed italic ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.press_quote}
              </p>
              <footer className="mt-4 text-[#d4af37] text-sm font-medium tracking-wide">
                — Fräulein Flora Magazin, Salzburg
              </footer>
            </blockquote>

            <p className={`text-white/70 leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.press_desc}
            </p>

            <a
              href="https://www.fraeuleinflora.at"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#d4af37] text-sm font-semibold tracking-widest uppercase border-b border-[#d4af37]/40 pb-1 hover:border-[#d4af37] transition-colors"
            >
              {t.press_btn}
              <span>→</span>
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={PRESS_IMAGE}
              alt="Habesha Restaurant Interieur"
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-[#d4af37]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
