// Reduction Automobile, used cars, Makepe, Douala. Demo, not signed yet.
//
// TO CONFIRM with them before going live:
// - Photos come from their Google listing: ask permission.
// - Car models were read from the photos; none has a confirmed year, mileage or fuel.
// - The X-Trail's price and details come from a Facebook post on the page "Réduction"
//   (@sop12rodri) and that post may be about another X-Trail, or be old. Other cars have no price.
// - Vios: the leather interior photo may be from another car.
// - Hours are from Google, which shows Thursday 06:00-22:00 and has no reading for Friday.
//
// A car needs: id, brand, model, type (suv, sedan, mpv, utility) and at least one photo.
// year, km, gearbox, fuel, colour, origin and price are optional: leave out what isn't known
// and the site adapts ("Prix sur demande", and that spec isn't shown).
const client = {
  slug: "reduction-automobile",
  name: "Reduction Automobile",
  wordmark: ["REDUCTION", "AUTOMOBILE"],
  domain: "https://reduction-automobile-demo.pages.dev",
  demo: true,
  languages: ["fr", "en"],
  theme: { palette: "graphite", fonts: "sport" },
  description: {
    fr: "Reduction Automobile, vente et location de véhicules d'occasion à Makepe, Douala. Voyez le stock en ligne et écrivez-nous sur WhatsApp.",
    en: "Reduction Automobile, used car sales and rental in Makepe, Douala. See the stock online and message us on WhatsApp.",
  },
  tagline: { fr: "Vente et location de véhicules d'occasion", en: "Used car sales and rental" },
  heroTitle: { fr: "Votre prochaine voiture vous attend à Makepe.", en: "Your next car is waiting in Makepe." },
  hero: "xtrail.webp",
  heroAlt: { fr: "Nissan X-Trail noir devant l'enseigne orange Reduction Automobile", en: "Black Nissan X-Trail in front of the orange Reduction Automobile sign" },
  ogImage: "xtrail.webp",
  rating: { value: 4.4, count: 32, source: "Google" },
  review: {
    fr: "Satisfaction totale, véhicule avec kilométrage authentique.",
    en: "Totally satisfied, a vehicle with genuine mileage.",
  },
  hours: { fr: "Tous les jours, 06:30 à 21:00", en: "Every day, 6:30 am to 9 pm" },
  openingHours: "Mo-Su 06:30-21:00",
  address: { street: "Rue 829, carrefour Happy Sport", district: "Makepe", city: "Douala", country: "CM" },
  mapQuery: "REDUCTION AUTOMOBILE, Douala",
  geo: { lat: 4.0859487, lng: 9.7540268 },
  contact: { phone: "+237691912628", whatsapp: "237691912628" },
  yard: {
    wide: { src: "parc.webp", alt: { fr: "Vue du parc, avec de nombreuses voitures alignées", en: "View of the yard, with many cars lined up" } },
    photos: [
      { src: "showroom-nuit.webp", alt: { fr: "Le bureau vitré éclairé le soir", en: "The glass-fronted office lit up at night" } },
      { src: "showroom.webp", alt: { fr: "La façade vitrée du bureau", en: "The glass front of the office" } },
    ],
  },
  featured: ["nissan-x-trail", "toyota-vios", "mitsubishi-outlander-bleu", "mazda-cx-5", "nissan-juke", "toyota-corolla-axio"],
  cars: [
    { id: "nissan-x-trail", brand: "Nissan", model: "X-Trail", type: "suv", year: 2015, gearbox: "auto", price: 12000000, colour: { fr: "Noir", en: "Black" }, photos: ["xtrail.webp"] },
    { id: "toyota-vios", brand: "Toyota", model: "Vios", type: "sedan", gearbox: "auto", colour: { fr: "Gris", en: "Grey" }, photos: ["vios.webp", "vios-interieur.webp"] },
    { id: "mitsubishi-outlander-bleu", brand: "Mitsubishi", model: "Outlander", type: "suv", colour: { fr: "Bleu", en: "Blue" }, photos: ["outlander-bleu.webp"] },
    { id: "mazda-cx-5", brand: "Mazda", model: "CX-5", type: "suv", colour: { fr: "Noir", en: "Black" }, photos: ["cx5.webp"] },
    { id: "nissan-juke", brand: "Nissan", model: "Juke", type: "suv", colour: { fr: "Bleu", en: "Blue" }, photos: ["juke.webp"] },
    { id: "toyota-corolla-axio", brand: "Toyota", model: "Corolla Axio", type: "sedan", colour: { fr: "Blanc", en: "White" }, photos: ["axio.webp", "axio-avant.webp"] },
    { id: "toyota-vanguard", brand: "Toyota", model: "Vanguard", type: "suv", colour: { fr: "Noir", en: "Black" }, photos: ["vanguard.webp"] },
    { id: "mitsubishi-outlander-blanc", brand: "Mitsubishi", model: "Outlander", type: "suv", colour: { fr: "Blanc", en: "White" }, photos: ["outlander-blanc.webp"] },
    { id: "toyota-belta-rouge", brand: "Toyota", model: "Belta", type: "sedan", colour: { fr: "Rouge", en: "Red" }, photos: ["belta-rouge.webp"] },
    { id: "toyota-belta-gris", brand: "Toyota", model: "Belta", type: "sedan", colour: { fr: "Gris", en: "Grey" }, photos: ["belta-gris.webp"] },
    { id: "toyota-corolla-spacio", brand: "Toyota", model: "Corolla Spacio", type: "mpv", colour: { fr: "Blanc", en: "White" }, photos: ["spacio.webp"] },
    { id: "suzuki-carry", brand: "Suzuki", model: "Carry", type: "utility", colour: { fr: "Blanc", en: "White" }, photos: ["carry.webp"] },
  ],
};

export default client;
