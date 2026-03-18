import { useLang } from '@/contexts/LanguageContext';
import { Star, ExternalLink } from 'lucide-react';

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=HABESHA+%C3%84THIOPISCHE+RESTAURANT+Cafe+%26+Bar+Rezensionen';
const TRIPADVISOR_URL = 'https://www.tripadvisor.com/Restaurant_Review-g190441-d28646928-Reviews-Habesha-Salzburg_Austrian_Alps.html';

const FLAG_COLORS = ['#078930', '#FCDD09', '#DA121A'];

const reviews = [
  {
    key: 'review1',
    author: 'Sarah M.',
    platform: 'Google',
    stars: 5,
    date: 'März 2024',
    avatar: 'S',
  },
  {
    key: 'review2',
    author: 'Lena K.',
    platform: 'TripAdvisor',
    stars: 5,
    date: 'Februar 2024',
    avatar: 'L',
  },
  {
    key: 'review3',
    author: 'Thomas B.',
    platform: 'Google',
    stars: 5,
    date: 'Januar 2024',
    avatar: 'T',
    textDe: '"Wir waren zu fünft und haben die große Kombi-Platte geteilt. Das Gursha-Erlebnis war unvergesslich. Absolut empfehlenswert!"',
    textEn: '"We were five people and shared the large combo platter. The Gursha experience was unforgettable. Absolutely recommended!"',
    textAm: '"አምስት ሰዎች ነበርን እና ትልቁን ኮምቢ ሳህን ተካፈልን። የጉርሻ ልምዱ የማይረሳ ነበር።"',
  },
];

export default function ReviewsSection() {
  const { t, lang } = useLang();

  const reviewTexts = [
    t.review1_text,
    t.review2_text,
    reviews[2][`text${lang === 'de' ? 'De' : lang === 'en' ? 'En' : 'Am'}` as keyof typeof reviews[2]] as string || t.review1_text,
  ];

  const BG_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/gaesteerlebnis-bg_ebbf3e17.jpg';

  return (
    <section
      id="reviews"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${BG_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay für Lesbarkeit */}
      <div className="absolute inset-0 bg-[#fdfbf7]/88 backdrop-blur-[1px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex gap-0.5">
              <div className="h-px w-8" style={{ background: FLAG_COLORS[0] }} />
              <div className="h-px w-8" style={{ background: FLAG_COLORS[1] }} />
              <div className="h-px w-8" style={{ background: FLAG_COLORS[2] }} />
            </div>
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Bewertungen</span>
            <div className="flex gap-0.5">
              <div className="h-px w-8" style={{ background: FLAG_COLORS[2] }} />
              <div className="h-px w-8" style={{ background: FLAG_COLORS[1] }} />
              <div className="h-px w-8" style={{ background: FLAG_COLORS[0] }} />
            </div>
          </div>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-[#1a3a32] mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.reviews_title}
          </h2>
          <p className={`text-[#1a3a32]/60 text-sm tracking-widest uppercase ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.reviews_subtitle}
          </p>
        </div>

        {/* Rating Summary – clickable */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1a3a32] text-white rounded-2xl px-8 py-5 flex items-center gap-6">
            {/* Google */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group cursor-pointer"
              title="Google Bewertungen öffnen"
            >
              <div className="font-serif text-5xl font-bold text-[#d4af37] group-hover:text-white transition-colors duration-200">4.9</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-1 text-white/60 text-xs mt-1 group-hover:text-white/90 transition-colors">
                <span>Google</span>
                <ExternalLink size={10} />
              </div>
            </a>

            <div className="h-12 w-px bg-white/20" />

            {/* TripAdvisor */}
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group cursor-pointer"
              title="TripAdvisor Bewertungen öffnen"
            >
              <div className="font-serif text-5xl font-bold text-[#d4af37] group-hover:text-white transition-colors duration-200">4.8</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-1 text-white/60 text-xs mt-1 group-hover:text-white/90 transition-colors">
                <span>TripAdvisor</span>
                <ExternalLink size={10} />
              </div>
            </a>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={review.key}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a3a32]/8 hover:shadow-md hover:border-[#d4af37]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top flag accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] flex">
                <div className="flex-1" style={{ background: FLAG_COLORS[idx % 3] }} />
                <div className="flex-1" style={{ background: FLAG_COLORS[(idx + 1) % 3] }} />
                <div className="flex-1" style={{ background: FLAG_COLORS[(idx + 2) % 3] }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              {/* Text */}
              <p className={`text-[#1a3a32]/80 text-sm leading-relaxed italic mb-5 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                {reviewTexts[idx]}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-[#1a3a32]/8 pt-4">
                <div className="w-9 h-9 rounded-full bg-[#1a3a32] text-white flex items-center justify-center text-sm font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-[#1a3a32] text-sm font-semibold">{review.author}</p>
                  <p className="text-[#1a3a32]/50 text-xs">{review.platform} · {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
