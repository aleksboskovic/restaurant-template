import { useParams, Link } from 'wouter';
import { getBlogPostBySlug, getLatestBlogPosts, type Section } from '@/data/blogPosts';
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function renderSection(section: Section, idx: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={idx} className="text-2xl font-serif text-white mt-10 mb-4">
          {section.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p key={idx} className="text-white/70 leading-relaxed mb-5">
          {section.text}
        </p>
      );
    case 'list':
      return (
        <ul key={idx} className="mb-5 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-white/70 leading-relaxed">
              <span className="text-[#c9a84c] mt-1 shrink-0">
                <ChevronRight size={16} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'cta':
      return (
        <div key={idx} className="my-8 p-6 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl">
          <p className="text-[#c9a84c] font-medium text-lg leading-relaxed">
            {section.text}
          </p>
          <Link href="/#contact">
            <button className="mt-4 inline-flex items-center gap-2 bg-[#c9a84c] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#e0bc6a] transition-colors text-sm">
              Tisch reservieren
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(params.slug);
  const related = getLatestBlogPosts(4).filter(p => p.slug !== params.slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#1a1208] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-white mb-4">Beitrag nicht gefunden</h1>
          <Link href="/blog">
            <button className="text-[#c9a84c] hover:underline flex items-center gap-2 mx-auto">
              <ArrowLeft size={16} /> Zurück zum Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1208]">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-black/40 to-black/20" />
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10 pb-24">
        {/* Back link */}
        <Link href="/blog">
          <button className="flex items-center gap-2 text-[#c9a84c] text-sm mb-6 hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Alle Beiträge
          </button>
        </Link>

        {/* Card */}
        <div className="bg-[#231a0c] border border-[#c9a84c]/20 rounded-2xl p-8 md:p-12">
          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs bg-[#c9a84c]/20 text-[#c9a84c] px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Clock size={12} />
              {post.readingTime} Min. Lesezeit
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-serif text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Teaser */}
          <p className="text-white/60 text-lg leading-relaxed mb-8 pb-8 border-b border-white/10 italic">
            {post.teaser}
          </p>

          {/* Content */}
          <div>
            {post.content.map((section, idx) => renderSection(section, idx))}
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">
              Weitere Beiträge
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <div className="group bg-[#231a0c] border border-[#c9a84c]/20 rounded-xl overflow-hidden hover:border-[#c9a84c]/40 transition-all cursor-pointer">
                    <div className="h-32 overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white/40 text-xs mb-1">{formatDate(r.date)}</p>
                      <p className="text-white text-sm font-medium leading-snug group-hover:text-[#c9a84c] transition-colors line-clamp-2">
                        {r.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
