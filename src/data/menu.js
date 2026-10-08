import { localize } from "../i18n.js";
// Veškeré ceny a nabídka jsou ilustrativní součástí fiktivního konceptu.
export const categories = localize([
  { id: "oblibene", label: "Naše oblíbené" },
  { id: "kava", label: "Káva & nápoje" },
  { id: "neco-dobreho", label: "Něco dobrého" },
]);

export const items = localize({
  flatwhite: {
    name: "Flat white",
    note: "Dvojité espresso. Sametové mléko. Nic navíc.",
    price: 89,
    image: "coffee-moment",
    alt: "Šálek kávy s latte art v rukou, v teplém kavárenském světle",
    tag: "Malý každodenní rituál",
    allergens: "7",
  },
  croissant: {
    name: "Máslový croissant",
    note: "Křehký na povrchu, jemný uvnitř. K ránu patří.",
    price: 65,
    image: "morning-croissant",
    alt: "Máslový croissant na keramickém talíři vedle kávy",
    tag: "Ráno začíná tady",
    allergens: "1, 3, 7",
  },
  cheesecake: {
    name: "Kousek něčeho sladkého",
    note: "Krémový cheesecake. Nejlepší důvod zůstat.",
    price: 115,
    image: "coffee-cheesecake",
    alt: "Dva kousky cheesecaku a cappuccino na dřevěném stole",
    tag: "Ještě jedno sousto",
    allergens: "1, 3, 7, 8",
  },
  filter: {
    name: "Ruční filtr",
    note: "Čistá chuť, voňavý šálek a čas jen pro vás.",
    price: 105,
    image: "pour-over",
    alt: "Ruce baristy zalévají kávu v keramickém dripperu",
    tag: "Po kapkách",
    allergens: "—",
  },
  cappuccino: {
    name: "Cappuccino",
    note: "Espresso pod jemnou mléčnou pěnou.",
    price: 79,
    image: "coffee-cheesecake",
    alt: "Cappuccino s latte art na dřevěném stole",
    tag: "Dobré ráno, dobrý den",
    allergens: "7",
    position: "50% 28%",
  },
  breakfast: {
    name: "Malé ráno v MEZI",
    note: "Máslový croissant a cappuccino. Dobrá dvojice.",
    price: 135,
    image: "morning-croissant",
    alt: "Snídaňová dvojice kávy a croissantu na stole",
    tag: "Snídaně do 11:30",
    allergens: "1, 3, 7",
  },
});
export const selections = localize({
  oblibene: ["flatwhite", "croissant", "cheesecake"],
  kava: ["flatwhite", "filter", "cappuccino"],
  "neco-dobreho": ["breakfast", "croissant", "cheesecake"],
});
