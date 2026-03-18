# HABESHA Restaurant Website – TODO

## Abgeschlossen

- [x] HTML-Website zu React/Vite migriert mit vollständiger Design-Erhaltung
- [x] 3-Sprachen-Support (DE/EN/AM) mit Flaggen-Dropdown-Selektor
- [x] Komplettes Menüsystem mit allen Gerichten und Zutaten übersetzt
- [x] Tischreservierungssystem (/reservierung) mit Datum/Uhrzeit-Auswahl
- [x] 3-Schritt Online-Bestellsystem (/bestellen) mit Stripe-Integration
- [x] Äthiopische Flaggenfarben (grün/gelb/rot) im gesamten Design
- [x] Lieferando und Quandoo-Buttons entfernt
- [x] Google Maps, Google Reviews und TripAdvisor-Links integriert
- [x] Kaffeezeremonie-Sektion und FactCard-Komponenten hinzugefügt
- [x] Scroll-to-Top bei Seitennavigation implementiert
- [x] Öffnungszeiten-Anzeige aktualisiert
- [x] Äthiopisches Manuskript-Hintergrundbild in Gästebewertungssektion eingefügt
- [x] Manuskript-Hintergrund auf alle hellen Sektionen ausgedehnt (CultureSection bis ReviewsSection)
- [x] Alle Sektionen (Culture, Menu, Coffee, FactCards) auf transparenten Hintergrund umgestellt

## Ausstehend

- [x] Sanity-Schemas (order, specialEvent, menuItem) über API anlegen
- [x] PIN-Schutz für /live-orders Dashboard implementieren
- [x] Live-Order-Dashboard (/live-orders) mit Echtzeit-Updates fertigstellen
- [x] Dynamische Werbebanner aus Sanity implementieren
- [ ] EmailJS einrichten wenn Domain und E-Mail des Kunden bereit sind
- [ ] Liefergebühr und Mindestbestellwert definieren und implementieren (aktuell Platzhalter)
- [ ] Stripe von Test-Modus auf Live-Modus umschalten wenn Kunde bereit ist
- [x] Bestellverlauf-Tab im Dashboard (erledigte Bestellungen nach Datum)
- [x] Tagesstatistik: Umsatz und Anzahl Bestellungen
- [x] Volltextsuche nach Name, Produkt, Adresse, Bestellwert
- [x] Abmelde-Button im Dashboard
- [x] Äthiopisches Textilmuster als Navbar-Hintergrund (scroll-aktiviert, Flaggenbalken sichtbar)
- [x] Textilmuster als Hintergrund der CultureSection
- [x] Navbar-Hintergrund passt sich dynamisch der aktuellen Sektion an
- [x] Testbestellungen aus Sanity im Live-Dashboard anzeigen (EmailJS nicht erforderlich)
- [x] Bestellabsendung in OrderPage mit Sanity-Speicherung verbinden (tRPC createOrder aufrufen)
- [x] Stripe-Zahlungsfluss korrekt implementieren (PaymentIntent Server-seitig erstellen)
- [x] Stripe-Zahlung und Sanity-Bestellspeicherung synchronisieren
- [x] CardElement durch Stripe Payment Element ersetzen (Google Pay + Apple Pay)
- [x] Stripe-Fehler beheben: useStripe außerhalb Elements-Provider
- [x] Hero-Banner mit Countdown aus Sanity specialEvent einbauen
- [x] Klick auf Banner öffnet Event-Detailseite
- [x] Mobiles Dropdown-Menü unsichtbar hinter HeroSection (z-index Fix)
