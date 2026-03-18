import { useEffect, useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';

const CULTURE_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/119501_422e1e33.jpg';

export default function CultureSection() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-hidden').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const badges = [
    { label: t.culture_authentic, icon: '🌍' },
    { label: t.culture_vegan_label, sub: t.culture_vegan_sub, icon: '🌿' },
    { label: t.culture_handmade, icon: '🤲' },
    { label: t.culture_injera, icon: '🫓' },
  ];

  return (
    <section id="culture" ref={sectionRef} className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="reveal-hidden relative" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="relative">
              {/* Main image */}
              <img
                src={CULTURE_IMAGE}
                alt="Äthiopische Injera Platte"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#d4af37] rounded-2xl -z-10" />
              {/* Ethiopian cross decoration */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#1a3a32] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#d4af37] text-2xl">✦</span>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="bg-white rounded-xl p-4 shadow-sm border border-[#1a3a32]/10 flex items-center gap-3"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                      {badge.label}
                    </p>
                    {badge.sub && (
                      <p className={`text-xs text-[#1a3a32]/60 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                        {badge.sub}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6">
            <div className="reveal-hidden" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">
                  Kultur & Tradition
                </span>
              </div>
              <h2 className={`font-serif text-4xl md:text-5xl font-bold text-[#1a3a32] leading-tight ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.culture_title}
              </h2>
            </div>

            <div className="reveal-hidden" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <blockquote className="border-l-4 border-[#d4af37] pl-6 py-2">
                <p className={`text-xl md:text-2xl font-serif italic text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.culture_gursha_quote}
                </p>
              </blockquote>
            </div>

            <div className="reveal-hidden space-y-4" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <p className={`text-[#1a3a32]/80 leading-relaxed text-base ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.culture_p1}
              </p>
              <p className={`text-[#1a3a32]/80 leading-relaxed text-base ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.culture_p2}
              </p>
            </div>

            {/* Ethiopian flag colors strip */}
            <div className="reveal-hidden flex gap-2 pt-4" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className="h-1.5 flex-1 rounded-full bg-[#078930]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#FCDD09]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#DA121A]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
