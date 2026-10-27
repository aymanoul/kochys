/* =========================================================
   SPEISEKARTE – Kochy's (Ratingen)
   Gerichte und Preise NUR hier ändern. Seite, Suche und Warenkorb passen sich an.

   Format pro Gericht:
     [Nr, "Name", "Allergene/Zusatzstoffe", "Beschreibung", Preis, "Tags", {Optionen}]
   - Nr: wie auf der Karte im Laden (1–42). Gerichte ohne Nummer auf der Karte bekommen 100+ (werden ohne Nummer angezeigt).
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
  exDoener: { label: "Extras", many: [["fl", "Extra Fleisch", 1.00], ["hk", "Extra Hirtenkäse", 0.50]] },
  exHirt:   { label: "Extras", many: [["hk", "Extra Hirtenkäse", 0.50]] },
  exSalat:  { label: "Extras", many: [["ha", "Extra Hähnchen", 3.00], ["ga", "Extra Gamberetti", 4.00]] },
  exPasta:  { label: "Extras", many: [["pa", "Parmesan", 1.50], ["ha", "Extra Hähnchen", 3.00], ["ga", "Extra Gamberetti", 4.00]] },
  exWurst:  { label: "Extras", many: [["ew", "Extra Wurst", 3.00]] },
  exBurger: { label: "Extras", many: [["dp", "Doppelpatty", 3.00], ["se", "Spiegelei", 1.50], ["hb", "Halal-Bacon", 2.00]] }
};

window.MENU = [
  { id: "doener", name: "Döner", icon: "🥙", sizes: "fleisch", groups: ["exDoener"],
    hint: "z. B. welche Sauce, ohne Zwiebeln, extra scharf",
    note: "Mit Eisbergsalat, Krautsalat, Zwiebeln, Tomaten, Gurken und Berliner Sauce nach Wahl. Wahlweise mit Hähnchen- oder Kalbfleisch. Make it big: Extra Fleisch + 1,00 €.", items: [
    [1,  "Kebabtasche", "", "mit Salat und Sauce nach Wahl", [7.90, 8.50], ""],
    [2,  "Dürüm", "", "selbstgemachter Dürüm mit Salat und Sauce nach Wahl", [8.50, 8.90], ""],
    [3,  "Kebabteller", "", "mit Reis oder Pommes und Salat", [13.90, 14.50], "", { groups: ["beilage", "exDoener"] }],
    [4,  "Kochy's-Box", "", "mit Reis oder Pommes", [7.90, 8.50], "h", { groups: ["beilage", "exDoener"] }],
    [5,  "Kochy's-Fleischbox", "", "nur Fleisch", [11.90, 13.90], ""],
    [6,  "Türkische Kebabpizza", "", "mit Fleisch, Salat und Sauce nach Wahl", [8.90, 9.50], "h"],
    [7,  "Türkische Pizza", "", "mit Salat und Sauce nach Wahl", 5.90, "", { groups: ["exHirt"] }],
    [8,  "Türkische Pizza Classic", "", "", 4.90, "", { groups: ["exHirt"] }],
    [9,  "Falafeltasche", "", "mit Salat und Sauce nach Wahl", 7.90, "v", { groups: ["exHirt"] }],
    [10, "Falafel-Dürüm", "", "mit Salat und Sauce nach Wahl", 8.50, "v", { groups: ["exHirt"] }],
    [11, "Falafelteller", "", "mit Reis oder Pommes und Salat", 12.90, "v", { groups: ["beilage", "exHirt"] }]
  ]},
  { id: "menues", name: "Menüs", icon: "🍱", items: [
    [101, "Kochy's Menü", "", "Kebabtasche, Pommes und Getränk nach Wahl", 14.90, "", { groups: ["fleisch", "getraenk"] }],
    [102, "Dürüm Menü", "", "Dürüm, Pommes und Getränk nach Wahl", 15.50, "", { groups: ["fleisch", "getraenk"] }],
    [103, "Burger Menü", "", "Burger nach Wahl, Pommes und Getränk nach Wahl", 15.50, "", { groups: ["burger", "getraenk"] }],
    [104, "Tagesmenü", "", "Tagesgericht, Tagessuppe und Getränk nach Wahl", 19.90, "", { groups: ["getraenk"] }],
    [105, "Kids Menü", "", "4 Chicken Nuggets, kleine Pommes und Capri-Sun", 6.90, ""]
  ]},
  { id: "tageskarte", name: "Tageskarte", icon: "🍲", photos: true,
    note: "Täglich wechselnd und frisch gekocht. Was es heute gibt, zeigen wir jeden Tag auf Instagram – oder ruf einfach kurz an.", items: [
    [106, "Tagessuppe", "", "hausgemacht, täglich wechselnd", 4.90, ""],
    [107, "Tagesgericht", "", "täglich wechselnd", 13.90, ""]
  ]},
  { id: "burger", name: "Burger", icon: "🍔", groups: ["exBurger"],
    note: "Alle Burger mit Rindfleisch-Patty, Crispy-Chickenburger mit knusprigem Hähnchen. Auf Wunsch mit Doppelpatty, Spiegelei oder Halal-Bacon.", items: [
    [17, "Classic Burger", "", "mit Tomaten, Zwiebeln, Salat und Gurken", 8.50, ""],
    [18, "Cheeseburger", "", "mit Cheddar, Tomaten, Zwiebeln, Salat und Gurken", 8.90, ""],
    [19, "Chili-Cheeseburger", "", "mit Chili-Cheese-Sauce, Jalapeños, Cheddar, Salat und Zwiebeln", 8.90, "s"],
    [20, "Crispy-Chickenburger", "", "mit Cheddar, Tomaten, Zwiebeln, Salat und Gurken", 8.90, ""]
  ]},
  { id: "pasta", name: "Pasta", icon: "🍝", groups: ["exPasta"],
    note: "Mit Tortiglioni. Auf Wunsch mit Parmesan, extra Hähnchen oder extra Gamberetti.", items: [
    [12, "Pasta Kochy's", "", "mit Paprika, Champignons und Hähnchenbrust in Tomatensahnesauce", 10.90, "h"],
    [13, "Pasta Arrabbiata", "", "mit Zwiebeln und Peperoni in scharfer Tomatensauce", 9.90, "v s"],
    [14, "Pasta al Funghi", "", "mit frischen Champignons in cremiger Sahnesauce", 9.90, "v"],
    [15, "Pasta Gamberetti", "", "mit Garnelen und Champignons in cremiger Sahnesauce", 11.90, ""],
    [16, "Pasta Curry", "", "mit Paprika, Champignons und Hähnchenbrust in Curry-Sahnesauce", 10.90, ""]
  ]},
  { id: "schnitzel", name: "Schnitzel", icon: "🍽️", groups: ["beilage"],
    note: "Alle Schnitzel mit Reis oder Pommes.", items: [
    [21, "Schnitzel Classic", "", "", 13.50, ""],
    [22, "Jägerschnitzel", "", "mit Champignon-Rahmsauce", 13.90, ""],
    [23, "Schnitzel à la Hollandaise", "", "mit Sauce Hollandaise", 13.90, ""]
  ]},
  { id: "salate", name: "Salate", icon: "🥗", groups: ["dressing", "exSalat"],
    note: "Gemischter Salat mit Dressing nach Wahl. Auf Wunsch mit extra Hähnchen oder extra Gamberetti.", items: [
    [38, "Salat Mista", "", "gemischter Salat", 7.50, "v"],
    [39, "Gamberetti-Salat", "", "gemischter Salat mit Garnelen", 11.90, ""],
    [40, "Sweet-Chili-Salat", "", "Hähnchenbrust mit Sweet-Chili-Sauce auf gemischtem Salat", 10.90, ""],
    [41, "Kochy's Salat", "", "Hähnchenbrust und Champignons auf gemischtem Salat", 10.90, ""],
    [42, "Ziegenkäse-Salat", "", "Ziegenkäse gratiniert mit Honig auf gemischtem Salat", 11.90, "v"]
  ]},
  { id: "snacks", name: "Snacks", icon: "🍟", groups: ["dip"],
    note: "Mit einem Dip nach Wahl: Ketchup, Mayo, Joppie oder Süßsauer.", items: [
    [24, "Pommes", "", "", 4.90, "v"],
    [25, "Chicken Nuggets", "", "", [4.90, 7.90, 13.90], "", { sizes: "nuggets" }],
    [26, "Chicken Nuggets mit Pommes", "", "6 Stück", 8.50, ""],
    [27, "Bratwurst mit Pommes", "", "Geflügel-Bratwurst", 7.90, "", { groups: ["dip", "exWurst"] }],
    [28, "Currywurst mit Pommes", "", "Geflügel-Currywurst", 8.50, "", { groups: ["dip", "exWurst"] }],
    [29, "Chicken Stripes", "", "", [4.90, 6.90], "", { sizes: "stueck" }],
    [30, "Mozzarella Sticks", "", "", [4.90, 6.90], "v", { sizes: "stueck" }]
  ]},
  { id: "dips", name: "Dips & Saucen", icon: "🥣", items: [
    [31, "Ketchup", "", "", 0.50, ""],
    [32, "Mayo", "", "", 0.50, ""],
    [33, "Joppie", "", "", 1.00, ""],
    [34, "Süßsauer", "", "", 1.00, ""],
    [35, "Cacik", "", "türkisches Tzatziki", 1.50, ""],
    [36, "Cocktail", "", "nach Berliner Art", 1.50, ""],
    [37, "Scharf", "", "pikante Sauce", 1.50, "s"]
  ]},
  { id: "getraenke", name: "Getränke", icon: "🥤", drinks: true, items: [
    [108, "fritz-kola®", "", "0,33 l · Erhöhter Koffeingehalt. Für Kinder und schwangere oder stillende Frauen nicht empfohlen (25 mg/100 ml).", 2.80, ""],
    [109, "fritz-kola® superzero", "", "0,33 l · Erhöhter Koffeingehalt. Für Kinder und schwangere oder stillende Frauen nicht empfohlen (25 mg/100 ml).", 2.80, ""],
    [110, "fritz-limo® orange", "", "0,33 l", 2.80, ""],
    [111, "Elephant Bay Eistee", "", "0,33 l · Granatapfel, Kirsche, Zitrone oder Pfirsich", 2.80, "", { groups: ["eistee"] }],
    [112, "Gazoz", "", "0,33 l", 2.80, ""],
    [113, "Ayran", "", "", 1.50, ""],
    [114, "Wasser", "", "", 1.50, ""],
    [115, "Sinalco 1 l", "", "verschiedene Sorten · nur bei Lieferung", 3.50, ""]
  ]}
];
