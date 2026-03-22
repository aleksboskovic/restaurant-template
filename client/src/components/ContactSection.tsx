import { useLang } from '@/contexts/LanguageContext';
import { MapPin, Phone, Clock, CalendarCheck } from 'lucide-react';
import { MapView } from '@/components/Map';
import { Link } from 'wouter';

export default function ContactSection() {
  const { t, lang } = useLang();

  return (
    <section id="contact" className="py-24 bg-[#1a3a32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* Ethiopian flag divider */}
            <div className="flex gap-0.5">
              <div className="h-px w-8 bg-[#078930]" />
              <div className="h-px w-8 bg-[#FCDD09]" />
              <div className="h-px w-8 bg-[#DA121A]" />
            </div>
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Kontakt</span>
            <div className="flex gap-0.5">
              <div className="h-px w-8 bg-[#DA121A]" />
              <div className="h-px w-8 bg-[#FCDD09]" />
              <div className="h-px w-8 bg-[#078930]" />
            </div>
          </div>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-white ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.contact_title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-[#d4af37]" />
              </div>
              <div>
                <p className={`text-[#d4af37] text-xs tracking-widest uppercase font-medium mb-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.contact_address_label}
                </p>
                <p className="text-white font-semibold">Gebirgsjägerplatz 1</p>
                <p className="text-white">5020 Salzburg, Österreich</p>
                <p className={`text-white/60 text-sm mt-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.contact_address_note}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-[#d4af37]" />
              </div>
              <div>
                <p className={`text-[#d4af37] text-xs tracking-widest uppercase font-medium mb-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.contact_phone_label}
                </p>
                <a href="tel:+436607324766" className="text-white font-semibold hover:text-[#d4af37] transition-colors text-lg">
                  0660 7324766
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-[#d4af37]" />
              </div>
              <div>
                <p className={`text-[#d4af37] text-xs tracking-widest uppercase font-medium mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.contact_hours_label}
                </p>
                <div className="space-y-1 text-sm">
                  {[
                    { day: lang === 'de' ? 'Mittwoch – Freitag' : lang === 'en' ? 'Wednesday – Friday' : 'ረቡዕ – ዓርብ', hours: '11:00–14:00, 17:00–22:00' },
                    { day: lang === 'de' ? 'Samstag – Sonntag' : lang === 'en' ? 'Saturday – Sunday' : 'ቅዳሜ – እሑድ', hours: '13:00–22:00' },
                    { day: lang === 'de' ? 'Dienstag' : lang === 'en' ? 'Tuesday' : 'ማክሰኞ', hours: '17:00–22:00' },
                    { day: lang === 'de' ? 'Montag' : lang === 'en' ? 'Monday' : 'ሰኞ', hours: lang === 'de' ? 'Geschlossen' : lang === 'en' ? 'Closed' : 'ዝጉ', closed: true },
                  ].map(({ day, hours, closed }) => (
                    <div key={day} className="flex items-baseline gap-3">
                      <span className={`text-white/70 min-w-[140px] ${lang === 'am' ? 'font-ethiopic' : ''}`}>{day}</span>
                      <span className={`font-semibold ${closed ? 'text-[#DA121A]' : 'text-white'} ${lang === 'am' ? 'font-ethiopic' : ''}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {/* Tisch Reservieren – direct phone call */}
              <a
                href="tel:+436607324766"
                className="flex items-center gap-2 bg-[#d4af37] text-[#1a3a32] text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#d4af37]/90 transition-colors tracking-wide uppercase"
              >
                <Phone size={14} />
                {t.nav_reserve}
              </a>
              <a
                href="tel:+436607324766"
                className="flex items-center gap-2 border border-white/30 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors tracking-wide uppercase"
              >
                <Phone size={14} />
                Anrufen
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#d4af37]/30">
            <MapView
              onMapReady={(map) => {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode(
                  { address: 'Gebirgsjägerplatz 1, 5020 Salzburg, Austria' },
                  (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                      const pos = results[0].geometry.location;
                      map.setCenter(pos);
                      map.setZoom(16);
                      // Custom gold pin element
                      const pinEl = document.createElement('div');
                      pinEl.style.cssText = [
                        'width:28px', 'height:28px', 'border-radius:50%',
                        'background:#d4af37', 'border:3px solid #1a3a32',
                        'box-shadow:0 2px 8px rgba(0,0,0,0.4)',
                        'cursor:pointer',
                      ].join(';');
                      new google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: pos,
                        title: 'Habesha Äthiopisches Restaurant',
                        content: pinEl,
                      });
                    }
                  }
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
