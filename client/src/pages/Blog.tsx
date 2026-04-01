import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowRight, ChevronRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { useLang } from '@/contexts/LanguageContext';

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
  const { lang } = useLang();
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[#1a1208]">
      <SEOHead
        title="Blog – Äthiopische Küche, Kultur & Tipps | HABESHA Salzburg"
        description="Vegane Rezepte, Halal-Küche, glutenfreies Essen & äthiopische Kultur: Der HABESHA Blog. Berbere, Injera, Teff, Kaffeezeremonie – alles über Ethiopian food Salzburg."
        canonical="https://www.habesha-salzburg.at/blog"
        keywords="vegane äthiopische Küche Blog, halal Küche Blog Salzburg, glutenfreies Essen Blog, äthiopische Kultur Salzburg, Ethiopian food blog, Injera Teff glutenfrei, Berbere Gewürz Blog, Kaffeezeremonie Äthiopien, gesund essen Blog Salzburg, African food Salzburg Blog, vegan essen Salzburg Tipps"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "HABESHA Magazin – Äthiopische Küche & Kultur",
          "description": "Wissenswertes über äthiopische Küche, Kultur und Ernährung: vegan, halal, glutenfrei und gesund.",
          "url": "https://www.habesha-salzburg.at/blog",
          "publisher": {
            "@type": "Organization",
            "name": "HABESHA – Äthiopisches Restaurant Salzburg",
            "logo": { "@type": "ImageObject", "url": "https://www.habesha-salzburg.at/logo.png" }
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.habesha-salzburg.at/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.habesha-salzburg.at/blog" }
            ]
          }
        }}
      />
      <Navbar />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-24 pb-0 flex items-center gap-2 text-xs text-white/30 flex-wrap relative z-10">
        <Link href="/" className="flex items-center gap-1 hover:text-[#c9a84c] transition-colors"><Home size={11} /><span>Start</span></Link>
        <ChevronRight size={10} />
        <span className="text-white/50">Blog</span>
      </nav>
      {/* Hero */}
      <div className="relative pt-36 pb-24 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/blog-hero-bg_97de065d.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1a1208]" />
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
                    {lang === 'en' ? (post.titleEn ?? post.title) : post.title}
                  </h2>

                  {/* Teaser */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">
                    {lang === 'en' ? (post.teaserEn ?? post.teaser) : post.teaser}
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
      <Footer />
      <FloatingButtons />
    </div>
  );
}
