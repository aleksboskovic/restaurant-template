import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useLang } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const PHONE_NUMBER = '+436607324766';
const PHONE_DISPLAY = '+43 660 732 47 66';

const PLACEHOLDER_MESSAGE = 'TISCHRESERVIERUNGEN BITTE PER TELEFON, DA EMAILS ERST ZEITVERZÖGERT GESEHEN WERDEN.\n\nFür alle anderen Anfragen schreiben Sie uns gerne hier:';

export default function ContactPage() {
  const { t } = useLang();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(PLACEHOLDER_MESSAGE);
  const [messageFocused, setMessageFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage(PLACEHOLDER_MESSAGE);
    },
    onError: (err) => {
      setError('Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
      console.error(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Don't send if message is still the placeholder
    const actualMessage = message === PLACEHOLDER_MESSAGE ? '' : message;
    if (!actualMessage.trim()) {
      setError('Bitte geben Sie eine Nachricht ein.');
      return;
    }
    sendContact.mutate({ name, email, phone: phone || undefined, subject, message: actualMessage });
  };

  const isPlaceholder = message === PLACEHOLDER_MESSAGE;

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Navbar />

      {/* Hero */}
      <div
        className="relative pt-24 pb-16 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a47 60%, #1a3a32 100%)' }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        {/* Ethiopian flag stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-3">Habesha Restaurant Salzburg</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Kontakt</h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Für Reservierungen rufen Sie uns bitte direkt an. Für alle anderen Anfragen nutzen Sie das Formular.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ── Left: Info + Call CTA ─────────────────────────────────────── */}
        <div className="flex flex-col gap-8">

          {/* Call to action — big phone button */}
          <div
            className="rounded-2xl p-8 text-center flex flex-col items-center gap-4"
            style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a47 100%)' }}
          >
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
              <Phone size={28} className="text-[#d4af37]" />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Tisch reservieren</p>
              <p className="text-white text-sm mb-4">Rufen Sie uns direkt an — wir freuen uns auf Sie!</p>
            </div>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-3 bg-[#d4af37] hover:bg-[#c8a030] text-[#1a3a32] font-bold text-lg px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Phone size={20} />
              {PHONE_DISPLAY}
            </a>
            <p className="text-white/40 text-xs">Tippen um sofort anzurufen</p>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#1a3a32]/8 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#1a3a32]/8 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#1a3a32]" />
              </div>
              <div>
                <p className="font-semibold text-[#1a3a32] text-sm">Adresse</p>
                <p className="text-[#1a3a32]/60 text-sm">Gebirgsjägerplatz 1, 5020 Salzburg</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#1a3a32]/8 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#1a3a32]/8 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[#1a3a32]" />
              </div>
              <div>
                <p className="font-semibold text-[#1a3a32] text-sm">E-Mail</p>
                <a href="mailto:info@habesha-restaurant.at" className="text-[#1a3a32]/60 text-sm hover:text-[#d4af37] transition-colors">
                  info@habesha-restaurant.at
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#1a3a32]/8 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#1a3a32]/8 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[#1a3a32]" />
              </div>
              <div>
                <p className="font-semibold text-[#1a3a32] text-sm mb-1">Öffnungszeiten</p>
                <div className="text-[#1a3a32]/60 text-sm space-y-0.5">
                  <div className="flex justify-between gap-6"><span>Sonntag</span><span>13:00–22:00</span></div>
                  <div className="flex justify-between gap-6"><span>Montag</span><span className="text-red-500">Geschlossen</span></div>
                  <div className="flex justify-between gap-6"><span>Dienstag</span><span>17:00–22:00</span></div>
                  <div className="flex justify-between gap-6"><span>Mi – Fr</span><span>11:00–14:00, 17:00–22:00</span></div>
                  <div className="flex justify-between gap-6"><span>Samstag</span><span>13:00–22:00</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Contact Form ───────────────────────────────────────── */}
        <div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1a3a32] mb-2">Nachricht gesendet!</h3>
                <p className="text-[#1a3a32]/60 text-sm max-w-xs">
                  Vielen Dank für Ihre Nachricht. Wir melden uns so bald wie möglich bei Ihnen.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[#d4af37] text-sm hover:underline"
              >
                Weitere Nachricht senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1a3a32] mb-1">Schreiben Sie uns</h2>
                <p className="text-[#1a3a32]/50 text-sm">Wir antworten so schnell wie möglich.</p>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ihr Name"
                    className="border border-[#1a3a32]/15 rounded-xl px-4 py-3 text-sm text-[#1a3a32] bg-white focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ihre@email.at"
                    className="border border-[#1a3a32]/15 rounded-xl px-4 py-3 text-sm text-[#1a3a32] bg-white focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">Telefonnummer</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+43 ..."
                  className="border border-[#1a3a32]/15 rounded-xl px-4 py-3 text-sm text-[#1a3a32] bg-white focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">Betreff *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Worum geht es?"
                  className="border border-[#1a3a32]/15 rounded-xl px-4 py-3 text-sm text-[#1a3a32] bg-white focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#1a3a32]/50">Nachricht *</label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onFocus={() => {
                    setMessageFocused(true);
                    if (message === PLACEHOLDER_MESSAGE) {
                      // Don't auto-clear — user must delete manually as requested
                    }
                  }}
                  onBlur={() => setMessageFocused(false)}
                  onChange={e => setMessage(e.target.value)}
                  className={`border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all resize-none ${
                    isPlaceholder && !messageFocused
                      ? 'text-[#1a3a32]/40 border-[#d4af37]/40 bg-[#fffbf0]'
                      : 'text-[#1a3a32] border-[#1a3a32]/15'
                  }`}
                />
                {isPlaceholder && (
                  <p className="text-[10px] text-[#d4af37]/70 uppercase tracking-wide">
                    ↑ Bitte Text löschen und Ihre Nachricht eingeben
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sendContact.isPending}
                className="flex items-center justify-center gap-2 bg-[#1a3a32] hover:bg-[#2d5a47] disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                {sendContact.isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Nachricht senden
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
