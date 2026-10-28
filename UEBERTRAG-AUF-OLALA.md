# Übertrag: Was wir bei Kochy's gelernt haben → Pizzeria O la la

> Diese Datei zu Beginn eines neuen Chats für **O la la** hochladen. Sie beschreibt alles, was bei Kochy's (27.–28.10.2026) neu gebaut oder gelernt wurde, und wie man es auf O la la überträgt – **inklusive Dashboard, genau wie bei Kochy's**.
> Wichtig: O la la behält **eigene Farben, eigenes Logo, eigene Speisekarte**. Übernommen werden nur Aufbau, Technik und Arbeitsweise.

---

## 1. Links zum Nachschauen

| Was | Link |
|---|---|
| Kochy's Code (Vorlage) | https://github.com/aymanoul/kochys |
| Kochy's Website-Vorschau | https://aymanoul.github.io/kochys/ |
| Kochy's Dashboard-Demo | https://aymanoul.github.io/kochys/dashboard-demo/ |
| Vergleich der 3 Benachrichtigungen | https://aymanoul.github.io/kochys/dashboard-demo/benachrichtigung.html |
| Plan mit Kosten und Konten (Claude-Dokument) | „Kochy's – Online-Bestellung mit Dashboard“ |
| O la la Code | https://github.com/aymanoul/pizzeria-o-la-la |

Dateien im Kochy's-Repo, die man 1:1 als Vorlage nimmt:
```
index.html                     Website (Warenkorb, Kasse, Öffnungszeiten …)
menu.js                        Speisekarte im NEUEN Format (siehe Abschnitt 3)
dashboard-demo/index.html      Dashboard (eine Datei, Beispieldaten)
dashboard-demo/benachrichtigung.html   Vergleichsseite der Mitteilungen
dashboard-demo/vorschau-bg.jpg Hintergrund für die Vergleichsseite
impressum/index.html, datenschutz/index.html   Rechtstexte als eigene Seiten
fonts/                         Schriften lokal (Outfit, Fredoka + Lizenzen)
```

---

## 2. Neu auf der Website (bei O la la nachrüsten)

1. **Schriften lokal statt Google Fonts** (`fonts/*.woff2`, per `@font-face`). Grund: Datenschutz – keine Verbindung zu Google. Für O la la: Outfit + Courgette von fontsource (npm `@fontsource-variable/outfit`, `@fontsource/courgette`) in `fonts/` legen, Lizenzdateien mitkopieren.
2. **Google-Karte erst nach Klick** („Karte anzeigen“ + Hinweis auf Datenschutz). Vorher wird nichts von Google geladen.
3. **Impressum und Datenschutz als eigene Seiten** (`/impressum/`, `/datenschutz/`) statt Dialog-Fenster – so sind sie verlinkbar und gleich wie auf der alten Seite.
4. **„Jetzt geöffnet · bis 21:00 Uhr“** – wird aus `SHOP.hours` berechnet (im Hero und in der Info-Karte, aktualisiert jede Minute).
   ```js
   hours: [ { label: "Montag – Freitag", days: [1,2,3,4,5], from: "11:00", to: "21:00" }, … ]  // 0 = Sonntag
   ```
5. **Gerichtnummern wie auf der Karte im Laden** (`SHOP.numbers = true`). Gerichte ohne Nummer auf der Karte (Menüs, Getränke) bekommen intern 100+ und werden ohne Nummer angezeigt (`showNr = nr < 100`). Nummer erscheint auch im Warenkorb und im Bestelltext.
6. **Sprung zu Kategorien richtig am Handy**: Abstand wird aus Kopfzeile + Kategorie-Leiste gemessen (`measure()` setzt `scroll-padding-top`). Vorher verschwanden Überschriften unter der Leiste.
7. **Kompakte Karten** (Gericht ohne Beschreibung) nur am Handy, am Computer bleiben alle Karten gleich hoch.
8. **Fotostreifen** in einer Kategorie (`photos: true` bei der Kategorie, Bilder in `PHOTOS`).
9. **Strukturierte Daten** (`application/ld+json`, Typ Restaurant) + eigenes Vorschaubild `img/og-image.png` (1200×630, mit Playwright aus HTML erzeugt).
10. **Mindestbestellwert wahlweise mit/ohne Getränke** (`SHOP.minOhneGetraenke`).
11. **Bestellung per WhatsApp/E-Mail** heißt jetzt `orderWhatsapp` / `orderEmail`; Kontakt-Mail getrennt in `email`. Sind beide leer: Button heißt „Bestellübersicht anzeigen“ und der Kunde ruft an.
12. **Vorschau nicht bei Google**: `<meta name="robots" content="noindex, nofollow">` in der Vorschau – **beim Umzug auf die echte Domain entfernen**.
13. **Warenkorb-Speicher-Schlüssel hochzählen**, wenn sich Nummern ändern (Kochy's: `kochys-cart2`), sonst landen alte Gerichte im Warenkorb. Bei jeder Änderung `sw.js`-Cache-Version hochzählen.

---

## 3. Neues Speisekarten-Format (`menu.js`)

Kochy's braucht Pflicht-Auswahlen (Fleisch, Beilage, Dressing, Dip, Getränk im Menü) und Extras pro Kategorie. Das Format ist allgemeiner als das alte O-la-la-Format und sollte für O la la übernommen werden:

```js
window.SIZES = { pizza: ["Klein Ø 24 cm","Groß Ø 29 cm","Family Ø 41 cm"], drink: ["0,33 l","1,0 l"] };
window.SIZE_TITLE = { pizza: "Größe wählen" };

window.GROUPS = {
  dressing: { label: "Dressing", one: ["Cocktail-Dressing", "Joghurt-Dressing", "Essig & Öl"] },   // Pflicht, 1 Auswahl
  exPasta:  { label: "Extras",   many: [["ueber", "Mit Käse überbacken", 2.00]] }                   // optional, mit Aufpreis
};

window.MENU = [
  { id: "salate", name: "Salate", icon: "🥗", groups: ["dressing"], items: [
    [61, "Mista", "", "grüner Salat, Tomaten …", 6.50, "v"],
    [62, "Capricciosa", "A,C,G", "…", 10.00, "", { groups: ["dressing"] }]   // 7. Feld = eigene Optionen
  ]}
];
```
- `sizes` (Kategorie oder Gericht) = Varianten mit eigenem Preis → Chips direkt am Gericht.
- `groups` mit `one` = Pflichtauswahl → Tippen öffnet das Auswahlfenster.
- `groups` mit `many` = Extras mit Aufpreis.
- **Für O la la anpassen:** Pizza-Extras haben **Preise je Größe** (`[2.00, 3.00, 5.00]`). Dafür `many`-Einträge erweitern: Preis darf eine Liste sein → `unitPrice()` nimmt `preis[l.s]`, `null` = „nicht möglich“ (so wie im alten O-la-la-Code). Das ist die einzige Code-Erweiterung, die O la la braucht.

---

## 4. Das Dashboard (für O la la genauso bauen)

### Was es kann (Kochy's-Stand)
- **Bestellungen**: Spalten *Neu → In Zubereitung → Unterwegs/abholbereit*, darunter „Erledigt heute“. Pro Bestellung: Uhrzeit, „vor X Min.“, Lieferung/Abholung, bar/bezahlt, Kunde (Telefon antippbar), Adresse, Gerichte mit Auswahl, Anmerkung, Summe.
- **Automatik (Standard: an)**: Jede Bestellung wird sofort mit Standardzeit angenommen (Lieferung 45 Min., Abholung 20 Min.), Bon wird gedruckt, Status schaltet **von selbst** weiter. Ein Tipp „**Viel los? +15 Min.**“ verlängert alle neuen Zeiten. Ausschaltbar → dann „Annehmen“ mit Zeitwahl (20/30/45 Min.) wie bei Lieferando.
  *Grund:* Ayman/Chef wollen nicht bei jeder Bestellung klicken.
- **Mitteilungen im Apple-Stil** (Aymans Wahl):
  - Handy = **iPhone-Mitteilung** von oben: Milchglas (`backdrop-filter: saturate(180%) blur(22px)`), Feder-Animation (`cubic-bezier(.2,1.25,.35,1)`), App-Symbol, „jetzt“, verschwindet nach 5 s, **Wisch nach oben** schließt.
  - Computer = **Mac-Mitteilung** oben rechts, gleitet von rechts herein, **bis zu 3 gestapelt**, bleibt stehen solange die Maus darüber ist, × oben links beim Darüberfahren.
  - Antippen → springt zur Bestellung und hebt sie kurz hervor. Dazu ein Ton (Web Audio, an/aus-Schalter).
  - **Nicht** mehr: schwarze Leiste mit Button (gefiel Ayman nicht).
- **Bon-Vorschau** (80-mm-Bon, druckbar) und **Telegram-Nachricht-Vorschau** pro Bestellung.
- **Umsatz**: Heute / 7 Tage / 30 Tage / 12 Monate; Kennzahlen mit Vergleich („▲ 5 % gegenüber Dienstag letzter Woche“), Balkendiagramm mit Tooltip + „Als Tabelle anzeigen“, beliebteste Gerichte, Stoßzeiten, Liefergebiete, Zahlungsarten, **Excel-Export (CSV, Semikolon, UTF-8)**.
  - Diagrammfarbe vorher mit dem Dataviz-Validator prüfen (Kochy's: `#d4732a`; Markenbraun fiel durch). Für O la la Rot prüfen lassen.
  - Diagramm in **echter Pixelbreite** zeichnen (`el.clientWidth`), sonst wird die Schrift riesig.
- **Einstellungen**: Tagesgericht/Tagessuppe, Automatik + Zeiten, Viel los, Bestellungen pausieren, Lieferung an/aus, **Gericht „ausverkauft“** per Schalter.
- **Beispieldaten**: 12 Monate, erzeugt im Browser aus `menu.js` (fester Zufall pro Tag → immer gleich), Wochentags- und Uhrzeit-Verteilung, wachsender Umsatz, ein paar offene Bestellungen zu jeder Uhrzeit, jede Minute eine neue Beispiel-Bestellung (max. 8).
  - Ausgedachte Namen nur „Vorname + Initial“, **Telefonnummern gekürzt** („0176 ••• 42“) – zufällige Nummern könnten echten Leuten gehören.
  - Deutlich „DEMO · Beispieldaten“ kennzeichnen, `noindex`.
- **Test-Brücke** Website → Dashboard (nur Vorschau): `SHOP.demoDashboard = true` legt abgeschickte Bestellungen in `localStorage` (`…-demo-orders`), das Dashboard im selben Browser zeigt sie sofort an. Für echte Kunden **aus** lassen.

### Auf O la la übertragen – Checkliste
1. `dashboard-demo/` aus Kochy's kopieren.
2. Oben im Script anpassen: `AREAS` (O-la-la-Liefergebiete + PLZ + Mindestwerte), `HOURS`/Öffnungszeiten, `WEEKDAY`, Gewichte `W_FOOD`/`W_DRINK`/`W_DIP` mit **O-la-la-Nummern** (Pizza häufig, Größe „Groß“ am häufigsten), Durchschnittsbon (Pizzeria eher höher).
3. Farben in `:root` (O-la-la-Rot statt Braun/Orange), Logo, Icon, Bon-Kopf (Name, Adresse, Telefon), Telegram-Name.
4. Speicher-Schlüssel umbenennen: `kochys-demo-*` → `olala-demo-*`.
5. Sobald O la la das neue `menu.js`-Format hat (Abschnitt 3), funktioniert `makeLine()` mit Größen und Extras automatisch – Extras mit Preis je Größe berücksichtigen.
6. Vergleichsseite der Mitteilungen nur bei Bedarf; Entscheidung steht schon (iPhone + Mac).
7. Mit Playwright testen: Handy 390×844, Computer 1440×900, kein seitliches Scrollen, keine JS-Fehler, Screenshot jeder Ansicht.

---

## 5. Wie es „echt“ funktionieren würde (Plan)

```
Kunde bestellt auf der Website
   → Bestell-Programm bei Cloudflare (Worker): rechnet Preise nach, setzt Uhrzeit + Nummer
   → Datenbank (Cloudflare D1, Speicherort EU fest einstellen)
   → Laden-Handy (Telegram, Ton) + Bondrucker (Epson TM-m30III, WLAN/LAN, Phase 3)
   → Dashboard unter domain.de/admin
```
- **Anmeldung**: Cloudflare Access mit **Einmal-Code per E-Mail** – kein Passwort, kein extra Konto. Nur freigegebene Adressen bekommen einen Code (gilt 10 Min., nur einmal). Fremde sehen das Dashboard nie.
- **Echtheit**: Kunde kann nicht in die Datenbank schreiben; Preise, Uhrzeit, Nummer setzt das Programm; Bestellungen nur stornieren (mit Grund), nicht löschen; jede Änderung wird protokolliert.
- **Konten**: Phase 1–2 nur **Cloudflare** (Inhaber, Laden-Mail, 2FA, lädt Ayman ein) + Telegram auf dem Laden-Handy. Phase 3: Stripe, PayPal-Geschäftskonto (Inhaber, Ausweis/Bank). Geheime Schlüssel trägt der Inhaber selbst ein, nie per Chat.
- **Kosten** (Stand Okt. 2026): Cloudflare 0 € (D1: 5 GB, 100.000 Schreibvorgänge/Tag; Access bis 50 Nutzer), Telegram 0 €, Bondrucker ca. 276 € einmalig, Stripe 1,5 % + 0,25 € (EU-Standardkarte), PayPal 2,99 % + 0,39 €. Vergleich Lieferando laut Branchenberichten 14 % (eigene Lieferung) bzw. 30 % (mit Lieferando-Fahrern).
- **Phasen**: 1) Domain zu Cloudflare (E-Mail-Einträge/MX übernehmen!) + Website live · 2) Bestellungen speichern + Telegram + Dashboard + Testwoche · 3) Online-Zahlung + Bondrucker (freiwillig).

---

## 6. Die wichtigste Lektion: **erst nach dem Kassensystem fragen!**

Bei Kochy's hat der Chef das Dashboard abgelehnt: Er arbeitet mit **WinOrder** (Kassen- und Bestellsoftware für Lieferdienste von PixelPlanet, Bremen). Dort laufen Kasse (TSE), Bons, Kunden, Statistik **und Lieferando-Bestellungen automatisch** zusammen.
- Ein eigenes Dashboard hieße: jede Website-Bestellung **von Hand nachbonieren** (= in die Kasse eintippen, damit Bon und Umsatz in der Kasse sind) → doppelte Arbeit.
- **Lösung**: Website-Bestellungen **direkt in das Kassensystem** schicken (wie Lieferando). WinOrder hat einen Online-Shop-Einrichtungsassistenten; welche Schnittstelle für einen eigenen Shop gilt und was sie kostet, beim **WinOrder-Support** erfragen. Dann ist das Kassensystem das Dashboard.

**Für O la la deshalb zuerst klären:**
1. Welches Kassensystem nutzt der Inhaber? (WinOrder, orderbird, Gastrofix, Vectron, keins …)
2. Kommen Lieferando-Bestellungen dort automatisch an?
3. Hat das System eine Schnittstelle für einen eigenen Webshop? Kosten?
4. Erst wenn **kein** passendes Kassensystem da ist oder der Inhaber es ausdrücklich will → eigenes Dashboard (Abschnitt 4/5).

---

## 7. Rechtliches – Checkliste (keine Rechtsberatung)

| Punkt | Was zu tun ist |
|---|---|
| **Allergene + Zusatzstoffe** | Müssen bei Telefon-/Online-Bestellung **vor** der Bestellung sichtbar sein, nicht erst bei Lieferung. „Bitte nachfragen“ reicht online kaum. Zusatzstoffe („mit Farbstoff“, „mit Konservierungsstoff“ …) genauso. O la la hat sie schon in `menu.js` – Liste trotzdem mit der Karte im Laden abgleichen. |
| **Bezeichnungen** | Muss stimmen, was draufsteht (bei Kochy's: „Döner“ nur bis 60 % Hackfleisch, sonst „Hackfleischdrehspieß“; bei O la la z. B. „Formfleisch-Truthahnschinken“ korrekt). |
| **Pfand** | Neben dem Preis angeben, nicht einrechnen: „2,50 € zzgl. 0,25 € Pfand“ (§ 7 PAngV). Literpreis bei Flaschen prüfen. |
| **Preise überall gleich** | Alte Website, Lieferando, neue Seite, Flyer: widersprüchliche Preise vermeiden; alte Seiten mit Platzhaltern schnell ersetzen. |
| **Impressum** | Echter Inhaber, Rechtsform, USt-ID vollständig. Vom Inhaber bestätigen lassen. |
| **Datenschutz** | Texte aus alten Seiten stammen oft von Rechtstext-Anbietern (Lizenz nur für die Seite) → vor dem Start neu erzeugen lassen (eRecht24, IT-Recht-Kanzlei, Händlerbund). Muss Hosting, Karte, Schriften, Bestellweg korrekt nennen. |
| **GitHub Pages** | Laut GitHub **nicht** für Online-Geschäfte erlaubt → nur Vorschau, mit `noindex`. Echte Seite auf Cloudflare Pages. |
| **Kasse / Finanzamt** | Webshop selbst braucht keine TSE (keine Barzahlung vor Ort). **Barzahlungen bei Lieferung/Abholung gehören in die Kasse mit TSE**; Online-Zahlungen über Stripe/PayPal-Abrechnungen. Dashboard = Überblick, nicht die offizielle Aufzeichnung. Details: Steuerberater. |
| **Barrierefreiheit (BFSG)** | Gilt für Online-Bestelldienste; Kleinstunternehmen (< 10 Mitarbeiter, ≤ 2 Mio. € Umsatz) sind bei Dienstleistungen ausgenommen. |
| **Echte Online-Bestellung (später)** | Button „Zahlungspflichtig bestellen“, Bestellbedingungen, Pflichtangaben. |
| **Demo-Daten** | Ausgedacht, gekennzeichnet, keine vollständigen Telefonnummern. |

---

## 8. Arbeitsweise mit Ayman (ergänzt)

- Ayman kennt sich mit Technik (Konten, Hosting, Server) **nicht** aus → jede Einrichtung als **Schritt-für-Schritt-Anleitung mit genauen Klicks**, wer was macht, was es kostet.
- Bei Design-Fragen **mehrere Varianten als Live-Seite** bauen (z. B. 3 Animationen im iPhone-Rahmen, in Schleife) und wählen lassen; Standbilder als Screenshot mitschicken.
- Geschmack: **Apple-Stil** bei Animationen und Meldungen (weich, federnd, Milchglas, System-Schrift), keine dunklen „KI-Toasts“.
- Fragen wie „muss ich immer klicken?“ ernst nehmen: Abläufe so bauen, dass im Laden **möglichst wenig getippt** werden muss (Automatik, ein Tipp für „Viel los“).
- Vor großen Schritten den **Chef/Inhaber** einbeziehen – er entscheidet über Kasse, Abläufe, Preise.
- Am Ende jeder Arbeit: live prüfen (Playwright, Handy + Computer), Screenshots schicken, `UEBERGABE.md` im Repo aktualisieren.

---

## 9. Startnachricht für den O-la-la-Chat (zum Kopieren)

> Hier die Übertrag-Datei von Kochy's (Anhang). Bitte häng die Repos **aymanoul/pizzeria-o-la-la** (Zugriff push) und **aymanoul/kochys** (nur lesen) an und lies beide `UEBERGABE.md`. Dann:
> 1. die Website-Verbesserungen aus Abschnitt 2 auf O la la übertragen,
> 2. `menu.js` auf das neue Format umstellen (Extras mit Preis je Größe),
> 3. das Dashboard wie bei Kochy's als Demo unter `/dashboard-demo/` bauen – in O-la-la-Farben, mit iPhone-/Mac-Mitteilungen und Automatik,
> 4. mir die offenen Fragen zum Kassensystem (Abschnitt 6) und zur Rechts-Checkliste (Abschnitt 7) als kurze Liste geben.
> Zeig mir Screenshots von Handy und Computer.
