# Übergabe: Website „Kochy's“

> Diese Datei zu Beginn eines neuen Chats hochladen. Aufbau übernommen von Pizzeria O la la (aymanoul/pizzeria-o-la-la), Aussehen eigenständig in den Kochy's-Farben.

---

## 1. Projekt in Kürze

| | |
|---|---|
| **Name** | Kochy's (Schreibweise wie im Logo) |
| **Slogan** | „Dein Döner. Dein Genuss.“ (vom Flyer) |
| **Inhaber** | laut Impressum: Kochys, Inh. Arzu Tokat |
| **Adresse** | Dieselstraße 1A, 40880 Ratingen |
| **Telefon / E-Mail** | 02102 5589497 (`tel:+4921025589497`) · info@kochys-ratingen.de |
| **Instagram** | @kochys.ratingen (dort das tägliche Tagesgericht) |
| **Küche** | Döner, Burger, Pasta, Schnitzel, Salate, Tagesgerichte, Catering · **100 % Halal**, kein Alkohol |
| **Öffnungszeiten** | Mo–Fr 11–21 Uhr, Sa + So 12–21 Uhr (alte Website, Stand 2025) |
| **Bestellen** | bisher nur telefonisch; zusätzlich Lieferando |

### Domains
- **kochys-ratingen.de** = eigene Domain, wird ersetzt. Liegt bei **Strato** (Nameserver `docks16/shades01.rzone.de`), alte Seite WordPress + Elementor.
  **E-Mail läuft über Strato** (MX `smtpin.rzone.de`, Postfach info@kochys-ratingen.de) → beim Umzug MX-Eintrag unbedingt übernehmen.
- **ratingen-kochys.de** = Shop-Seite von **Lieferando** (Nameserver `takeaway.com`). Gehört nicht Kochy's, kann nicht übernommen werden.

### Links
- Repo: https://github.com/aymanoul/kochys (Branch `main`)
- Vorschau: https://aymanoul.github.io/kochys/

---

## 2. Speisekarte (`menu.js`)

- **Preise und Nummern = aktuelle Karte im Laden** (Foto vom 27.10.2026). Nummern 1–42 wie auf der Karte; Menüs, Tageskarte und Getränke haben dort keine Nummer (intern 101+, werden ohne Nummer angezeigt).
- Gegenüber der alten Website geändert: Kebabtasche Hähnchen 7,90 € (statt 7,60 €), neu „Extra Wurst + 3,00 €“ bei Brat- und Currywurst.
- Entfernt, weil nicht auf der Karte im Laden: Hähnchen-Gemüse-Pfanne, Desserts, Capri-Sun und Red Bull einzeln (nur bei Lieferando).
- Auf dem Foto nicht lesbar (Spiegelung/abgeschnitten), daher von der alten Website übernommen: Burger 18–20 (8,90 €), Preise rechts bei Snacks 24 und 26–30.
- Von Lieferando: Getränkesorten, Tortiglioni, Rindfleisch-Patty, Geflügelwurst, Döner-Salat. Vom Flyer: Dressings, „selbstgemachter Dürüm“.
- **Allergene fehlen bewusst.** Der alte Flyer hat Kennzeichnungen, aber mit Fehlern (z. B. Garnelen ohne Krebstiere). Erst eintragen, wenn der Inhaber eine geprüfte Liste gibt (Feld 3 je Gericht, z. B. `"a,c,1"`).

Format und Auswahl-Gruppen sind oben in `menu.js` erklärt: `sizes` = Varianten mit eigenem Preis (Hähnchen/Kalb, Stückzahl), `groups` = Pflicht-Auswahl (`one`) oder Extras mit Aufpreis (`many`).

---

## 3. Design

- Weißer Hintergrund, dunkle Schrift, ein Akzent-Button „Jetzt anrufen“ (wie O la la).
- **Farben aus dem Logo:** Braun `#643d11` (Überschriften, aktive Kategorie, Banner), Orange `#f7a35c` mit dunkelbrauner Schrift `#3a2208` (Buttons, Warenkorb), Sand `#c8a175`. Streifen oben: Braun · Sand · Orange.
- **Schriften:** Outfit (Text), Fredoka (Überschriften, passt zum runden Logo). Beide lokal in `fonts/`, keine Verbindung zu Google Fonts.
- Aufbau: Kopfzeile → Start (Logo, Slogan, „100 % Halal“, Adresse, „Jetzt geöffnet“, ein Button) → Kategorie-Leiste mit Suche → Speisekarte (Tageskarte mit Fotostreifen) → Banner „Hunger bekommen?“ → Catering mit 3 Fotos → Info (Öffnungszeiten, Liefergebiete, Anfahrt, Kontakt) → Karte erst nach Klick (Google Maps) → Fußzeile.
- Fotos: eigene Bilder von der alten Website (Tagesgerichte, Buffet), auf 640 px bzw. 800×1000 px zugeschnitten.
- Nicht verwendet (wie bei O la la): Hintergrundfoto hinter dem Logo, „Beliebt“-Bereich, Chips unter dem Logo, zweiter Button, Ornamente.

---

## 4. Bestellung (`SHOP` in `index.html`)

- Warenkorb, Lieferung/Abholung, Liefergebiet mit Mindestbestellwert, Kasse mit Pflichtfeldern, Bestätigung mit Nr. `KO-TTMM-HHMM`.
- Liefergebiete: West + Tiefenbroich 20 €, Mitte 25 €, Ost 30 €, Kaiserswerth 35 €, Hösel 40 €, Wittlaer 40 € (Mindestbestellwert inkl. Getränke, `minOhneGetraenke: false`).
- `orderWhatsapp` und `orderEmail` sind leer → am Ende sieht der Kunde seine Übersicht und ruft an. Sobald eine Nummer/Adresse eingetragen ist, wird die Bestellung als fertige Nachricht verschickt (dann Datenschutz Punkt 5 anpassen).
- Liefergebühr 0 €, Zahlung nur „Barzahlung“ – beides unbestätigt.

---

## 5. Offene Punkte (vom Inhaber bestätigen lassen)

1. Fehlende Preise: Burger 18–20 und rechte Spalte Snacks (Foto ohne Spiegelung)
2. Allergene und Zusatzstoffe je Gericht (geprüfte Liste)
3. Liefergebühr, Zahlungsarten (Karte?), Mindestbestellwert mit oder ohne Getränke
4. Bestellungen per WhatsApp oder E-Mail empfangen? Welche Nummer/Adresse?
5. Welche Berliner Saucen gibt es zum Döner? (Bisher nur per Anmerkung)
6. Getränke: Pfand? Größen von Ayran/Wasser? Welche Sinalco-Sorten?
7. Impressum: Umsatzsteuer-ID (auf der alten Seite stand nur „DE“), Rechtsform
8. Fleisch beim Döner: Der alte Flyer nennt „Hackfleischdrehspieß / Hähnchendrehspieß“ – soll das auf die Karte?
9. Öffnungszeiten aktuell? Liefer- und Abholzeiten gleich?
10. Datenschutzerklärung von der bisherigen Quelle (Generator/Anwalt) prüfen lassen; bei Umzug zu Cloudflare Abschnitt „Hosting“ anpassen

---

## 6. Nächste Schritte

1. Offene Punkte klären, `menu.js` und `SHOP` anpassen
2. Vorschau-PDF für den Inhaber (Handy + Desktop)
3. Domain kochys-ratingen.de von Strato zu Cloudflare (DNS), **MX/TXT für E-Mail übernehmen**, Cloudflare Pages mit dem Repo verbinden, erst danach WordPress bei Strato abschalten
4. Google-Unternehmensprofil: Website-Link prüfen
5. Später: Stripe/PayPal + Bondrucker (Plan wie bei O la la)

---

## 7. Dashboard-Demo (27.10.2026)

- Live: https://aymanoul.github.io/kochys/dashboard-demo/ – nur Beispieldaten, im Browser erzeugt aus `menu.js` (12 Monate, Tage/Uhrzeiten realistisch verteilt).
- Zeigt: Bestellungen (Neu → In Zubereitung → Unterwegs/abholbereit → erledigt, Ton, Meldung), Bon-Vorschau und Telegram-Nachricht, Umsatz (heute / 7 / 30 Tage / 12 Monate, Vergleich, Top-Gerichte, Stoßzeiten, Liefergebiete, Zahlungsarten, CSV-Export), Speisekarte (ausverkauft-Schalter, Tagesgericht, Bestellungen pausieren).
- Testbestellungen auf der Website erscheinen im selben Browser sofort im Demo-Dashboard (`SHOP.demoDashboard = true`, localStorage `kochys-demo-orders`). **Vor dem echten Start auf `false` stellen bzw. entfernen.**
- **Automatik (Standard: an):** Bestellungen werden sofort mit Standardzeit angenommen (Lieferung 45 Min., Abholung 20 Min., „Viel los“ +15 Min.), Bon wird gedruckt, Status schaltet von selbst weiter. Ausschaltbar unter Einstellungen → dann Annehmen per Klick wie bei Lieferando.
- Plan, Kosten, Konten: Claude-Dokument „Kochy's – Online-Bestellung mit Dashboard“.
