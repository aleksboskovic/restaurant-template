import { Link } from 'wouter';
import { getLatestBlogPosts } from '@/data/blogPosts';
import { Calendar, ArrowRight } from 'lucide-react';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function BlogTeaser() {
  const posts = getLatestBlogPosts(3);

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: '#1a1208' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/blog-hero-bg_97de065d.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/80 to-[#1a1208]/90" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] tracking-[0.3em] text-xs uppercase mb-3 font-light">
            Habesha Magazin
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Kultur, Küche & Geschichten
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Tauche ein in die Welt der äthiopischen und eritreischen Küche – von uralten Traditionen bis zu modernen Genussmomenten.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group bg-[#231a0c] border border-[#c9a84c]/20 rounded-xl overflow-hidden hover:border-[#c9a84c]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-2">
                    <Calendar size={11} />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="text-white font-serif text-base leading-snug mb-2 group-hover:text-[#c9a84c] transition-colors flex-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">
                    {post.teaser}
                  </p>
                  <span className="flex items-center gap-1.5 text-[#c9a84c] text-xs font-medium group-hover:gap-2.5 transition-all">
                    Weiterlesen <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* All posts link */}
        <div className="text-center">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-medium px-8 py-3 rounded-full hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all">
              Alle Beiträge ansehen
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
