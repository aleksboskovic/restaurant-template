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

- [x] Speisekarte: von statisch (menuData.ts) auf Sanity umstellen (Schema, Import aller Gerichte DE/EN/AM, Code-Anpassung)
- [x] Bestellsystem an Sanity-Speisekarte koppeln (Warenkorb liest Gerichte aus Sanity)
- [x] Design der Speisekarte bleibt exakt gleich – nur Datenquelle ändert sich
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
- [x] Sanity-Schema für menuItem erstellen und deployen (getMenuItems in server/sanity.ts)
- [x] tRPC-Endpunkt für Speisekarte aus Sanity erstellen (menu.getAll in routers.ts)
- [x] MenuSection auf Sanity-Daten umstellen (Design identisch, Fallback auf statische Daten)
- [x] OrderPage/Bestellsystem auf Sanity-Daten umstellen (menuItems-Abhängigkeit entfernt)
- [x] CartContext mit Sanity-Daten kompatibel (war bereits vollständig kompatibel)
- [x] Speisekarte Bug: Leaves nur aus Sanity anzeigen, Preis korrekt aus Sanity formatiert (19,40 €)
- [x] Speisekarte Bug: Statische Daten als Fallback entfernt, Sanity ist alleinige Datenquelle
- [x] Sanity Studio in Website integrieren (/studio Route) — GESTRICHEN: nicht nötig, Studio läuft direkt auf habesha-salzburg.sanity.studio

## PIN-Änderung im Dashboard

- [x] Backend: tRPC-Endpunkt zum PIN ändern (alten PIN prüfen, neuen speichern)
- [x] Frontend: "PIN ändern"-Dialog im Live-Orders-Dashboard (alten PIN + 2x neuer PIN)
- [x] Validierung: nur 4-stellige PINs erlaubt, alten PIN muss korrekt sein

## Blog-Sektion

- [x] Blog-Inhalte als statische Datei (blogPosts.ts) vorbereiten (9 Beiträge, 10.03.–22.03.2026)
- [x] Blog-Übersichtsseite (/blog) mit Karten, Datum, Teaser-Text
- [x] Einzelartikel-Seite (/blog/:slug) mit vollem Inhalt
- [x] Blog-Teaser auf Startseite (3 neueste Beiträge)
- [x] Nav-Reiter "Blog" in der Navbar hinzufügen (Desktop + Mobile)
- [x] Routen in App.tsx registrieren

## Bugfixes & Navigation

- [x] Google Maps doppelter Load-Fehler auf Mobile beheben
- [x] Navbar + Footer in Blog-Übersichtsseite (/blog) einbauen
- [x] Navbar + Footer in Blog-Einzelartikel (/blog/:slug) einbauen

## Blog Hintergrundbild

- [ ] KI-Wasserzeichen aus Blog-Hintergrundbild entfernen
- [ ] Bild als Hintergrund für Blog-Übersicht, Artikel-Seiten und Teaser einsetzen

## Cookie-Banner (DSGVO)

- [x] CookieBanner-Komponente im Habesha-Design (Zustimmen / Ablehnen / Einstellungen)
- [x] Cookie-Kategorien: Notwendig (immer), Analyse (optional), Marketing (optional)
- [x] Präferenz in localStorage speichern (versioniert)
- [x] Banner in App.tsx global eingebunden
- [x] Link zu Datenschutzerklärung im Banner

## Klickbarkeit & Verlinkungen

- [x] BlogTeaser-Karten auf Startseite klickbar machen (z-index Fix)
- [x] Gursha-Sektion in CultureSection mit "Mehr über Gursha erfahren"-Link zum Blogbeitrag verbunden

## Google Analytics (DSGVO-konform)

- [x] Google Analytics G-K8RD1KSD14 eingebaut (useGoogleAnalytics Hook)
- [x] Analytics nur laden wenn Analyse-Cookie-Zustimmung vorhanden (DSGVO-konform)
- [x] Cookie-Banner: bei Zustimmung GA laden, bei Ablehnung ga-disable Flag setzen
- [x] Seitenaufrufe (pageviews) werden bei Routenwechsel automatisch getrackt

## Bugfixes & DSGVO

- [x] LiveOrders: doppelter useState-Import war bereits behoben (veralteter Cache-Eintrag)
- [x] Footer: "Cookie-Einstellungen"-Button eingebaut (öffnet Banner erneut, DSGVO-konform)

## Google Maps

- [x] Marker auf AdvancedMarkerElement migrieren (veraltete API-Warnung behoben)

## FAQ-Seite

- [x] FAQ-Seite (/faq) mit 19 Accordion-Fragen in 5 Kategorien (Dropdown)
- [x] FAQ-Schema JSON-LD für Google Featured Snippets
- [x] FAQ-Link in Navbar (Desktop + Mobile)
- [x] Route in App.tsx registriert

## Warenkorb-Deaktivierung

- [x] Warenkorb-Icon und alle "Bestellen"-Buttons deaktivieren: Info-Modal mit Lieferando-Link + Hinweis auf baldige eigene Lieferung

## Eigenes Bestellsystem reaktivieren + Bestellstopp

- [ ] Lieferando-Modal und DeliveryComingSoonModal komplett entfernen
- [ ] Warenkorb und eigenes Bestellsystem wieder aktivieren
- [ ] DB: orders_enabled Flag in app_settings Tabelle
- [ ] Backend: tRPC-Endpunkte getOrdersEnabled / setOrdersEnabled
- [ ] Dashboard: "BESTELLUNG STOPPEN"-Toggle (rot/grün) im Live-Orders-Header
- [ ] Frontend: Wenn gestoppt → Kunden sehen Sperrhinweis statt Bestellformular

## Eigenes Bestellsystem reaktivieren + Bestellstopp

- [x] Lieferando-Modal (DeliveryComingSoonModal) komplett entfernen
- [x] Warenkorb und eigenes Bestellsystem wieder aktivieren
- [x] DB: app_settings Tabelle mit orders_enabled Flag (dauerhaft gespeichert)
- [x] Backend: tRPC getOrdersEnabled / setOrdersEnabled Endpunkte
- [x] Dashboard: "BESTELLUNG STOPPEN"-Toggle (rot/grün) im Live-Orders-Header
- [x] Frontend: Wenn gestoppt → Kunden sehen Sperrhinweis statt Bestellformular

## Special Events Pop-up

- [x] Beide aktiven Special Events als schwebendes Pop-up beim Seitenaufruf anzeigen
- [x] Banner-Bild aus Sanity korrekt laden und anzeigen
- [x] Alten Ticker-Streifen oben entfernen
- [x] Pop-up mit einem Klick wegdrückbar (X-Button), mobile + desktop optimiert
- [x] Mehrere aktive Events als Carousel/Slides im Pop-up

## Event-Anzeige Fixes

- [x] Sanity-Bildfeld-Namen debuggen (bannerImage vs. image vs. photo)
- [x] GESCHLOSSEN-Banner als Ticker-Streifen direkt unter Navbar (wie alter Oster-Banner)
- [x] FASIKA Pop-up: Bild korrekt laden, klickbar für Vollansicht
- [x] Beide Events gleichzeitig anzeigen (Ticker + Pop-up)

## FASIKA Pop-up Fix

- [x] Pop-up auch für zukünftige Events anzeigen (validUntil >= jetzt, egal ob validFrom noch nicht erreicht)

## Reservierung → Kontaktformular

- [x] Reservierungsseite (/reservierung) entfernen
- [x] Kontaktformular-Seite (/kontakt) mit Feldern: Name, Email, Telefon, Betreff, Nachricht
- [x] Hinweistext im Nachrichtenfeld: "TISCHRESERVIERUNGEN BITTE PER TELEFON..."
- [x] Backend: tRPC-Endpunkt zum Senden der Kontaktanfrage (E-Mail an Besitzer)
- [x] Alle "Tisch reservieren"/"Book a Table"-Buttons → tel: Anruf-Link (+43 660 732 47 66)
- [x] Navbar-Link "Reservieren" → tel: Anruf-Link

## Kontaktseite Korrekturen

- [x] Hinweistext grammatikalisch korrigieren
- [x] Öffnungszeiten in ContactPage aktualisieren (Mi–Fr: 11–14 & 17–22, Sa–So: 13–22, Di: 17–22, Mo: Geschlossen)
- [x] Alle "Tisch reservieren"-Buttons → /reservierung (statt tel:)

## Allergene & HALAL-Kennzeichnung

- [x] Sanity-Query: allergens und isHalal Felder abfragen
- [x] HALAL-Label: grün, Großbuchstaben, neben Produktname
- [x] Allergene-Badges: Buchstaben A–R als kleine Kästchen unter dem Gericht
- [x] Legende: A–R + HALAL sichtbar in der Speisekarte, passend zum Design

## Bestellformular: Zeitauswahl entfernen

- [x] Zeitauswahl-Feld aus OrderPage entfernen
- [x] deliveryTime fix auf 'asap' setzen (kein Benutzereingabe)

## Blog: Kaffeezeremonie-Beitrag

- [x] Neuen SEO-Blog-Beitrag "Äthiopische Kaffeezeremonie Salzburg" in blogPosts.ts angelegt
- [x] SEO-Metadaten: Fokus-Keywords, Meta-Description, Slug gesetzt
- [x] Bild hochgeladen und Blog-Teaser erscheint automatisch als neuester Beitrag

## Blog: Tej & Niter Kibbeh + Mehr-erfahren-Pfeile

- [x] Neuen Blog-Beitrag "Tej – Äthiopischer Honigwein" in blogPosts.ts anlegen (SEO-optimiert)
- [x] Neuen Blog-Beitrag "Niter Kibbeh – Gewürztes Butterschmalz" in blogPosts.ts anlegen (SEO-optimiert)
- [x] CoffeeCeremonySection: Kaffee-Bild (Cappuccinos) durch echtes Kaffeezeremonie-Bild ersetzen
- [x] CoffeeCeremonySection: Tej-Bild durch echtes Tej-Bild ersetzen
- [x] CoffeeCeremonySection: Kaffee-Block mit "Mehr erfahren"-Pfeil → /blog/aethiopische-kaffeezeremonie-salzburg
- [x] CoffeeCeremonySection: Tej-Karte mit "Mehr erfahren"-Pfeil → /blog/tej-aethiopischer-honigwein
- [x] CoffeeCeremonySection: Berbere-Karte mit "Mehr erfahren"-Pfeil → /blog/berbere-gewuerz-geheimnis-habesha-kueche
- [x] CoffeeCeremonySection: Niter Kibbeh-Karte mit "Mehr erfahren"-Pfeil → /blog/niter-kibbeh-goldenes-geheimnis
