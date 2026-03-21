import { Link } from 'wouter';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const categoryColors: Record<string, string> = {
  'Vegane Küche': 'bg-green-900/60 text-green-300',
  'Kultur & Zutaten': 'bg-amber-900/60 text-amber-300',
  'Erlebnisse': 'bg-rose-900/60 text-rose-300',
  'Feiern & Gruppen': 'bg-purple-900/60 text-purple-300',
  'Gesundheit & Ernährung': 'bg-teal-900/60 text-teal-300',
  'Kultur & Tradition': 'bg-orange-900/60 text-orange-300',
};

export default function Blog() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[#1a1208]">
      {/* Hero */}
      <div className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#1a1208]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-4 font-light">
            Habesha Magazin
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Blog & Kultur
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Geschichten, Traditionen und Wissenswertes rund um die äthiopische und eritreische Küche – direkt aus dem Herzen des Habesha Restaurants in Salzburg.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group bg-[#231a0c] border border-[#c9a84c]/20 rounded-2xl overflow-hidden hover:border-[#c9a84c]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231a0c] via-transparent to-transparent" />
                  {/* Category badge */}
                  <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium ${categoryColors[post.category] ?? 'bg-gray-800 text-gray-300'}`}>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-white/40 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readingTime} Min. Lesezeit
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-serif text-lg leading-snug mb-3 group-hover:text-[#c9a84c] transition-colors">
                    {post.title}
                  </h2>

                  {/* Teaser */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.teaser}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-2 text-[#c9a84c] text-sm font-medium group-hover:gap-3 transition-all">
                    Weiterlesen
                    <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
