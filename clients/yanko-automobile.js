// Yanko Automobile ("Cars for sale in cameroon (yanko-auto)" on Google), Douala. Demo, not signed yet.
//
// TO CONFIRM with them before going live:
// - Address: Google's pin and a directory say Kotto (bloc C), their own flyer says Bonabéri (ancienne
//   route), a Facebook post says Akwa. The site uses Kotto for now.
// - Photos come from their Google listing: ask permission, and ask which cars are still for sale.
// - Car models were read from the photos and badges; none has a confirmed year, mileage, fuel or price.
// - Hours: Google says open 24 hours, which is unlikely, so none are shown.
// - Number: 6 80 10 66 13 is on Google and on their flyer (WhatsApp Business). A TikTok video gives 6 82 39 55 82.
//
// A car needs: id, brand, model, type (suv, sedan, hatch, mpv, utility) and at least one photo.
// year, km, gearbox, fuel, colour, origin and price are optional: leave out what isn't known
// and the site adapts ("Prix sur demande", and that spec isn't shown).
const white = { fr: "Blanc", en: "White" };
const black = { fr: "Noir", en: "Black" };
const blue = { fr: "Bleu", en: "Blue" };
const grey = { fr: "Gris", en: "Grey" };

const client = {
  slug: "yanko-automobile",
  name: "Yanko Automobile",
  wordmark: ["YANKO", "AUTOMOBILE"],
  domain: "https://yanko-automobile-demo.pages.dev",
  demo: true,
  languages: ["fr", "en"],
  theme: {
    palette: "graphite",
    fonts: "sport",
    // The amber of their flyer. Amber fill takes dark text; on light backgrounds, a darker amber is used for text.
    colors: { accent: "#F5A50A", "accent-hover": "#DE9305", "on-accent": "#15171A", "accent-text": "#935600", "accent-text-hover": "#744400", "on-dark": "#F9B233", dark: "#101113" },
  },
  description: {
    fr: "Yanko Automobile, achat, vente et échange de véhicules à Douala : Mercedes, Lexus, Range Rover, Honda et plus. Voyez le stock et écrivez-nous sur WhatsApp.",
    en: "Yanko Automobile, buying, selling and swapping vehicles in Douala: Mercedes, Lexus, Range Rover, Honda and more. See the stock and message us on WhatsApp.",
  },
  tagline: { fr: "Achat, vente et échange de véhicules", en: "We buy, sell and swap vehicles" },
  heroTitle: { fr: "Votre prochaine voiture est chez Yanko.", en: "Your next car is at Yanko." },
  hero: "gle-coupe.webp",
  heroAlt: { fr: "Mercedes GLE Coupé blanc garé devant une villa moderne", en: "White Mercedes GLE Coupé parked in front of a modern villa" },
  ogImage: "gle-coupe.webp",
  rating: { value: 4.5, count: 6, source: "Google" },
  review: {
    fr: "Le meilleur concessionnaire automobile du Cameroun ! Mon père a acheté une voiture en 2023 et elle est toujours en parfait état.",
    en: "The best car dealer in Cameroon! My father bought a car in 2023 and it is still in perfect condition.",
  },
  note: {
    fr: "Vous voulez vendre ou échanger votre voiture ? Écrivez-nous sur WhatsApp.",
    en: "Want to sell or swap your car? Message us on WhatsApp.",
  },
  address: { street: "Bloc C", district: "Kotto", city: "Douala", country: "CM" },
  mapQuery: "Cars for sale in cameroon (yanko-auto), Douala",
  geo: { lat: 4.0998302, lng: 9.7561507 },
  contact: { phone: "+237680106613", whatsapp: "237680106613" },
  yard: {
    wide: { src: "ml-350.webp", alt: { fr: "Mercedes ML 350 blanc dans un parking couvert", en: "White Mercedes ML 350 in a covered car park" } },
    photos: [
      { src: "classe-e.webp", alt: { fr: "Mercedes Classe E noire, avec d'autres voitures alignées", en: "Black Mercedes E-Class, with other cars lined up" } },
      { src: "rx-bleu.webp", alt: { fr: "Lexus RX bleu nuit", en: "Midnight blue Lexus RX" } },
    ],
  },
  featured: ["mercedes-gle-coupe", "acura-rdx", "range-rover-velar", "mercedes-cla-45", "lexus-rx-gris", "honda-civic"],
  cars: [
    { id: "mercedes-gle-coupe", brand: "Mercedes-Benz", model: "GLE Coupé", type: "suv", colour: white, photos: ["gle-coupe.webp", "gle-coupe-arriere.webp"] },
    { id: "acura-rdx", brand: "Acura", model: "RDX", type: "suv", colour: blue, photos: ["rdx.webp", "rdx-arriere.webp"] },
    { id: "range-rover-velar", brand: "Range Rover", model: "Velar", type: "suv", colour: white, photos: ["velar.webp"] },
    { id: "mercedes-cla-45", brand: "Mercedes-Benz", model: "CLA 45 AMG", type: "sedan", colour: white, photos: ["cla-45.webp", "cla-45-arriere.webp"] },
    { id: "lexus-rx-gris", brand: "Lexus", model: "RX", type: "suv", colour: grey, photos: ["rx-gris.webp", "rx-gris-arriere.webp"] },
    { id: "honda-civic", brand: "Honda", model: "Civic", type: "sedan", gearbox: "auto", colour: grey, photos: ["civic.webp", "civic-arriere.webp", "civic-interieur.webp"] },
    { id: "mercedes-gle", brand: "Mercedes-Benz", model: "GLE", type: "suv", colour: white, photos: ["gle.webp", "gle-arriere.webp"] },
    { id: "mercedes-classe-s", brand: "Mercedes-Benz", model: "Classe S", type: "sedan", colour: white, photos: ["classe-s.webp", "classe-s-arriere.webp"] },
    { id: "lexus-nx", brand: "Lexus", model: "NX", type: "suv", colour: blue, photos: ["nx.webp"] },
    { id: "mercedes-gle-350", brand: "Mercedes-Benz", model: "GLE 350", type: "suv", colour: white, photos: ["gle-350.webp", "gle-350-cote.webp"] },
    { id: "mercedes-classe-c", brand: "Mercedes-Benz", model: "Classe C", type: "sedan", colour: white, photos: ["classe-c.webp", "classe-c-arriere.webp"] },
    { id: "lexus-rx-bleu", brand: "Lexus", model: "RX", type: "suv", colour: blue, photos: ["rx-bleu.webp"] },
    { id: "mercedes-ml-350", brand: "Mercedes-Benz", model: "ML 350", type: "suv", colour: white, photos: ["ml-350.webp", "ml-350-arriere.webp"] },
    { id: "audi-a4", brand: "Audi", model: "A4", type: "sedan", colour: white, photos: ["a4.webp", "a4-cote.webp"] },
    { id: "lexus-is", brand: "Lexus", model: "IS", type: "sedan", colour: white, photos: ["is.webp"] },
    { id: "mercedes-classe-e", brand: "Mercedes-Benz", model: "Classe E", type: "sedan", colour: black, photos: ["classe-e.webp"] },
    { id: "hyundai-santa-fe", brand: "Hyundai", model: "Santa Fe", type: "suv", colour: white, photos: ["santa-fe.webp", "santa-fe-avant.webp"] },
    { id: "toyota-c-hr", brand: "Toyota", model: "C-HR", type: "suv", colour: black, photos: ["c-hr.webp", "c-hr-cote.webp"] },
    { id: "peugeot-3008", brand: "Peugeot", model: "3008", type: "suv", colour: white, photos: ["3008.webp"] },
    { id: "toyota-auris", brand: "Toyota", model: "Auris", type: "hatch", colour: { fr: "Rouge", en: "Red" }, photos: ["auris.webp", "auris-cote.webp"] },
  ],
};

export default client;
