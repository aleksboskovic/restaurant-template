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
