import { useLang } from '@/contexts/LanguageContext';
import { Coffee } from 'lucide-react';

// Unsplash-Bilder: äthiopische Kaffeezeremonie & Spezialitäten
const COFFEE_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80';
const TEJ_IMAGE = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80';
const SPICE_IMAGE = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80';
const BUTTER_IMAGE = 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80';

export default function CoffeeCeremonySection() {
  const { t, lang } = useLang();

  const specialties = [
    {
      image: TEJ_IMAGE,
      name: t.coffee_col2_tej_name,
      desc: t.coffee_col2_tej_desc,
    },
    {
      image: SPICE_IMAGE,
      name: t.coffee_col2_berbere_name,
      desc: t.coffee_col2_berbere_desc,
    },
    {
      image: BUTTER_IMAGE,
      name: t.coffee_col2_niter_name,
      desc: t.coffee_col2_niter_desc,
    },
  ];

  return (
    <section id="kaffee" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-0.5">
              <div className="h-px w-6" style={{ background: '#078930' }} />
              <div className="h-px w-6" style={{ background: '#FCDD09' }} />
              <div className="h-px w-6" style={{ background: '#DA121A' }} />
            </div>
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-1.5">
              <Coffee size={12} />
              {t.coffee_label}
            </span>
            <div className="flex gap-0.5">
              <div className="h-px w-6" style={{ background: '#DA121A' }} />
              <div className="h-px w-6" style={{ background: '#FCDD09' }} />
              <div className="h-px w-6" style={{ background: '#078930' }} />
            </div>
          </div>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-[#1a3a32] mb-4 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.coffee_title}
          </h2>
          <p className={`text-[#1a3a32]/70 max-w-2xl mx-auto text-sm leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.coffee_subtitle}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Column 1: Coffee Image + Text */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={COFFEE_IMAGE}
                alt="Äthiopische Kaffeezeremonie"
                className="w-full h-[340px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a32]/60 via-transparent to-transparent" />
              {/* Ethiopian flag stripe at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                <div className="flex-1" style={{ background: '#078930' }} />
                <div className="flex-1" style={{ background: '#FCDD09' }} />
                <div className="flex-1" style={{ background: '#DA121A' }} />
              </div>
              {/* Caption badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className={`text-white font-serif text-lg font-semibold drop-shadow-lg ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.coffee_col1_title}
                </span>
              </div>
            </div>

            {/* Coffee text */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a3a32]/8 relative overflow-hidden">
              {/* Left border: Ethiopian flag */}
              <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
                <div className="flex-1" style={{ background: '#078930' }} />
                <div className="flex-1" style={{ background: '#FCDD09' }} />
                <div className="flex-1" style={{ background: '#DA121A' }} />
              </div>
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <Coffee size={16} className="text-[#d4af37]" />
                  <span className={`text-[#d4af37] text-xs tracking-widest uppercase font-semibold ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {t.coffee_col1_title}
                  </span>
                </div>
                <p className={`text-[#1a3a32]/75 text-sm leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.coffee_col1_text}
                </p>
                {/* Brewing rounds visual */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1a3a32]/8">
                  {[
                    { label: 'Abol', sub: lang === 'de' ? 'Stark' : lang === 'en' ? 'Strong' : 'ጠንካራ', color: '#1a3a32' },
                    { label: 'Tona', sub: lang === 'de' ? 'Mittel' : lang === 'en' ? 'Medium' : 'መካከለኛ', color: '#d4af37' },
                    { label: 'Baraka', sub: lang === 'de' ? 'Segen' : lang === 'en' ? 'Blessing' : 'ቡራኬ', color: '#078930' },
                  ].map(({ label, sub, color }) => (
                    <div key={label} className="flex-1 text-center">
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: color }}
                      >
                        ☕
                      </div>
                      <p className="text-[#1a3a32] text-xs font-bold">{label}</p>
                      <p className={`text-[#1a3a32]/50 text-[10px] ${lang === 'am' ? 'font-ethiopic' : ''}`}>{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Specialties */}
          <div className="space-y-5">
            <h3 className={`font-serif text-2xl font-bold text-[#1a3a32] mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.coffee_col2_title}
            </h3>
            {specialties.map(({ image, name, desc }) => (
              <div
                key={name}
                className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-[#1a3a32]/8 hover:shadow-md hover:border-[#d4af37]/40 transition-all duration-300"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`font-serif font-bold text-[#1a3a32] text-sm mb-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {name}
                  </h4>
                  <p className={`text-[#1a3a32]/65 text-xs leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
