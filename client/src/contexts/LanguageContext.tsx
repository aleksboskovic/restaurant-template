import React, { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'de' | 'en' | 'am';

interface Translations {
  // Navigation
  nav_home: string;
  nav_culture: string;
  nav_menu: string;
  nav_reviews: string;
  nav_contact: string;
  nav_reserve: string;
  nav_order: string;

  // Hero
  hero_subtitle: string;
  hero_title_main: string;
  hero_title_sub: string;
  hero_cta_menu: string;
  hero_cta_reserve: string;

  // Culture Section
  culture_title: string;
  culture_gursha_quote: string;
  culture_p1: string;
  culture_p2: string;
  culture_authentic: string;
  culture_vegan_label: string;
  culture_vegan_sub: string;
  culture_handmade: string;
  culture_injera: string;

  // Press
  press_label: string;
  press_quote: string;
  press_desc: string;
  press_btn: string;

  // Menu
  menu_title: string;
  menu_subtitle: string;
  menu_tab_mains: string;
  menu_tab_vegan: string;
  menu_tab_plates: string;
  menu_tab_sides: string;

  // Menu Items - Mains
  zilzil_tibs_desc: string;
  tibs_desc: string;
  tibs_price: string;
  doro_wot_desc: string;
  cas_light_desc: string;
  bozena_shiro_desc: string;
  kitfo_desc: string;

  // Menu Items - Vegan
  shiro_wot_desc: string;
  yellow_peas_name: string;
  yellow_peas_desc: string;
  lentil_sauce_name: string;
  lentil_sauce_desc: string;

  // Menu Items - Plates
  kombi_1_name: string;
  kombi_1_desc: string;
  kombi_2_name: string;
  kombi_2_desc: string;
  kombi_vegan_name: string;
  kombi_vegan_desc: string;

  // Menu Items - Sides
  salad_name: string;
  salad_desc: string;
  sambusa_name: string;
  sambusa_desc: string;
  lentil_soup_name: string;
  lentil_soup_desc: string;
  injera_side_name: string;
  injera_side_desc: string;

  // Reviews
  reviews_title: string;
  reviews_subtitle: string;
  review1_text: string;
  review2_text: string;

  // Contact
  contact_title: string;
  contact_address_label: string;
  contact_address_note: string;
  contact_phone_label: string;
  contact_hours_label: string;
  contact_hours_value: string;

  // Footer
  footer_imprint: string;
  footer_privacy: string;
  footer_copyright: string;

  // Modals
  imprint_title: string;
  privacy_title: string;
  privacy_text: string;

  // Reservation Page
  res_page_title: string;
  res_page_subtitle: string;
  res_name: string;
  res_phone: string;
  res_email: string;
  res_date: string;
  res_time: string;
  res_persons: string;
  res_wishes: string;
  res_wishes_placeholder: string;
  res_agb_text: string;
  res_submit: string;
  res_success: string;
  res_error: string;
  res_confirm_note: string;

  // Order Page
  order_title: string;
  order_step1: string;
  order_step2: string;
  order_step3: string;
  order_cart_empty: string;
  order_min_order: string;
  order_delivery_fee: string;
  order_total: string;
  order_next: string;
  order_back: string;
  order_asap: string;
  order_asap_desc: string;
  order_schedule: string;
  order_schedule_desc: string;
  order_firstname: string;
  order_lastname: string;
  order_street: string;
  order_zip: string;
  order_city: string;
  order_floor: string;
  order_delivery_note: string;
  order_pay_card: string;
  order_pay_cash: string;
  order_pay_cash_note: string;
  order_pay_secure: string;
  order_agb_text: string;
  order_submit: string;
  order_success_title: string;
  order_success_text: string;
  order_back_home: string;
  order_add: string;
  order_remove: string;
  order_subtotal: string;
  order_zip_error: string;
  order_sunday_error: string;
  order_past_error: string;
  persons_1: string;
  persons_2: string;
  persons_3: string;
  persons_4: string;
  persons_5: string;
  persons_6: string;
  persons_7: string;
  persons_8: string;
  persons_9: string;
  persons_10: string;
  persons_10plus: string;

  // AGB
  agb_title: string;
  agb_content: string;

  // Coffee Ceremony Section
  coffee_label: string;
  coffee_title: string;
  coffee_subtitle: string;
  coffee_col1_title: string;
  coffee_col1_text: string;
  coffee_col2_title: string;
  coffee_col2_tej_name: string;
  coffee_col2_tej_desc: string;
  coffee_col2_berbere_name: string;
  coffee_col2_berbere_desc: string;
  coffee_col2_niter_name: string;
  coffee_col2_niter_desc: string;

  // Fact Cards
  fact1_title: string;
  fact1_text: string;
  fact2_title: string;
  fact2_text: string;
  fact3_title: string;
  fact3_text: string;
  fact_did_you_know: string;
}

const translations: Record<Lang, Translations> = {
  de: {
    nav_home: 'Start',
    nav_culture: 'Kultur',
    nav_menu: 'Speisekarte',
    nav_reviews: 'Gäste',
    nav_contact: 'Kontakt',
    nav_reserve: 'Tisch reservieren',
    nav_order: 'Jetzt bestellen',

    hero_subtitle: 'Ein Stück Äthiopien in Salzburg',
    hero_title_main: 'Habesha',
    hero_title_sub: 'Äthiopisches Restaurant',
    hero_cta_menu: 'Speisekarte entdecken',
    hero_cta_reserve: 'Tisch reservieren',

    culture_title: 'Mehr als nur ein Essen.',
    culture_gursha_quote: '"Gursha" – Die Kunst des Teilens.',
    culture_p1: 'In Äthiopien ist Essen eine heilige Zeremonie der Gemeinschaft. Im Habesha zelebrieren wir diese Tradition mitten in Salzburg. Unser Herzstück ist das Injera – ein weiches, leicht säuerliches Fladenbrot, das gleichzeitig Teller und Besteck ist.',
    culture_p2: 'Wir essen mit den Händen, teilen uns große Platten und füttern uns gegenseitig – eine Geste, die wir „Gursha" nennen. Erleben Sie die Magie der äthiopischen Gewürze.',
    culture_authentic: '100% Authentisch',
    culture_vegan_label: 'Vegan',
    culture_vegan_sub: 'Große Auswahl',
    culture_handmade: 'Handmade',
    culture_injera: 'Frisches Injera',

    press_label: 'Presse & Empfehlungen',
    press_quote: '"Das Habesha zelebriert die Küche und Kultur Äthiopiens"',
    press_desc: 'Entdecken Sie, was das bekannte Salzburger Stadtmagazin Fräulein Flora über unser authentisches Konzept schreibt. Ein wunderbarer Einblick vor Ihrem Besuch!',
    press_btn: 'Zum Artikel',

    menu_title: 'Kulinarische Reise',
    menu_subtitle: 'Alle Hauptspeisen werden auf traditionellem Injera serviert. Entdecken Sie die würzigen Saucen (Wot) und gebratenen Spezialitäten (Tibs).',
    menu_tab_mains: 'Fleischgerichte',
    menu_tab_vegan: 'Vegan & Veggie',
    menu_tab_plates: 'Kombiplatten',
    menu_tab_sides: 'Beilagen & Salate',

    zilzil_tibs_desc: 'Durchgebratenes Rindfleisch in Streifen mit Zwiebeln, grüner Paprika und frischen Kräutern.',
    tibs_desc: 'Zartes Rindfleisch gebraten mit gemahlener Paprika, gewürzter Butter und Zwiebeln.',
    tibs_price: 'ab 19,40 €',
    doro_wot_desc: 'Hähnchenkeule geschmort in pikanter Sauce, serviert mit Ei, Frischkäse und Salat.',
    cas_light_desc: 'Klein geschnittenes, angebratenes, saftiges Rindfleisch.',
    bozena_shiro_desc: 'Milde Sauce aus Kichererbsenmehl mit Rindfleischstücken, Zwiebeln und Salat.',
    kitfo_desc: 'Gehacktes Rindfleisch (Tartar) mit Chili, Butter, Ayib und Grünkohl.',

    shiro_wot_desc: 'Milde Sauce aus geröstetem Kichererbsenmehl, serviert mit Injera.',
    yellow_peas_name: 'Gelbe Spalterbsen mit Salat',
    yellow_peas_desc: 'Gelbe Spalterbsen in einem milden Curry mit frischem Beilagensalat.',
    lentil_sauce_name: 'Linsensauce mit Salat',
    lentil_sauce_desc: 'Linsen in einer milden Paprikasauce mit einem frischen Beilagensalat.',

    kombi_1_name: 'Habesha Kombi Platte (1 Person)',
    kombi_1_desc: 'Die perfekte Wahl: Eine gemischte Platte aus verschiedenen Fleischgerichten.',
    kombi_2_name: 'Habesha Kombi Platte (2 Personen)',
    kombi_2_desc: 'Ideal zum Teilen: Gemischte Platte aus verschiedenen Hausgerichten.',
    kombi_vegan_name: 'Habesha Kombi (Vegan/Vegetarisch)',
    kombi_vegan_desc: 'Eine bunte Palette aus verschiedenen veganen und vegetarischen Gerichten.',

    salad_name: 'Salat (Klein / Groß)',
    salad_desc: 'Blattsalat mit Tomaten, Gurkenscheiben und Dressing',
    sambusa_name: 'Sambusa (Gemüse / Rind)',
    sambusa_desc: 'Frittierte Teigtaschen gefüllt mit Gemüse oder Rind',
    lentil_soup_name: 'Linsensuppe',
    lentil_soup_desc: 'Im äthiopischen Stil aus Linsen und Karotten',
    injera_side_name: 'Injera (2 Rollen)',
    injera_side_desc: '2 Rollen Fladenbrot als Beilage',

    reviews_title: 'Gästeerlebnisse',
    reviews_subtitle: 'Authentizität, die begeistert',
    review1_text: '"Ein unglaubliches Erlebnis. Man isst mit den Händen von einer gemeinsamen Platte – das schweißt zusammen. Das Essen ist top gewürzt!"',
    review2_text: '"Als Veganerin bin ich im Himmel. So viele Optionen, alles frisch und die Besitzer sind unglaublich herzlich. Ein absolutes Muss in Salzburg!"',

    contact_title: 'Kommen Sie vorbei',
    contact_address_label: 'Adresse',
    contact_address_note: 'Unweit vom Hauptbahnhof & dem Mirabellgarten.',
    contact_phone_label: 'Reservierung & Kontakt',
    contact_hours_label: 'Öffnungszeiten',
    contact_hours_value: 'Mi–Fr: 11:00–14:00, 17:00–22:00 | Sa–So: 13:00–22:00 | Mo: Geschlossen | Di: 17:00–22:00',

    footer_imprint: 'Impressum',
    footer_privacy: 'Datenschutz',
    footer_copyright: '© 2024 Habesha Äthiopisches Restaurant Salzburg',

    imprint_title: 'Impressum',
    privacy_title: 'Datenschutz',
    privacy_text: 'Wir erheben keine Daten auf dieser Website. Externe Links zu Google Maps und TripAdvisor unterliegen deren Bestimmungen.',

    res_page_title: 'Tisch reservieren',
    res_page_subtitle: 'Sichern Sie sich Ihren Platz für ein unvergessliches äthiopisches Erlebnis.',
    res_name: 'Name & Nachname',
    res_phone: 'Telefon',
    res_email: 'E-Mail',
    res_date: 'Datum',
    res_time: 'Uhrzeit',
    res_persons: 'Personen',
    res_wishes: 'Besondere Wünsche',
    res_wishes_placeholder: 'Allergien, Geburtstag, besondere Anlässe, Hochstuhl benötigt...',
    res_agb_text: 'Ich habe die AGB und die Datenschutzerklärung gelesen und akzeptiere diese.',
    res_submit: 'Tisch reservieren',
    res_success: '✓ Ihre Reservierung wurde erfolgreich übermittelt! Wir bestätigen Ihren Tisch telefonisch oder per E-Mail innerhalb von 24 Stunden.',
    res_error: 'Es gab einen Fehler. Bitte rufen Sie uns direkt an: 0660 7324766',
    res_confirm_note: 'Wir bestätigen Ihre Reservierung telefonisch oder per E-Mail innerhalb von 24 Stunden.',

    order_title: 'Online bestellen',
    order_step1: 'Gerichte wählen',
    order_step2: 'Lieferdetails',
    order_step3: 'Bezahlung',
    order_cart_empty: 'Ihr Warenkorb ist leer',
    order_min_order: 'Mindestbestellwert',
    order_delivery_fee: 'Liefergebühr',
    order_total: 'Gesamt',
    order_next: 'Weiter',
    order_back: 'Zurück',
    order_asap: 'So schnell wie möglich',
    order_asap_desc: 'ca. 45–60 Minuten',
    order_schedule: 'Wunschzeit wählen',
    order_schedule_desc: 'Datum & Uhrzeit auswählen',
    order_firstname: 'Vorname',
    order_lastname: 'Nachname',
    order_street: 'Straße & Hausnummer',
    order_zip: 'PLZ',
    order_city: 'Ort',
    order_floor: 'Stockwerk / Tür (optional)',
    order_delivery_note: 'Anmerkung zur Lieferung (optional)',
    order_pay_card: 'Kreditkarte / Debitkarte',
    order_pay_cash: 'Barzahlung bei Lieferung',
    order_pay_cash_note: 'Bitte halten Sie den genauen Betrag bereit.',
    order_pay_secure: '🔒 Sichere Zahlung via Stripe. Ihre Kartendaten werden verschlüsselt übertragen.',
    order_agb_text: 'Ich habe die AGB für Online-Bestellung und die Datenschutzerklärung gelesen und akzeptiere diese.',
    order_submit: 'Jetzt bestellen',
    order_success_title: 'Danke für Ihre Bestellung!',
    order_success_text: 'Ihre Bestellung wurde erfolgreich aufgenommen. Wir melden uns in Kürze telefonisch zur Bestätigung.',
    order_back_home: 'Zurück zur Startseite',
    order_add: 'Hinzufügen',
    order_remove: 'Entfernen',
    order_subtotal: 'Zwischensumme',
    order_zip_error: 'Wir liefern aktuell nur innerhalb von 5020 Salzburg. Bitte rufen Sie uns an: 0660 7324766',
    order_sunday_error: 'Sonntag ist unser Ruhetag. Bitte wählen Sie einen anderen Tag.',
    order_past_error: 'Bitte wählen Sie ein zukünftiges Datum.',

    persons_1: '1 Person',
    persons_2: '2 Personen',
    persons_3: '3 Personen',
    persons_4: '4 Personen',
    persons_5: '5 Personen',
    persons_6: '6 Personen',
    persons_7: '7 Personen',
    persons_8: '8 Personen',
    persons_9: '9 Personen',
    persons_10: '10 Personen',
    persons_10plus: '10+ Personen (bitte anrufen)',

    coffee_label: 'Kaffeezeremonie & Spezialitäten',
    coffee_title: 'Die traditionelle Kaffeezeremonie & Spezialitäten',
    coffee_subtitle: 'Äthiopien ist die Geburtsstätte des Kaffees. Seit Jahrtausenden ist die Kaffeezeremonie ein heiliges Ritual der Gemeinschaft und Gastfreundschaft.',
    coffee_col1_title: 'Äthiopischer Hochlandkaffee',
    coffee_col1_text: 'Der Kaffee wird dreimal gebraut: Abol (stark), Tona (mittel) und Baraka (leicht, der Segen). Jede Runde hat ihre eigene Bedeutung. Die Zeremonie dauert bis zu einer Stunde und ist ein Zeichen höchster Gastfreundschaft.',
    coffee_col2_title: 'Weitere Spezialitäten',
    coffee_col2_tej_name: 'Tej – Äthiopischer Honigwein',
    coffee_col2_tej_desc: 'Ein traditionelles alkoholisches Getränk aus Honig und Gesho-Zweigen, seit Jahrhunderten in Äthiopien gebraut.',
    coffee_col2_berbere_name: 'Berbere – Die Seele der Küche',
    coffee_col2_berbere_desc: 'Eine komplexe Gewürzmischung aus über 15 Zutaten: Chili, Ingwer, Koriander, Kardamom und mehr. Das Herzstück jedes Wot.',
    coffee_col2_niter_name: 'Niter Kibbeh – Gewürztes Buttersch malz',
    coffee_col2_niter_desc: 'Geklarte Butter, verfeinert mit Zwiebeln, Knoblauch, Ingwer und Gewürzen. Die Basis für fast alle äthiopischen Gerichte.',

    fact1_title: 'Wussten Sie schon?',
    fact1_text: 'Injera ist nicht nur Brot – es ist gleichzeitig Teller, Löffel und Gabel. Man reißt ein Stück ab und wickelt damit das Essen ein.',
    fact2_title: 'Wussten Sie schon?',
    fact2_text: 'Äthiopien ist die Heimat des Kaffees. Die Kaffeepflanze wurde erstmals in der Region Kaffa entdeckt – daher auch der Name.',
    fact3_title: 'Wussten Sie schon?',
    fact3_text: 'Äthiopien hat einen eigenen Kalender mit 13 Monaten und ist ca. 7 Jahre hinter dem gregorianischen Kalender. Das neue Jahr beginnt im September.',
    fact_did_you_know: 'Wussten Sie schon?',

    agb_title: 'AGB für Online-Bestellung',
    agb_content: `1. BESTELLUNG\nDurch Abschluss der Online-Bestellung geben Sie eine verbindliche Bestellung auf. Wir bestätigen Ihre Bestellung per E-Mail oder telefonisch.\n\n2. LIEFERUNG\nWir liefern innerhalb von 5020 Salzburg. Die Lieferzeit beträgt ca. 45–60 Minuten.\n\n3. MINDESTBESTELLWERT\nDer Mindestbestellwert wird bei der Bestellung angezeigt.\n\n4. ZAHLUNG\nDie Zahlung erfolgt per Kreditkarte (Stripe) oder bar bei Lieferung.\n\n5. STORNIERUNG\nEine Stornierung ist bis 15 Minuten nach Bestelleingang möglich. Bitte rufen Sie uns an: 0660 7324766.\n\n6. ALLERGENE\nBitte informieren Sie uns bei Allergien im Kommentarfeld.\n\n7. BETREIBER\nDaniel Yemane\nHabesha Cafe Bar & Restaurant e.U.\nGebirgsjägerplatz 1, 5020 Salzburg\nTel: 0660 7324766`,
  },

  en: {
    nav_home: 'Home',
    nav_culture: 'Culture',
    nav_menu: 'Menu',
    nav_reviews: 'Reviews',
    nav_contact: 'Contact',
    nav_reserve: 'Book a table',
    nav_order: 'Order now',

    hero_subtitle: 'A Piece of Ethiopia in Salzburg',
    hero_title_main: 'Habesha',
    hero_title_sub: 'Ethiopian Restaurant',
    hero_cta_menu: 'Discover Menu',
    hero_cta_reserve: 'Book a table',

    culture_title: 'More than just a meal.',
    culture_gursha_quote: '"Gursha" – The art of sharing.',
    culture_p1: 'In Ethiopia, eating is a sacred ceremony of community. At Habesha, we celebrate this tradition right in the middle of Salzburg. The heart of our meal is Injera – a soft, slightly sour flatbread that serves as both plate and cutlery.',
    culture_p2: 'We eat with our hands, share large platters, and feed each other – a gesture we call "Gursha". Experience the magic of Ethiopian spices.',
    culture_authentic: '100% Authentic',
    culture_vegan_label: 'Vegan',
    culture_vegan_sub: 'Wide Choice',
    culture_handmade: 'Handmade',
    culture_injera: 'Fresh Injera',

    press_label: 'Press & Recommendations',
    press_quote: '"Habesha celebrates the cuisine and culture of Ethiopia"',
    press_desc: 'Discover what the well-known Salzburg city magazine Fräulein Flora writes about our authentic concept. A wonderful preview before your visit!',
    press_btn: 'Read Article',

    menu_title: 'Culinary Journey',
    menu_subtitle: 'All main courses are served on traditional Injera. Discover the spicy sauces (Wot) and roasted specialties (Tibs).',
    menu_tab_mains: 'Meat Dishes',
    menu_tab_vegan: 'Vegan & Veggie',
    menu_tab_plates: 'Combo Platters',
    menu_tab_sides: 'Sides & Salads',

    zilzil_tibs_desc: 'Well-done beef strips with onions, green paprika, and fresh herbs.',
    tibs_desc: 'Tender beef roasted with ground paprika, spiced butter, and onions.',
    tibs_price: 'from 19.40 €',
    doro_wot_desc: 'Chicken leg braised in a spicy sauce, served with egg, fresh cheese, and salad.',
    cas_light_desc: 'Finely chopped, roasted, juicy beef.',
    bozena_shiro_desc: 'Mild chickpea flour sauce with beef pieces, onions, and salad.',
    kitfo_desc: 'Minced beef (tartare) with chili, butter, Ayib, and kale.',

    shiro_wot_desc: 'Mild sauce made from roasted chickpea flour, served with Injera.',
    yellow_peas_name: 'Yellow Split Peas with Salad',
    yellow_peas_desc: 'Yellow split peas in a mild curry with a fresh side salad.',
    lentil_sauce_name: 'Lentil Sauce with Salad',
    lentil_sauce_desc: 'Lentils in a mild paprika sauce with a fresh side salad.',

    kombi_1_name: 'Habesha Combo Platter (1 Person)',
    kombi_1_desc: 'The perfect choice: A mixed platter of various meat dishes.',
    kombi_2_name: 'Habesha Combo Platter (2 Persons)',
    kombi_2_desc: 'Ideal for sharing: Mixed platter of various house specialties.',
    kombi_vegan_name: 'Habesha Combo (Vegan/Vegetarian)',
    kombi_vegan_desc: 'A colorful palette of various vegan and vegetarian dishes.',

    salad_name: 'Salad (Small / Large)',
    salad_desc: 'Leaf salad with tomatoes, cucumber slices, and dressing',
    sambusa_name: 'Sambusa (Vegetable / Beef)',
    sambusa_desc: 'Fried pastries filled with vegetables or beef',
    lentil_soup_name: 'Lentil Soup',
    lentil_soup_desc: 'Ethiopian style with lentils and carrots',
    injera_side_name: 'Injera (2 Rolls)',
    injera_side_desc: '2 rolls of flatbread as a side',

    reviews_title: 'Guest Experiences',
    reviews_subtitle: 'Authenticity that inspires',
    review1_text: '"An incredible experience. You eat with your hands from a shared platter - it brings people together. The food is perfectly spiced!"',
    review2_text: '"As a vegan, I am in heaven. So many options, everything fresh and the owners are incredibly welcoming. An absolute must in Salzburg!"',

    contact_title: 'Come Visit Us',
    contact_address_label: 'Address',
    contact_address_note: 'Not far from the central station & Mirabell Gardens.',
    contact_phone_label: 'Reservation & Contact',
    contact_hours_label: 'Opening Hours',
    contact_hours_value: 'Wed–Fri: 11:00–14:00, 17:00–22:00 | Sat–Sun: 13:00–22:00 | Mon: Closed | Tue: 17:00–22:00',

    footer_imprint: 'Imprint',
    footer_privacy: 'Privacy',
    footer_copyright: '© 2024 Habesha Ethiopian Restaurant Salzburg',

    imprint_title: 'Imprint',
    privacy_title: 'Privacy Policy',
    privacy_text: 'We do not collect any data on this website. External links to Google Maps and TripAdvisor are subject to their respective terms.',

    res_page_title: 'Book a Table',
    res_page_subtitle: 'Secure your place for an unforgettable Ethiopian experience.',
    res_name: 'Name & Surname',
    res_phone: 'Phone',
    res_email: 'E-Mail',
    res_date: 'Date',
    res_time: 'Time',
    res_persons: 'Persons',
    res_wishes: 'Special Requests',
    res_wishes_placeholder: 'Allergies, birthday, special occasions, high chair needed...',
    res_agb_text: 'I have read and accept the Terms & Conditions and Privacy Policy.',
    res_submit: 'Book Table',
    res_success: '✓ Your reservation has been successfully submitted! We will confirm your table by phone or email within 24 hours.',
    res_error: 'There was an error. Please call us directly: 0660 7324766',
    res_confirm_note: 'We will confirm your reservation by phone or email within 24 hours.',

    order_title: 'Order Online',
    order_step1: 'Choose Dishes',
    order_step2: 'Delivery Details',
    order_step3: 'Payment',
    order_cart_empty: 'Your cart is empty',
    order_min_order: 'Minimum order',
    order_delivery_fee: 'Delivery fee',
    order_total: 'Total',
    order_next: 'Next',
    order_back: 'Back',
    order_asap: 'As soon as possible',
    order_asap_desc: 'approx. 45–60 minutes',
    order_schedule: 'Choose preferred time',
    order_schedule_desc: 'Select date & time',
    order_firstname: 'First name',
    order_lastname: 'Last name',
    order_street: 'Street & House number',
    order_zip: 'ZIP code',
    order_city: 'City',
    order_floor: 'Floor / Door (optional)',
    order_delivery_note: 'Delivery note (optional)',
    order_pay_card: 'Credit / Debit Card',
    order_pay_cash: 'Cash on delivery',
    order_pay_cash_note: 'Please have the exact amount ready.',
    order_pay_secure: '🔒 Secure payment via Stripe. Your card data is encrypted.',
    order_agb_text: 'I have read and accept the Terms & Conditions for online orders and the Privacy Policy.',
    order_submit: 'Place Order',
    order_success_title: 'Thank you for your order!',
    order_success_text: 'Your order has been successfully received. We will contact you shortly by phone to confirm.',
    order_back_home: 'Back to Home',
    order_add: 'Add',
    order_remove: 'Remove',
    order_subtotal: 'Subtotal',
    order_zip_error: 'We currently only deliver within 5020 Salzburg. Please call us: 0660 7324766',
    order_sunday_error: 'Sunday is our day off. Please choose another day.',
    order_past_error: 'Please choose a future date.',

    persons_1: '1 Person',
    persons_2: '2 Persons',
    persons_3: '3 Persons',
    persons_4: '4 Persons',
    persons_5: '5 Persons',
    persons_6: '6 Persons',
    persons_7: '7 Persons',
    persons_8: '8 Persons',
    persons_9: '9 Persons',
    persons_10: '10 Persons',
    persons_10plus: '10+ Persons (please call)',

    coffee_label: 'Coffee Ceremony & Specialties',
    coffee_title: 'The Traditional Coffee Ceremony & Specialties',
    coffee_subtitle: 'Ethiopia is the birthplace of coffee. For millennia, the coffee ceremony has been a sacred ritual of community and hospitality.',
    coffee_col1_title: 'Ethiopian Highland Coffee',
    coffee_col1_text: 'Coffee is brewed three times: Abol (strong), Tona (medium) and Baraka (light, the blessing). Each round has its own meaning. The ceremony lasts up to an hour and is a sign of the highest hospitality.',
    coffee_col2_title: 'Further Specialties',
    coffee_col2_tej_name: 'Tej – Ethiopian Honey Wine',
    coffee_col2_tej_desc: 'A traditional alcoholic drink made from honey and gesho branches, brewed in Ethiopia for centuries.',
    coffee_col2_berbere_name: 'Berbere – The Soul of the Kitchen',
    coffee_col2_berbere_desc: 'A complex spice blend of over 15 ingredients: chili, ginger, coriander, cardamom and more. The heart of every Wot.',
    coffee_col2_niter_name: 'Niter Kibbeh – Spiced Clarified Butter',
    coffee_col2_niter_desc: 'Clarified butter refined with onions, garlic, ginger and spices. The base for almost all Ethiopian dishes.',

    fact1_title: 'Did you know?',
    fact1_text: 'Injera is not just bread – it is simultaneously plate, spoon and fork. You tear off a piece and wrap the food inside it.',
    fact2_title: 'Did you know?',
    fact2_text: 'Ethiopia is the home of coffee. The coffee plant was first discovered in the Kaffa region – hence the name.',
    fact3_title: 'Did you know?',
    fact3_text: 'Ethiopia has its own calendar with 13 months and is approximately 7 years behind the Gregorian calendar. The new year begins in September.',
    fact_did_you_know: 'Did you know?',

    agb_title: 'Terms & Conditions for Online Orders',
    agb_content: `1. ORDER\nBy completing the online order, you place a binding order. We will confirm your order by email or phone.\n\n2. DELIVERY\nWe deliver within 5020 Salzburg. Delivery time is approx. 45–60 minutes.\n\n3. MINIMUM ORDER\nThe minimum order value is displayed during checkout.\n\n4. PAYMENT\nPayment is by credit card (Stripe) or cash on delivery.\n\n5. CANCELLATION\nCancellation is possible up to 15 minutes after order placement. Please call: 0660 7324766.\n\n6. ALLERGENS\nPlease inform us of any allergies in the comment field.\n\n7. OPERATOR\nDaniel Yemane\nHabesha Cafe Bar & Restaurant e.U.\nGebirgsjägerplatz 1, 5020 Salzburg\nTel: 0660 7324766`,
  },

  am: {
    nav_home: 'መነሻ',
    nav_culture: 'ባህል',
    nav_menu: 'ምናሌ',
    nav_reviews: 'አስተያየቶች',
    nav_contact: 'አድራሻ',
    nav_reserve: 'ጠረጴዛ ያስይዙ',
    nav_order: 'አሁን ይዘዙ',

    hero_subtitle: 'የኢትዮጵያ ጣዕም በሳልዝበርግ',
    hero_title_main: 'ሀበሻ',
    hero_title_sub: 'የኢትዮጵያ ምግብ ቤት',
    hero_cta_menu: 'ምናሌውን ይመልከቱ',
    hero_cta_reserve: 'ጠረጴዛ ያስይዙ',

    culture_title: 'ከምግብ በላይ።',
    culture_gursha_quote: '"ጉርሻ" – የመካፈል ጥበብ።',
    culture_p1: 'በኢትዮጵያ ምግብ መመገብ የህብረት እና የፍቅር ምልክት ነው። በሀበሻ ምግብ ቤት ይህንን ባህል በሳልዝበርግ ከተማ እናቀርባለን። ዋናው ምግባችን እንጀራ ሲሆን፣ ሳህን እና ማንኪያ በመሆን ያገለግላል።',
    culture_p2: 'በእጃችን እንመገባለን፣ በአንድ ትልቅ ሳህን እንካፈላለን እንዲሁም እርስበርስ እንጉራርሳለን - ይህንንም "ጉርሻ" እንለዋለን። የኢትዮጵያን የቅመማቅመም ጥበብ ይቅመሱ።',
    culture_authentic: '100% እውነተኛ',
    culture_vegan_label: 'ቪጋን',
    culture_vegan_sub: 'ሰፊ ምርጫ',
    culture_handmade: 'በእጅ የተሰራ',
    culture_injera: 'ትኩስ እንጀራ',

    press_label: 'ፕሬስ እና ምክሮች',
    press_quote: '"ሀበሻ የኢትዮጵያን ምግብ እና ባህል ያከብራል"',
    press_desc: 'ታዋቂው የሳልዝበርግ መጽሔት Fräulein Flora ስለእኛ እውነተኛ የምግብ አቀራረብ ምን እንደሚል ያንብቡ።',
    press_btn: 'ጽሑፉን ያንብቡ',

    menu_title: 'የምግብ ጉዞ',
    menu_subtitle: 'ሁሉም ዋና ምግቦች ከባህላዊ እንጀራ ጋር ይቀርባሉ። የቅመማቅመም ወጦችን እና ጥብሶችን ይቅመሱ።',
    menu_tab_mains: 'የስጋ ምግቦች',
    menu_tab_vegan: 'የፆም ምግቦች',
    menu_tab_plates: 'ልዩ ልዩ ምግቦች',
    menu_tab_sides: 'አትክልትና ሰላጣ',

    zilzil_tibs_desc: 'በጥሩ ሁኔታ የተጠበሰ የበሬ ሥጋ ከሽንኩርት፣ አረንጓዴ በርበሬ እና ትኩስ ቅጠላቅጠሎች ጋር።',
    tibs_desc: 'ለስላሳ የበሬ ሥጋ ከቀይ በርበሬ፣ ቅቤ እና ሽንኩርት ጋር የተጠበሰ።',
    tibs_price: 'ከ 19,40 €',
    doro_wot_desc: 'የዶሮ ጭን በቀይ ወጥ ውስጥ የተቀቀለ፣ ከእንቁላል፣ አይብ እና ሰላጣ ጋር ይቀርባል።',
    cas_light_desc: 'ትንሽ ተቆርጦ የተጠበሰ ጭማቂ የበሬ ሥጋ።',
    bozena_shiro_desc: 'ከሽምብራ ዱቄት የተሰራ ቀለል ያለ ወጥ ከበሬ ሥጋ ቁርጥ፣ ሽንኩርት እና ሰላጣ ጋር።',
    kitfo_desc: 'የተፈጨ የበሬ ሥጋ (ታርታር) ከሚጥሚጣ፣ ቅቤ፣ አይብ እና ጎመን ጋር።',

    shiro_wot_desc: 'ከተቆላ ሽምብራ ዱቄት የተሰራ ቀለል ያለ ወጥ ከእንጀራ ጋር ይቀርባል።',
    yellow_peas_name: 'ቢጫ ምስር ከሰላጣ ጋር',
    yellow_peas_desc: 'ቢጫ ምስር በቀለል ያለ ካሪ ከትኩስ ሰላጣ ጋር።',
    lentil_sauce_name: 'ምስር ወጥ ከሰላጣ ጋር',
    lentil_sauce_desc: 'ምስር በቀለል ያለ ቀይ በርበሬ ወጥ ከትኩስ ሰላጣ ጋር።',

    kombi_1_name: 'ሀበሻ ኮምቢ ሳህን (1 ሰው)',
    kombi_1_desc: 'ምርጥ ምርጫ፡ ከተለያዩ የስጋ ምግቦች የተዘጋጀ ድብልቅ ሳህን።',
    kombi_2_name: 'ሀበሻ ኮምቢ ሳህን (2 ሰዎች)',
    kombi_2_desc: 'ለመካፈል ተስማሚ፡ ከተለያዩ የቤት ምግቦች የተዘጋጀ ድብልቅ ሳህን።',
    kombi_vegan_name: 'ሀበሻ ኮምቢ (ቪጋን/ቬጀቴሪያን)',
    kombi_vegan_desc: 'ከተለያዩ ቪጋን እና ቬጀቴሪያን ምግቦች የተዘጋጀ ቀለማማ ሳህን።',

    salad_name: 'ሰላጣ (ትንሽ / ትልቅ)',
    salad_desc: 'ቅጠላቅጠል ሰላጣ ከቲማቲም፣ ዱባ እና ሶስ ጋር',
    sambusa_name: 'ሳምቡሳ (አትክልት / ሥጋ)',
    sambusa_desc: 'ከአትክልት ወይም ሥጋ ጋር የተሞላ የተጠበሰ ሳምቡሳ',
    lentil_soup_name: 'የምስር ሾርባ',
    lentil_soup_desc: 'ከምስር እና ካሮት ጋር በኢትዮጵያ ዘዴ የተዘጋጀ',
    injera_side_name: 'እንጀራ (2 ሮሎ)',
    injera_side_desc: '2 ሮሎ እንጀራ እንደ ጎን ምግብ',

    reviews_title: 'የደንበኞች አስተያየት',
    reviews_subtitle: 'እውነተኛ የኢትዮጵያ ጣዕም',
    review1_text: '"እጅግ አስደናቂ ተሞክሮ! በአንድ ሳህን ላይ በእጅ መመገብ ፍቅርን ይጨምራል። ምግቡ በጣም ጣፋጭ ነው!"',
    review2_text: '"ለፆም ምግብ ተመጋቢዎች ምርጥ ምርጫ። ሁሉም ትኩስ እና ባለቤቶቹ በጣም ደግ ናቸው።"',

    contact_title: 'ይጎብኙን',
    contact_address_label: 'አድራሻ',
    contact_address_note: 'ከዋናው ጣቢያ እና ሚራቤልጋርተን ቅርብ።',
    contact_phone_label: 'ስልክ ቁጥር',
    contact_hours_label: 'የስራ ሰዓት',
    contact_hours_value: 'ረ–ዓ: 11:00–14:00, 17:00–22:00 | ቅ–እ: 13:00–22:00 | ሰ: ዝጉ | ማ: 17:00–22:00',

    footer_imprint: 'ማስታወሻ',
    footer_privacy: 'ግላዊነት',
    footer_copyright: '© 2024 ሀበሻ የኢትዮጵያ ምግብ ቤት ሳልዝበርግ',

    imprint_title: 'ማስታወሻ',
    privacy_title: 'ግላዊነት',
    privacy_text: 'በዚህ ድረ-ገጽ ላይ ምንም ዓይነት መረጃ አንሰበስብም።',

    res_page_title: 'ጠረጴዛ ያስይዙ',
    res_page_subtitle: 'ለማይረሳ የኢትዮጵያ ምግብ ልምድ ቦታዎን ያስይዙ።',
    res_name: 'ስም እና የአባት ስም',
    res_phone: 'ስልክ',
    res_email: 'ኢሜይል',
    res_date: 'ቀን',
    res_time: 'ሰዓት',
    res_persons: 'ሰዎች',
    res_wishes: 'ልዩ ፍላጎቶች',
    res_wishes_placeholder: 'አለርጂዎች፣ ልደት፣ ልዩ አጋጣሚዎች...',
    res_agb_text: 'የአጠቃቀም ሁኔታዎችን እና የግላዊነት ፖሊሲን አንብቤ ተቀብያለሁ።',
    res_submit: 'ጠረጴዛ ያስይዙ',
    res_success: '✓ ማስያዣዎ በተሳካ ሁኔታ ተልኳል! በ24 ሰዓት ውስጥ በስልክ ወይም ኢሜይል እናረጋግጣለን።',
    res_error: 'ስህተት ተፈጥሯል። እባክዎ ቀጥታ ይደውሉ: 0660 7324766',
    res_confirm_note: 'ማስያዣዎን በ24 ሰዓት ውስጥ በስልክ ወይም ኢሜይል እናረጋግጣለን።',

    order_title: 'ኦንላይን ይዘዙ',
    order_step1: 'ምግቦችን ይምረጡ',
    order_step2: 'የማድረስ ዝርዝሮች',
    order_step3: 'ክፍያ',
    order_cart_empty: 'ጋሪዎ ባዶ ነው',
    order_min_order: 'ዝቅተኛ ትዕዛዝ',
    order_delivery_fee: 'የማድረስ ክፍያ',
    order_total: 'ጠቅላላ',
    order_next: 'ቀጥል',
    order_back: 'ተመለስ',
    order_asap: 'በተቻለ ፍጥነት',
    order_asap_desc: 'ወደ 45–60 ደቂቃ',
    order_schedule: 'የሚፈለግ ሰዓት ይምረጡ',
    order_schedule_desc: 'ቀን እና ሰዓት ይምረጡ',
    order_firstname: 'የመጀመሪያ ስም',
    order_lastname: 'የአባት ስም',
    order_street: 'ጎዳና እና የቤት ቁጥር',
    order_zip: 'ፖስታ ኮድ',
    order_city: 'ከተማ',
    order_floor: 'ፎቅ / ደጃፍ (አማራጭ)',
    order_delivery_note: 'ስለ ማድረስ ማስታወሻ (አማራጭ)',
    order_pay_card: 'ክሬዲት / ዴቢት ካርድ',
    order_pay_cash: 'ሲደርስ ጥሬ ገንዘብ',
    order_pay_cash_note: 'እባክዎ ትክክለኛ መጠን ያዘጋጁ።',
    order_pay_secure: '🔒 በ Stripe በኩል ደህንነቱ የተጠበቀ ክፍያ።',
    order_agb_text: 'የኦንላይን ትዕዛዝ ሁኔታዎችን እና የግላዊነት ፖሊሲን አንብቤ ተቀብያለሁ።',
    order_submit: 'አሁን ይዘዙ',
    order_success_title: 'ለትዕዛዝዎ እናመሰግናለን!',
    order_success_text: 'ትዕዛዝዎ በተሳካ ሁኔታ ተቀብሏል። ለማረጋገጥ በቅርቡ በስልክ እንደውልዎታለን።',
    order_back_home: 'ወደ መነሻ ተመለስ',
    order_add: 'ጨምር',
    order_remove: 'አስወግድ',
    order_subtotal: 'ንዑስ ድምር',
    order_zip_error: 'በአሁኑ ጊዜ በ5020 ሳልዝበርግ ውስጥ ብቻ እናደርሳለን። እባክዎ ይደውሉ: 0660 7324766',
    order_sunday_error: 'እሁድ የእረፍት ቀናችን ነው። እባክዎ ሌላ ቀን ይምረጡ።',
    order_past_error: 'እባክዎ የወደፊት ቀን ይምረጡ።',

    persons_1: '1 ሰው',
    persons_2: '2 ሰዎች',
    persons_3: '3 ሰዎች',
    persons_4: '4 ሰዎች',
    persons_5: '5 ሰዎች',
    persons_6: '6 ሰዎች',
    persons_7: '7 ሰዎች',
    persons_8: '8 ሰዎች',
    persons_9: '9 ሰዎች',
    persons_10: '10 ሰዎች',
    persons_10plus: '10+ ሰዎች (እባክዎ ይደውሉ)',

    coffee_label: 'የቃሑወ ስነታ እና ዘላይ ዘላይ ስንብስብ',
    coffee_title: 'የበዓሉ የቃሑወ ስነታ እና ዘላይ ዘላይ ስንብስብ',
    coffee_subtitle: 'እትዮጵያ የቃሑወ ተወላጃ ናት። ለሺህ ዓመታት የቡና ስነ ሥርዓት የህብረት እና የእንግዳ ተቀባይነት ቅዱስ ሥርዓት ነው።',
    coffee_col1_title: 'የኢትዮጵያ ደጋ ቡና',
    coffee_col1_text: 'ቡናው ሶስት ጊዜ ይፈላል: አቦል (ጠንካራ)፣ ቶና (መካከለኛ) እና ባርካ (ቀላል፣ ቡራኬ)። እያንዳንዱ ዙር የራሱ ትርጉም አለው። ሥርዓቱ እስከ አንድ ሰዓት ድረስ ይቆያል።',
    coffee_col2_title: 'ሌሎች ልዩ ምግቦች',
    coffee_col2_tej_name: 'ጠጅ – የኢትዮጵያ ማር ወይን',
    coffee_col2_tej_desc: 'ከማር እና ከጌሾ ቅርንጫፎች የሚሰራ ባህላዊ አልኮሆል ሲሆን ለዘመናት በኢትዮጵያ ሲጠጣ ቆይቷል።',
    coffee_col2_berbere_name: 'በርበሬ – የምግብ ቤቱ ነፍስ',
    coffee_col2_berbere_desc: 'ከ15 በላይ ቅመሞች የተሰራ ውስብስብ ቅመም ድብልቅ: ቺሊ፣ ዝንጅብል፣ ኮሪያንደር፣ ካርዳሞም እና ሌሎችም።',
    coffee_col2_niter_name: 'ንጥር ቅቤ – ቅመም ቅቤ',
    coffee_col2_niter_desc: 'ከሽንኩርት፣ ነጭ ሽንኩርት፣ ዝንጅብል እና ቅመሞች ጋር የተጣራ ቅቤ። ለሁሉም ኢትዮጵያዊ ምግቦች መሠረት።',

    fact1_title: 'ያውቁ ነበር?',
    fact1_text: 'እንጀራ ዳቦ ብቻ አይደለም – ሳህን፣ ማንኪያ እና ሹካ ነው። አንድ ቁራጭ ቀደዱ እና ምግቡን ጠቅልሉ።',
    fact2_title: 'ያውቁ ነበር?',
    fact2_text: 'ኢትዮጵያ የቡና ቤት ናት። የቡና ተክሉ ለመጀመሪያ ጊዜ የተገኘው በካፋ ክልል ነው – ስለዚህ ስሙ ቡና ሆነ።',
    fact3_title: 'ያውቁ ነበር?',
    fact3_text: 'ኢትዮጵያ 13 ወር ያለው የራሷ የቀን አቆጣጠር አላት። አዲሱ ዓመት በሴፕቴምበር ይጀምራል።',
    fact_did_you_know: 'ያውቁ ነበር?',

    agb_title: 'ለኦንላይን ትዕዛዝ ሁኔታዎች',
    agb_content: `1. ትዕዛዝ\nኦንላይን ትዕዛዙን ሲጨርሱ አስገዳጅ ትዕዛዝ ይሰጣሉ።\n\n2. ማድረስ\nበ5020 ሳልዝበርግ ውስጥ እናደርሳለን። የማድረስ ጊዜ ወደ 45–60 ደቂቃ ነው።\n\n3. ዝቅተኛ ትዕዛዝ\nዝቅተኛ የትዕዛዝ ዋጋ በክፍያ ጊዜ ይታያል።\n\n4. ክፍያ\nክፍያ በክሬዲት ካርድ (Stripe) ወይም ሲደርስ ጥሬ ገንዘብ ነው።\n\n5. ሰርዞ ማቆም\nትዕዛዝ ከተሰጠ ከ15 ደቂቃ ውስጥ መሰረዝ ይቻላል። ይደውሉ: 0660 7324766\n\n6. አለርጂዎች\nስለ አለርጂዎች በማስታወሻ ሳጥን ያሳውቁን።\n\n7. ኦፕሬተር\nDaniel Yemane\nHabesha Cafe Bar & Restaurant e.U.\nGebirgsjägerplatz 1, 5020 Salzburg\nTel: 0660 7324766`,
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectInitialLang(): Lang {
  const saved = localStorage.getItem('habesha-lang');
  if (saved === 'de' || saved === 'en' || saved === 'am') return saved;
  // Detect device language
  const deviceLang = navigator.language?.toLowerCase() || '';
  if (deviceLang.startsWith('am') || deviceLang.startsWith('ti')) return 'am';
  if (deviceLang.startsWith('en')) return 'en';
  return 'de'; // Default: German
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('habesha-lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
