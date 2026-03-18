import { useLang } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';

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

  const reviewTexts = [t.review1_text, t.review2_text, reviews[2][`text${lang === 'de' ? 'De' : lang === 'en' ? 'En' : 'Am'}` as keyof typeof reviews[2]] as string || t.review1_text];

  return (
    <section id="reviews" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Bewertungen</span>
            <div className="h-px w-16 bg-[#d4af37]" />
          </div>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-[#1a3a32] mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.reviews_title}
          </h2>
          <p className={`text-[#1a3a32]/60 text-sm tracking-widest uppercase ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.reviews_subtitle}
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1a3a32] text-white rounded-2xl px-8 py-5 flex items-center gap-6">
            <div className="text-center">
              <div className="font-serif text-5xl font-bold text-[#d4af37]">4.9</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <div className="text-white/60 text-xs mt-1">Google Bewertung</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="text-center">
              <div className="font-serif text-5xl font-bold text-[#d4af37]">4.8</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? 'fill-[#d4af37] text-[#d4af37]' : 'text-white/30'} />
                ))}
              </div>
              <div className="text-white/60 text-xs mt-1">TripAdvisor</div>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={review.key}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a3a32]/8 hover:shadow-md hover:border-[#d4af37]/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
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
