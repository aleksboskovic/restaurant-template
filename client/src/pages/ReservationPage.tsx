import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { useLang } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, CheckCircle, AlertCircle, ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
];

export default function ReservationPage() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', persons: '2', wishes: '', agb: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showAgbModal, setShowAgbModal] = useState(false);

  const personOptions = [
    t.persons_1, t.persons_2, t.persons_3, t.persons_4, t.persons_5,
    t.persons_6, t.persons_7, t.persons_8, t.persons_9, t.persons_10, t.persons_10plus,
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().split(' ').length < 2) {
      newErrors.name = 'Bitte geben Sie Vor- und Nachname ein.';
    }
    if (!form.phone.trim()) newErrors.phone = 'Telefonnummer ist erforderlich.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    if (!form.date) {
      newErrors.date = 'Bitte wählen Sie ein Datum.';
    } else {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = t.order_past_error;
      if (selected.getDay() === 0) newErrors.date = t.order_sunday_error;
    }
    if (!form.time) newErrors.time = 'Bitte wählen Sie eine Uhrzeit.';
    if (!form.agb) newErrors.agb = 'Bitte akzeptieren Sie die AGB.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendReservation = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await sendReservation.mutateAsync({
        name: `${form.name}`,
        email: form.email,
        phone: form.phone || undefined,
        subject: `🗓️ Neue Reservierungsanfrage – ${form.date} um ${form.time} Uhr (${form.persons} Personen)`,
        message: [
          `Datum: ${form.date}`,
          `Uhrzeit: ${form.time} Uhr`,
          `Personen: ${form.persons}`,
          form.wishes ? `Besondere Wünsche: ${form.wishes}` : null,
        ].filter(Boolean).join('\n'),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const reservationSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "HABESHA – Äthiopisches Restaurant Salzburg",
    "url": "https://www.habesha-salzburg.at/reservierung",
    "telephone": "+436607324766",
    "acceptsReservations": "True",
    "hasMap": "https://maps.google.com/?q=HABESHA+Schallmooser+Hauptstra%C3%9Fe+34+Salzburg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Schallmooser Hauptstraße 34",
      "addressLocality": "Salzburg",
      "postalCode": "5020",
      "addressCountry": "AT"
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <SEOHead
        title="Tisch reservieren – HABESHA Äthiopisches Restaurant Salzburg"
        description="Tisch im besten veganen, halal & glutenfreien Restaurant Salzburgs reservieren. Kaffeezeremonie buchen. HABESHA – äthiopische Küche. Reserve a table Ethiopian restaurant Salzburg."
        canonical="https://www.habesha-salzburg.at/reservierung"
        keywords="Tisch reservieren äthiopisches Restaurant Salzburg, veganes Restaurant Salzburg reservieren, halal Restaurant Salzburg buchen, Kaffeezeremonie buchen Salzburg, reserve table Ethiopian restaurant Salzburg, Reservierung HABESHA Salzburg, glutenfreies Restaurant Salzburg reservieren, Tisch buchen Salzburg Restaurant, Geburtstag feiern Salzburg Restaurant"
        structuredData={[
          reservationSchema,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.habesha-salzburg.at/" },
              { "@type": "ListItem", "position": 2, "name": "Tisch reservieren", "item": "https://www.habesha-salzburg.at/reservierung" }
            ]
          }
        ]}
      />
      <Navbar />
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pt-20 pb-0 flex items-center gap-2 text-xs text-white/50 flex-wrap">
        <Link href="/" className="flex items-center gap-1 hover:text-[#c8a96e] transition-colors"><Home size={11} /><span>Start</span></Link>
        <ChevronRight size={10} />
        <span className="text-white/70">Tisch reservieren</span>
      </nav>

      {/* Hero */}
      <div className="relative bg-[#1a3a32] pt-32 pb-16 text-center overflow-hidden">
        {/* Ethiopian flag stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Reservierung</span>
            <div className="h-px w-12 bg-[#d4af37]" />
          </div>
          <h1 className={`font-serif text-4xl md:text-5xl font-bold text-white mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.res_page_title}
          </h1>
          <p className={`text-white/70 max-w-md mx-auto text-sm ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.res_page_subtitle}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        {status === 'success' ? (
          <div className="text-center py-12">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <p className={`text-[#1a3a32] text-lg font-medium ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.res_success}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 relative overflow-hidden">
            {/* Ethiopian flag left border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
              <div className="flex-1" style={{ background: '#078930' }} />
              <div className="flex-1" style={{ background: '#FCDD09' }} />
              <div className="flex-1" style={{ background: '#DA121A' }} />
            </div>
            {/* Name + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  <User size={12} className="inline mr-1" />{t.res_name} *
                </label>
                <input
                  type="text"
                  placeholder="Max Mustermann"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  <Phone size={12} className="inline mr-1" />{t.res_phone} *
                </label>
                <input
                  type="tel"
                  placeholder="+43 ..."
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                <Mail size={12} className="inline mr-1" />{t.res_email} *
              </label>
              <input
                type="email"
                placeholder="max@beispiel.at"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Date + Time + Persons */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  <Calendar size={12} className="inline mr-1" />{t.res_date} *
                </label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all ${errors.date ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  <Clock size={12} className="inline mr-1" />{t.res_time} *
                </label>
                <select
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all bg-white ${errors.time ? 'border-red-400' : 'border-gray-200'}`}
                >
                  <option value="">Wählen...</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot} Uhr</option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
              <div>
                <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  <Users size={12} className="inline mr-1" />{t.res_persons} *
                </label>
                <select
                  value={form.persons}
                  onChange={e => setForm({ ...form, persons: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all bg-white"
                >
                  {personOptions.map((opt, i) => (
                    <option key={i} value={String(i + 1)}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wishes */}
            <div>
              <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                <MessageSquare size={12} className="inline mr-1" />{t.res_wishes}
              </label>
              <textarea
                placeholder={t.res_wishes_placeholder}
                value={form.wishes}
                onChange={e => setForm({ ...form, wishes: e.target.value })}
                rows={3}
                className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all resize-none ${lang === 'am' ? 'font-ethiopic' : ''}`}
              />
            </div>

            {/* AGB */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agb}
                  onChange={e => setForm({ ...form, agb: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-[#1a3a32]"
                />
                <span className={`text-sm text-[#1a3a32]/70 leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.res_agb_text}
                </span>
              </label>
              {errors.agb && <p className="text-red-500 text-xs mt-1">{errors.agb}</p>}
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle size={16} className="text-red-500" />
                <p className="text-red-600 text-sm">{t.res_error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn-premium py-4 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Wird gesendet...
                </span>
              ) : t.res_submit}
            </button>

            <p className={`text-center text-xs text-[#1a3a32]/50 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.res_confirm_note}
            </p>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
