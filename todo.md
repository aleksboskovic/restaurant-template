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
- [x] Stripe-Kartenzahlung auf Mobil und Desktop reparieren (Manus Sandbox-Keys korrekt konfiguriert)
- [x] Öffnungszeiten verifiziert: Mi–Fr 11–14 & 17–22, Sa–So 13–22, Di 17–22, Mo geschlossen
- [x] Hero-Text auf Mobil unsichtbar behoben: mobiles Menü hat jetzt max-height + dunklen Hintergrund bei transparent-Theme

## Nächste Schritte (bereit zum Starten)

- [ ] restaurant.config.ts einbauen (zentrale Konfigurationsdatei für White-Label)
- [ ] SEO: Meta-Tags, Open Graph, Schema.org für alle Seiten
- [ ] Analytics einrichten (Manus Analytics + Google Analytics vorbereiten)
- [ ] Impressum-Seite erstellen (rechtlich notwendig AT/DE)
- [ ] Datenschutzerklärung-Seite erstellen (rechtlich notwendig AT/DE)
- [ ] Ausgewählte Bilder auf der Website ersetzen/aktualisieren
- [ ] Dashboard-PIN personalisieren (Standard 2468 ersetzen)
- [ ] GitHub-Export als White-Label-Vorlage vorbereiten

## Wartet auf Bestätigung vom Restaurantbesitzer

- [ ] Speisekarte: von statisch (menuData.ts) auf Sanity umstellen (Schema, Import aller Gerichte DE/EN/AM, Code-Anpassung)
- [ ] Bestellsystem an Sanity-Speisekarte koppeln (Warenkorb liest Gerichte aus Sanity)
- [ ] Design der Speisekarte bleibt exakt gleich – nur Datenquelle ändert sich
- [ ] Blog-Sektion einrichten: eigener Reiter /blog, von Homepage-Sektionen aus verlinkbar
- [ ] 4–6 strategische Blogbeiträge erstellen (SEO-optimiert, mit Metadaten):
  - Thema 1: Äthiopischer Kaffee & Kaffeezeremonie
  - Thema 2: Vegane & vegetarische äthiopische Küche
  - Thema 3: Äthiopische Lieferanten & Zutaten
  - Thema 4: Äthiopische Tradition & Kultur
  - Thema 5: Habesha – Geschichte & Konzept
- [ ] Homepage-Sektionen (Kaffee, Vegan etc.) klickbar machen → führen zum jeweiligen Blogeintrag
- [ ] Blog-Beiträge in Sanity verwalten (CMS-Integration)
- [x] E-Mail-Feld im Checkout als Pflichtfeld setzen (FAGG-Pflicht AT)
- [ ] Bestellbestätigungs-E-Mail Template einbauen (Selam & Hallo [Name], Bestelldetails, MwSt, Lieferhinweis)
- [x] Impressum-Seite erstellen (Daniel Yemane, FN 632525 i, ATU80437047)
- [x] Datenschutzerklärung-Seite erstellen (DSGVO-konform, Stripe, Google Analytics)
- [x] AGB-Seite erstellen (§1-§7, FAGG, Widerrufsrecht, Jugendschutz)
- [x] Footer-Links zu Impressum, Datenschutz, AGB hinzufügen
- [x] Adresse überall auf "Gebirgsjägerplatz 1, 5020 Salzburg" korrigieren — Impressum bleibt vorerst Stauffeneggstraße
- [x] Betreibername "Habtom G." durch "Daniel Yemane" und "Habesha Cafe Bar & Restaurant e.U." in allen 3 Sprachen ersetzt
- [ ] SPÄTER PRÜFEN: Impressum-Adresse (Stauffeneggstraße 29/10 vs. Gebirgsjägerplatz 1) mit Besitzer klären
