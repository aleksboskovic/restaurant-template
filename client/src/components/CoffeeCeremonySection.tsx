import { useLang } from '@/contexts/LanguageContext';
import { Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

// Eigene Bilder (CDN-hochgeladen)
const COFFEE_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/kaffezeremonie_blog_34bc8619.jpg';
const TEJ_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/tej_blog_94372d5b.jpg';
const SPICE_IMAGE = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80';
const BUTTER_IMAGE = 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80';

export default function CoffeeCeremonySection() {
  const { t, lang } = useLang();

  const specialties = [
    {
      image: TEJ_IMAGE,
      name: t.coffee_col2_tej_name,
      desc: t.coffee_col2_tej_desc,
      blogSlug: '/blog/tej-aethiopischer-honigwein',
    },
    {
      image: SPICE_IMAGE,
      name: t.coffee_col2_berbere_name,
      desc: t.coffee_col2_berbere_desc,
      blogSlug: '/blog/berbere-gewuerz-geheimnis-habesha-kueche',
    },
    {
      image: BUTTER_IMAGE,
      name: t.coffee_col2_niter_name,
      desc: t.coffee_col2_niter_desc,
      blogSlug: '/blog/niter-kibbeh-goldenes-geheimnis',
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
            <Link href="/blog/aethiopische-kaffeezeremonie-salzburg" className="block group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer">
                <img
                  src={COFFEE_IMAGE}
                  alt="Äthiopische Kaffeezeremonie mit Jebena-Kanne"
                  className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a32]/70 via-transparent to-transparent" />
                {/* Ethiopian flag stripe at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                  <div className="flex-1" style={{ background: '#078930' }} />
                  <div className="flex-1" style={{ background: '#FCDD09' }} />
                  <div className="flex-1" style={{ background: '#DA121A' }} />
                </div>
                {/* Caption badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className={`text-white font-serif text-lg font-semibold drop-shadow-lg ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {t.coffee_col1_title}
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-xs font-semibold bg-[#1a3a32]/60 backdrop-blur-sm px-3 py-1.5 rounded-full group-hover:bg-[#d4af37] transition-colors duration-300">
                    Mehr erfahren <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>

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
                {/* Mehr erfahren link below text card */}
                <Link
                  href="/blog/aethiopische-kaffeezeremonie-salzburg"
                  className="inline-flex items-center gap-1.5 mt-4 text-[#d4af37] text-xs font-semibold hover:text-[#1a3a32] transition-colors group"
                >
                  Mehr erfahren <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Specialties */}
          <div className="space-y-5">
            <h3 className={`font-serif text-2xl font-bold text-[#1a3a32] mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.coffee_col2_title}
            </h3>
            {specialties.map(({ image, name, desc, blogSlug }) => (
              <Link key={name} href={blogSlug} className="block group">
                <div className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-[#1a3a32]/8 hover:shadow-md hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer">
                  <img
                    src={image}
                    alt={`${name} – äthiopische Spezialität im HABESHA Restaurant Salzburg`}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-serif font-bold text-[#1a3a32] text-sm mb-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                      {name}
                    </h4>
                    <p className={`text-[#1a3a32]/65 text-xs leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-2 text-[#d4af37] text-xs font-semibold group-hover:text-[#1a3a32] transition-colors">
                      Mehr erfahren <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
