/* =========================================================
   SPEISEKARTE – Kochy's (Ratingen)
   Gerichte und Preise NUR hier ändern. Seite, Suche und Warenkorb passen sich an.

   Format pro Gericht:
     [Nr, "Name", "Allergene/Zusatzstoffe", "Beschreibung", Preis, "Tags", {Optionen}]
   - Nr: fortlaufend (1, 2, 3 …). Wird nur angezeigt, wenn SHOP.numbers = true (index.html).
   - Preis: eine Zahl (z. B. 7.90) oder eine Liste [Preis1, Preis2, …] für Varianten.
     Die Varianten-Namen kommen aus SIZES (bei der Kategorie oder beim Gericht unter "sizes").
   - Allergene: z. B. "a,c,1" – wird hochgestellt angezeigt. Leer lassen, solange nicht bestätigt.
   - Tags (mit Leerzeichen trennen): v = vegetarisch, s = scharf, h = Haus-Tipp, n = neu
   - Optionen (optional): { sizes: "fleisch", groups: ["beilage", "exDoener"] }
     Ohne Angabe gelten "sizes" und "groups" der Kategorie.
   ========================================================= */

/* Varianten mit eigenem Preis */
window.SIZES = {
  fleisch: ["Hähnchen", "Kalb"],
  stueck:  ["3 Stück", "6 Stück"],
  nuggets: ["6 Stück", "10 Stück", "20 Stück"]
};
window.SIZE_TITLE = { fleisch: "Fleisch wählen", stueck: "Menge wählen", nuggets: "Menge wählen" };

/* Auswahl-Gruppen
   one:  genau eine Auswahl (ohne Aufpreis), die erste ist vorausgewählt
   many: beliebig viele Extras mit Aufpreis [id, Name, Preis] */
window.GROUPS = {
  beilage:  { label: "Beilage", one: ["Pommes", "Reis"] },
  dressing: { label: "Dressing", one: ["Joghurt-Dressing", "French-Dressing", "Honig-Senf-Dressing", "Balsamico-Dressing", "Essig & Öl"] },
  dip:      { label: "Dip", one: ["Ketchup", "Mayo", "Joppie", "Süßsauer"] },
  fleisch:  { label: "Fleisch", one: ["Hähnchen", "Kalb"] },
  burger:   { label: "Burger", one: ["Classic Burger", "Cheeseburger", "Chili-Cheeseburger", "Crispy-Chickenburger"] },
  getraenk: { label: "Getränk", one: ["fritz-kola", "fritz-kola superzero", "fritz-limo orange", "Elephant Bay Granatapfel", "Elephant Bay Kirsche", "Elephant Bay Zitrone", "Elephant Bay Pfirsich", "Gazoz", "Ayran", "Wasser"] },
  eistee:   { label: "Sorte", one: ["Granatapfel", "Kirsche", "Zitrone", "Pfirsich"] },
  redbull:  { label: "Sorte", one: ["Red Bull", "Red Bull Zero"] },
  exDoener: { label: "Extras", many: [["fl", "Extra Fleisch", 1.00], ["hk", "Extra Hirtenkäse", 0.50]] },
  exHirt:   { label: "Extras", many: [["hk", "Extra Hirtenkäse", 0.50]] },
  exSalat:  { label: "Extras", many: [["ha", "Extra Hähnchen", 3.00], ["ga", "Extra Gamberetti", 4.00]] },
  exPasta:  { label: "Extras", many: [["pa", "Parmesan", 1.50], ["ha", "Extra Hähnchen", 3.00], ["ga", "Extra Gamberetti", 4.00]] },
  exBurger: { label: "Extras", many: [["dp", "Doppelpatty", 3.00], ["se", "Spiegelei", 1.50], ["hb", "Halal-Bacon", 2.00]] }
};

window.MENU = [
  { id: "doener", name: "Döner", icon: "🥙", sizes: "fleisch", groups: ["exDoener"],
    hint: "z. B. welche Sauce, ohne Zwiebeln, extra scharf",
    note: "Mit Eisbergsalat, Krautsalat, Zwiebeln, Tomaten, Gurken und Berliner Sauce nach Wahl. Wahlweise mit Hähnchen- oder Kalbfleisch.", items: [
    [1,  "Kebabtasche", "", "mit Salat und Sauce nach Wahl", [7.60, 8.50], ""],
    [2,  "Dürüm", "", "selbstgemachter Dürüm mit Salat und Sauce nach Wahl", [8.50, 8.90], ""],
    [3,  "Kebabteller", "", "mit Reis oder Pommes und Salat", [13.90, 14.50], "", { groups: ["beilage", "exDoener"] }],
    [4,  "Kochy's-Box", "", "mit Reis oder Pommes", [7.90, 8.50], "h", { groups: ["beilage", "exDoener"] }],
    [5,  "Kochy's-Fleischbox", "", "nur Fleisch", [11.90, 13.90], ""],
    [6,  "Türkische Kebabpizza", "", "mit Fleisch, Salat und Sauce nach Wahl", [8.90, 9.50], "h"],
    [7,  "Türkische Pizza Classic", "", "", 4.90, "", { groups: ["exHirt"] }],
    [8,  "Türkische Pizza", "", "mit Salat und Sauce nach Wahl", 5.90, "", { groups: ["exHirt"] }],
    [9,  "Falafeltasche", "", "mit Salat und Sauce nach Wahl", 7.90, "v", { groups: ["exHirt"] }],
    [10, "Falafel-Dürüm", "", "mit Salat und Sauce nach Wahl", 8.50, "v", { groups: ["exHirt"] }],
    [11, "Falafelteller", "", "mit Reis oder Pommes und Salat", 12.90, "v", { groups: ["beilage", "exHirt"] }],
    [12, "Hähnchen-Gemüse-Pfanne", "", "Hähnchenfilet mit Brokkoli, Paprika und Champignons, dazu Reis", 13.90, "", { groups: [] }]
  ]},
  { id: "menues", name: "Menüs", icon: "🍱", items: [
    [13, "Kochy's Menü", "", "Kebabtasche, Pommes und Getränk nach Wahl", 14.90, "", { groups: ["fleisch", "getraenk"] }],
    [14, "Dürüm Menü", "", "Dürüm, Pommes und Getränk nach Wahl", 15.50, "", { groups: ["fleisch", "getraenk"] }],
    [15, "Burger Menü", "", "Burger nach Wahl, Pommes und Getränk nach Wahl", 15.50, "", { groups: ["burger", "getraenk"] }],
    [16, "Tagesmenü", "", "Tagesgericht, Tagessuppe und Getränk nach Wahl", 19.90, "", { groups: ["getraenk"] }],
    [17, "Kids Menü", "", "4 Chicken Nuggets, Pommes und Capri-Sun", 6.90, ""]
  ]},
  { id: "tageskarte", name: "Tageskarte", icon: "🍲", photos: true,
    note: "Täglich wechselnd und frisch gekocht. Was es heute gibt, zeigen wir jeden Tag auf Instagram – oder ruf einfach kurz an.", items: [
    [18, "Tagessuppe", "", "hausgemacht, täglich wechselnd", 4.90, ""],
    [19, "Tagesgericht", "", "täglich wechselnd", 13.90, ""]
  ]},
  { id: "burger", name: "Burger", icon: "🍔", groups: ["exBurger"],
    note: "Alle Burger mit Rindfleisch-Patty, Crispy-Chickenburger mit knusprigem Hähnchen.", items: [
    [20, "Classic Burger", "", "mit Tomaten, Zwiebeln, Salat und Gurken", 8.50, ""],
    [21, "Cheeseburger", "", "mit Cheddar, Tomaten, Zwiebeln, Salat und Gurken", 8.90, ""],
    [22, "Chili-Cheeseburger", "", "mit Chili-Cheese-Sauce, Jalapeños, Cheddar, Salat und Zwiebeln", 8.90, "s"],
    [23, "Crispy-Chickenburger", "", "mit Cheddar, Tomaten, Zwiebeln, Salat und Gurken", 8.90, ""]
  ]},
  { id: "pasta", name: "Pasta", icon: "🍝", groups: ["exPasta"],
    note: "Mit Tortiglioni. Auf Wunsch mit Parmesan, extra Hähnchen oder extra Gamberetti.", items: [
    [24, "Pasta Kochy's", "", "mit Hähnchenbrust, Paprika und Champignons in Tomatensahnesauce", 10.90, "h"],
    [25, "Pasta Arrabbiata", "", "mit Zwiebeln und Peperoni in scharfer Tomatensauce", 9.90, "v s"],
    [26, "Pasta al Funghi", "", "mit frischen Champignons in cremiger Sahnesauce", 9.90, "v"],
    [27, "Pasta Gamberetti", "", "mit Garnelen und Champignons in cremiger Sahnesauce", 11.90, ""],
    [28, "Pasta Curry", "", "mit Hähnchenbrust, Paprika und Champignons in Curry-Sahnesauce", 10.90, ""]
  ]},
  { id: "schnitzel", name: "Schnitzel", icon: "🍽️", groups: ["beilage"],
    note: "Alle Schnitzel mit Reis oder Pommes.", items: [
    [29, "Schnitzel Classic", "", "", 13.50, ""],
    [30, "Jägerschnitzel", "", "mit Champignon-Rahmsauce", 13.90, ""],
    [31, "Schnitzel à la Hollandaise", "", "mit Sauce Hollandaise", 13.90, ""]
  ]},
  { id: "salate", name: "Salate", icon: "🥗", groups: ["dressing", "exSalat"],
    note: "Gemischter Salat mit Dressing nach Wahl. Auf Wunsch mit extra Hähnchen oder extra Gamberetti.", items: [
    [32, "Salat Mista", "", "gemischter Salat mit Mais, Tomaten und Gurken", 7.50, "v"],
    [33, "Kochy's Salat", "", "gemischter Salat mit Hähnchenbrust und Champignons", 10.90, ""],
    [34, "Sweet-Chili-Salat", "", "gemischter Salat mit Hähnchenbrust in Sweet-Chili-Sauce", 10.90, ""],
    [35, "Gamberetti-Salat", "", "gemischter Salat mit Garnelen", 11.90, ""],
    [36, "Ziegenkäse-Salat", "", "gemischter Salat mit gratiniertem Ziegenkäse und Honig", 11.90, "v"]
  ]},
  { id: "snacks", name: "Snacks", icon: "🍟", groups: ["dip"],
    note: "Mit einem Dip nach Wahl: Ketchup, Mayo, Joppie oder Süßsauer.", items: [
    [37, "Pommes", "", "", 4.90, "v"],
    [38, "Chicken Nuggets", "", "", [4.90, 7.90, 13.90], "", { sizes: "nuggets" }],
    [39, "Chicken Nuggets mit Pommes", "", "6 Stück", 8.50, ""],
    [40, "Chicken Stripes", "", "", [4.90, 6.90], "", { sizes: "stueck" }],
    [41, "Mozzarella Sticks", "", "", [4.90, 6.90], "v", { sizes: "stueck" }],
    [42, "Geflügel-Bratwurst mit Pommes", "", "", 7.90, ""],
    [43, "Geflügel-Currywurst mit Pommes", "", "", 8.50, ""]
  ]},
  { id: "desserts", name: "Desserts", icon: "🍰", items: [
    [44, "Käsekuchen", "", "cremig", 5.00, "v"],
    [45, "Himbeer-Quarkschnitte", "", "fruchtig", 5.00, "v"]
  ]},
  { id: "dips", name: "Dips & Saucen", icon: "🥣", items: [
    [46, "Ketchup", "", "", 0.50, ""],
    [47, "Mayo", "", "", 0.50, ""],
    [48, "Joppie", "", "", 1.00, ""],
    [49, "Süßsauer", "", "", 1.00, ""],
    [50, "Cacik", "", "türkisches Tzatziki", 1.50, ""],
    [51, "Cocktail", "", "nach Berliner Art", 1.50, ""],
    [52, "Scharf", "", "pikante Sauce", 1.50, "s"]
  ]},
  { id: "getraenke", name: "Getränke", icon: "🥤", drinks: true, items: [
    [53, "fritz-kola®", "", "0,33 l · Erhöhter Koffeingehalt. Für Kinder und schwangere oder stillende Frauen nicht empfohlen (25 mg/100 ml).", 2.80, ""],
    [54, "fritz-kola® superzero", "", "0,33 l · Erhöhter Koffeingehalt. Für Kinder und schwangere oder stillende Frauen nicht empfohlen (25 mg/100 ml).", 2.80, ""],
    [55, "fritz-limo® orange", "", "0,33 l", 2.80, ""],
    [56, "Elephant Bay Eistee", "", "0,33 l · Granatapfel, Kirsche, Zitrone oder Pfirsich", 2.80, "", { groups: ["eistee"] }],
    [57, "Gazoz", "", "0,33 l", 2.80, ""],
    [58, "Ayran", "", "", 1.50, ""],
    [59, "Wasser", "", "", 1.50, ""],
    [60, "Capri-Sun", "", "0,2 l", 1.50, ""],
    [61, "Red Bull", "", "0,25 l · Erhöhter Koffeingehalt. Für Kinder und schwangere oder stillende Frauen nicht empfohlen (32 mg/100 ml).", 3.50, "", { groups: ["redbull"] }],
    [62, "Sinalco 1 l", "", "verschiedene Sorten · nur bei Lieferung", 3.50, ""]
  ]}
];
