import { useRoute, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useLang } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowLeft, Star } from 'lucide-react';

export default function EventDetail() {
  const [, params] = useRoute('/events/:id');
  const [, navigate] = useLocation();
  const { lang } = useLang();

  const { data: events, isLoading } = trpc.specialEvents.getAll.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  const event = events?.find(e => e._id === params?.id);

  const title = event?.title || '';
  const description = lang === 'en' ? (event?.description_en || event?.description || '') :
    lang === 'am' ? (event?.description_am || event?.description || '') :
    (event?.description || '');

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('de-AT', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  };

  const now = new Date();
  const isActive = event && new Date(event.validFrom) <= now && new Date(event.validUntil) >= now;
  const isComing = event && new Date(event.validFrom) > now;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-[#1a3a32]/20 border-t-[#1a3a32] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#fdfbf7]">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="font-serif text-3xl font-bold text-[#1a3a32] mb-4">Event nicht gefunden</h1>
          <button onClick={() => navigate('/')} className="btn-premium px-6 py-3 rounded-xl">
            Zur Startseite
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Navbar />

      {/* Hero */}
      <div
        className="relative pt-24 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a47 60%, #1a3a32 100%)' }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Ethiopian flag stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-[#c8a96e]/20 border border-[#c8a96e]/40 rounded-full px-4 py-1.5 mb-6">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-[#c8a96e]'}`} />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c8a96e]">
              {isActive ? 'Jetzt aktiv' : isComing ? 'Demnächst' : 'Abgelaufen'}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>

          {/* Date range */}
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <Calendar size={14} />
            <span>{formatDate(event.validFrom)} – {formatDate(event.validUntil)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#1a3a32]/60 hover:text-[#1a3a32] transition-colors mb-10 text-sm"
        >
          <ArrowLeft size={16} />
          <span>Zurück zur Startseite</span>
        </button>

        {/* Description */}
        {description && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#1a3a32]/10 p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-[#c8a96e]" />
              <h2 className="font-semibold text-[#1a3a32] text-lg">Über dieses Event</h2>
            </div>
            <p className="text-[#1a3a32]/70 leading-relaxed text-base">{description}</p>
          </div>
        )}

        {/* Date details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-[#1a3a32]/10 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-[#c8a96e]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">Startdatum</span>
            </div>
            <p className="font-semibold text-[#1a3a32]">{formatDate(event.validFrom)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#1a3a32]/10 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[#c8a96e]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">Enddatum</span>
            </div>
            <p className="font-semibold text-[#1a3a32]">{formatDate(event.validUntil)}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#1a3a32]/60 text-sm mb-4">
            Reservieren Sie jetzt Ihren Tisch für dieses besondere Event.
          </p>
          <a
            href="tel:+436607324766"
            className="btn-premium px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase inline-block"
          >
            Tisch reservieren
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
