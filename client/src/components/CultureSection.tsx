import { useEffect, useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

const CULTURE_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/119501_422e1e33.jpg';

// Ethiopian flag colors
const FLAG_COLORS = ['#078930', '#FCDD09', '#DA121A'];

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

  // Culture stats – displayed as a horizontal strip instead of generic boxes
  const stats = [
    { value: '100%', label: t.culture_authentic, color: FLAG_COLORS[0] },
    { value: '🌿', label: t.culture_vegan_label, color: FLAG_COLORS[1] },
    { value: '♻', label: t.culture_handmade, color: FLAG_COLORS[2] },
    { value: '🫓', label: t.culture_injera, color: FLAG_COLORS[0] },
  ];

  return (
    <section id="culture" ref={sectionRef} className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div className="reveal-hidden" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="relative">
              {/* Main image */}
              <img
                src={CULTURE_IMAGE}
                alt="Traditionelle äthiopische Injera-Platte zum Teilen – halal, vegan und glutenfrei im HABESHA Salzburg"
                className="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Ethiopian flag border accent – vertical strip on left */}
              <div className="absolute top-6 -left-3 w-2 h-[calc(100%-48px)] rounded-full flex flex-col overflow-hidden shadow-lg">
                <div className="flex-1" style={{ background: FLAG_COLORS[0] }} />
                <div className="flex-1" style={{ background: FLAG_COLORS[1] }} />
                <div className="flex-1" style={{ background: FLAG_COLORS[2] }} />
              </div>
              {/* Ethiopian cross decoration */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-[#1a3a32] rounded-full flex items-center justify-center shadow-lg border-2 border-[#d4af37]">
                <span className="text-[#d4af37] text-xl font-bold">✦</span>
              </div>
            </div>

            {/* Stats strip – replaces generic boxes */}
            <div className="mt-8 grid grid-cols-4 gap-0 rounded-2xl overflow-hidden shadow-md border border-[#1a3a32]/10">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative flex flex-col items-center justify-center py-5 px-2 bg-white group hover:bg-[#1a3a32] transition-colors duration-300"
                  style={{ borderLeft: i > 0 ? `2px solid ${FLAG_COLORS[i % 3]}` : undefined }}
                >
                  {/* Top color accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: FLAG_COLORS[i % 3] }} />
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <p className={`text-[10px] font-semibold text-center text-[#1a3a32] group-hover:text-white tracking-wide uppercase transition-colors duration-300 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6">
            <div className="reveal-hidden" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className="flex items-center gap-3 mb-4">
                {/* Ethiopian flag mini divider */}
                <div className="flex gap-0.5">
                  <div className="h-px w-6" style={{ background: FLAG_COLORS[0] }} />
                  <div className="h-px w-6" style={{ background: FLAG_COLORS[1] }} />
                  <div className="h-px w-6" style={{ background: FLAG_COLORS[2] }} />
                </div>
                <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">
                  Kultur & Tradition
                </span>
              </div>
              <h2 className={`font-serif text-4xl md:text-5xl font-bold text-[#1a3a32] leading-tight ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {t.culture_title}
              </h2>
            </div>

            <div className="reveal-hidden" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              {/* Blockquote with Ethiopian flag left border */}
              <blockquote className="pl-6 py-2 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full flex flex-col overflow-hidden">
                  <div className="flex-1" style={{ background: FLAG_COLORS[0] }} />
                  <div className="flex-1" style={{ background: FLAG_COLORS[1] }} />
                  <div className="flex-1" style={{ background: FLAG_COLORS[2] }} />
                </div>
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
            <div className="reveal-hidden flex gap-1 pt-4" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className="h-1.5 flex-1 rounded-full" style={{ background: FLAG_COLORS[0] }} />
              <div className="h-1.5 flex-1 rounded-full" style={{ background: FLAG_COLORS[1] }} />
              <div className="h-1.5 flex-1 rounded-full" style={{ background: FLAG_COLORS[2] }} />
            </div>

            {/* Gursha blog link */}
            <div className="reveal-hidden" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <Link href="/blog/gursha-aethiopischer-liebesbeweis">
                <span className="inline-flex items-center gap-2 text-[#1a3a32] font-medium text-sm border border-[#1a3a32]/30 hover:border-[#1a3a32] hover:bg-[#1a3a32]/5 px-5 py-2.5 rounded-full transition-all group cursor-pointer">
                  Mehr über Gursha erfahren
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
