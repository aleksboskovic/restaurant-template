import { useParams, Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { getBlogPostBySlug, getLatestBlogPosts, type Section } from '@/data/blogPosts';
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { useLang } from '@/contexts/LanguageContext';

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
          <Link href="/reservierung" className="mt-4 inline-flex items-center gap-2 bg-[#c9a84c] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#e0bc6a] transition-colors text-sm">
            Tisch reservieren
            <ArrowRight size={14} />
          </Link>
        </div>
      );
    case 'internalLink':
      return (
        <div key={idx} className="my-6 flex items-start gap-3 p-4 bg-white/5 border border-[#c9a84c]/20 rounded-xl">
          <span className="text-[#c9a84c] mt-0.5 shrink-0"><ChevronRight size={16} /></span>
          <span className="text-white/60 text-sm leading-relaxed">
            {section.text}{' '}
            <Link href={section.href || '#'} className="text-[#c9a84c] hover:text-[#e0bc6a] underline underline-offset-2 transition-colors font-medium">
              {section.linkText}
            </Link>
          </span>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLang();
  const isEn = lang === 'en';
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

  const activeTitle = isEn && post.titleEn ? post.titleEn : post.title;
  const activeDesc = isEn && post.metaDescriptionEn ? post.metaDescriptionEn : post.metaDescription;
  const activeTeaser = isEn && post.teaserEn ? post.teaserEn : post.teaser;
  const activeContent = isEn && post.contentEn ? post.contentEn : post.content;

  // Build Article schema for this blog post
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "inLanguage": ["de-AT", "en"],
    "author": { "@type": "Organization", "name": "HABESHA – Äthiopisches Restaurant Salzburg", "url": "https://www.habesha-salzburg.at" },
    "publisher": {
      "@type": "Organization",
      "name": "HABESHA – Äthiopisches Restaurant Salzburg",
      "logo": { "@type": "ImageObject", "url": "https://www.habesha-salzburg.at/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.habesha-salzburg.at/blog/${post.slug}` },
    "keywords": post.keywords.join(', ')
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.habesha-salzburg.at/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.habesha-salzburg.at/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.habesha-salzburg.at/blog/${post.slug}` }
    ]
  };

  return (
    <div className="min-h-screen bg-[#1a1208]">
      <SEOHead
        title={activeTitle}
        description={activeDesc}
        canonical={`https://www.habesha-salzburg.at/blog/${post.slug}`}
        ogImage={post.image}
        ogImageAlt={post.imageAlt}
        ogType="article"
        keywords={post.keywords.join(', ')}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <Navbar />
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/blog-hero-bg_97de065d.jpg')` }}
        />
        {/* Post-specific image blended on top */}
        <img
          src={post.image}
          alt={post.imageAlt}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-black/40 to-black/20" />
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10 pb-24">
        {/* Visible breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-6 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-[#c9a84c] transition-colors">
            <Home size={11} /><span>{isEn ? 'Home' : 'Start'}</span>
          </Link>
          <ChevronRight size={10} />
          <Link href="/blog" className="hover:text-[#c9a84c] transition-colors">
            Blog
          </Link>
          <ChevronRight size={10} />
          <span className="text-white/60 line-clamp-1">{activeTitle}</span>
        </nav>

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
            {activeTitle}
          </h1>

          {/* Teaser */}
          <p className="text-white/60 text-lg leading-relaxed mb-8 pb-8 border-b border-white/10 italic">
            {activeTeaser}
          </p>

          {/* Content */}
          <div>
            {activeContent.map((section, idx) => renderSection(section, idx))}
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
      <Footer />
      <FloatingButtons />
    </div>
  );
}
