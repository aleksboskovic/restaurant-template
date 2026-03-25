# HABESHA Restaurant – Todo

## Abgeschlossen

- [x] Grundstruktur & Design (Navbar, Hero, Footer, Farben, Fonts)
- [x] Mehrsprachigkeit (DE / EN / AM)
- [x] Speisekarte aus Sanity (tRPC-Query, Kategorien, Allergene, Halal, Vegan/Veggie-Icons)
- [x] Online-Bestellsystem mit 3-Schritt-Checkout (Warenkorb → Adresse → Zahlung)
- [x] Stripe-Integration (PaymentIntent, Payment Element, Google Pay / Apple Pay)
- [x] Abholung / Zustellung Switch (Speisekarte + Warenkorb + Checkout + Stripe)
- [x] deliveryPrice-Feld aus Sanity korrekt abfragen (Bugfix Feldname)
- [x] Bestellstopp-Toggle im Dashboard (orders_enabled Flag)
- [x] Live-Orders Dashboard (PIN-geschützt, Status-Updates)
- [x] Reservierungsformular (/reservierung) mit Benachrichtigung
- [x] Kontaktformular (/kontakt) mit Benachrichtigung
- [x] Blog-Sektion (/blog) mit 5 Beiträgen (lokal in blogPosts.ts)
- [x] Impressum + Datenschutzerklärung + AGB (/legal)
- [x] Cookie-Banner (DSGVO-konform)
- [x] FAQ-Seite (/faq)
- [x] Special Events Pop-up (Sanity-gesteuert)
- [x] Kaffeezeremonie + Tej + Berbere + Niter Kibbeh Sektionen mit Mehr-erfahren-Links
- [x] Faktenkarten (FactCard) auf der Startseite
- [x] Google Maps auf Kontaktseite (Placeholder – kein echtes Embed)
- [x] Allergene & Halal-Kennzeichnung in der Speisekarte
- [x] Zeitauswahl aus Bestellformular entfernt
- [x] E-Mail auf restaurant@habesha-salzburg.at aktualisiert
- [x] Zentrale restaurantConfig.ts angelegt
- [x] Blog-Hintergrundbild hochgeladen (CDN)

## Noch offen – wirklich fehlend

- [x] SEO: Meta-Tags, Open Graph, Schema.org (LocalBusiness) für alle Seiten
- [ ] Bestellbestätigungs-E-Mail an Kunden (nach erfolgreicher Zahlung)
- [x] Google Maps echtes Embed auf Kontaktseite einbauen
- [x] Blog-Beiträge in Sanity verwalten (nicht nötig – lokale blogPosts.ts reicht)
- [ ] Stripe Live-Modus aktivieren (wenn KYC abgeschlossen)
- [x] Impressum-Adresse geklärt – Adresse bleibt so
- [x] Dashboard-PIN auf 1591 gesetzt
- [x] KI-Wasserzeichen aus Blog-Hintergrundbild entfernen

## SEO-Komplettoptimierung

- [x] Keyword-Recherche: Wettbewerb Salzburg + Short/Mid/Longtail-Keywords
- [x] restaurantConfig mit SEO-Keywords befüllen
- [x] index.html: Meta-Tags, Open Graph, Twitter Cards, Schema.org LocalBusiness
- [x] React Helmet: dynamische Meta-Tags für alle Seiten
- [x] Blog-Beiträge: SEO-Texte optimieren + interne Verlinkungen
- [x] Sitemap.xml + robots.txt erstellen
- [x] Glutenfrei/Zöliakie-Keywords in SEO einbauen (glutenfrei Salzburg, Zöliakie Restaurant, ohne Weizen, Teff glutenfrei)

## Open Graph / Social Media Vorschaubild
- [x] Foto komprimieren und auf CDN hochladen (117 KB, 1200x630px)
- [x] og:image in index.html einbauen (1200x630px, CDN-URL)
- [x] og:image in SEOHead-Komponente für alle Seiten einbauen

## Favicon
- [x] Favicon aus HABESHA-Foto generieren (favicon.ico, apple-touch-icon, android icons)
- [x] Favicon in index.html einbinden + site.webmanifest erstellt

## Footer Credit
- [x] "Created by QuantumCreativity" Link im Footer einbauen (https://www.quantumcreativity.one), auf jeder Seite sichtbar

## SEO / Barrierefreiheit
- [ ] Alle fehlenden alt-Attribute bei Bildern ergänzen (12 Bilder betroffen)

## Speisekarte v2 (Druck-PDF)
- [ ] Jedes Gericht mit großem Foto-Platzhalter (wie alte Karte)
- [ ] Bessere Platzaufteilung (ca. 10-12 Seiten A4)
- [ ] Äthiopien-Fakt auf jeder Seite

## Floating Buttons Layout
- [x] Warenkorb-Button rechts unten positionieren (erscheint wenn Gericht hinzugefügt)
- [x] Telefon-Button rutscht nach oben wenn Warenkorb erscheint
- [x] QuantumCreativity-Credit bleibt immer sichtbar (im Footer, nicht durch Buttons verdeckt)

## EmailJS – Bestellbestätigung
- [x] EmailJS Service ID, Template ID und Public Key als Secrets hinterlegen
- [ ] EmailJS-Template-Inhalt in der EmailJS-Konsole befüllen (Variablen: to_name, to_email, order_num, order_type, items_list, total_price, delivery_time, payment_method, delivery_address, notes)
- [x] Server-seitige E-Mail-Funktion via EmailJS REST API implementieren (server/email.ts)
- [x] E-Mail-Versand nach erfolgreicher Bestellung auslösen (orders.create in routers.ts)
- [x] Owner-Benachrichtigung bei neuer Bestellung hinzugefügt
- [x] Tests: 8 Unit-Tests für E-Mail-Helper (alle bestanden)

## Fixes (25.03.2026)
- [x] Infobox "so schnell wie möglich" in Schritt 2 (Dateneingabe) nur bei Zustellung anzeigen, bei Abholung ausblenden
- [x] EmailJS-E-Mail-Versand debuggen und beheben (Private Key + non-browser access aktiviert, Status 200 bestätigt)
- [x] EmailJS Private Key als Secret hinterlegen und E-Mail-Versand testen
- [x] Bestellungen-Toggle im Dashboard als Lichtschalter (ON grün links / OFF rot rechts) umgebaut
