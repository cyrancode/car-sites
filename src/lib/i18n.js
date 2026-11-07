// Pick the right language from a { fr, en } value; plain strings pass through.
export const tr = (value, lang) => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.fr ?? value.en ?? "";
};

// "12 000 000 FCFA" (fr) / "12,000,000 FCFA" (en), with spaces that never break.
export const formatXAF = (amount, lang) =>
  `${new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(amount).replace(/\s/g, " ")} FCFA`;

export const formatKm = (km, lang) =>
  `${new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(km).replace(/\s/g, " ")} km`;

export const waLink = (number, text) => `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// "+237691912628" -> "6 91 91 26 28"
export const prettyPhone = (p) => p.replace(/^\+237(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5");

const strings = {
  fr: {
    nav: { home: "Accueil", stock: "Stock", buy: "Comment acheter", yard: "Le parc" },
    menu: "Menu",
    whatsapp: "WhatsApp",
    call: "Appeler",
    seeStock: "Voir le stock",
    allStock: "Tout le stock",
    all: "Tous",
    allBrands: "Toutes",
    type: "Type",
    brand: "Marque",
    types: { suv: "SUV", sedan: "Berline", hatch: "Citadine", mpv: "Monospace", utility: "Utilitaire" },
    gearbox: { auto: "Automatique", manual: "Manuelle" },
    onRequest: "Prix sur demande",
    eyebrow: (district, city) => `Parc auto · ${district}, ${city}`,
    heroText: "Regardez le stock depuis votre téléphone, écrivez-nous sur WhatsApp pour le véhicule qui vous plaît, puis venez le voir au parc.",
    ratingLine: (v, n, src) => `sur ${src} (${n} avis)`,
    ratingValue: (v) => v.toString().replace(".", ","),
    available: "Disponibles au parc",
    howToBuy: "Comment acheter",
    steps: [
      ["Choisissez en ligne", "Les photos et les détails de chaque véhicule, depuis votre téléphone."],
      ["Écrivez-nous sur WhatsApp", "Le bouton de chaque voiture nous envoie le bon modèle, sans rien retaper."],
      ["Venez la voir au parc", "Passez nous voir pour la regarder de près avant de décider."],
    ],
    visit: "Passez nous voir au parc",
    reviewSource: "Avis Google",
    address: "Adresse",
    hours: "Horaires",
    phone: "Téléphone",
    writeWhatsapp: "Écrire sur WhatsApp",
    directions: "Voir l'itinéraire",
    stockTitle: "Notre stock",
    count: (n) => `${n} ${n > 1 ? "véhicules" : "véhicule"}`,
    noResult: "Rien dans ce choix pour le moment.",
    tellUs: "Dites-nous ce que vous cherchez sur WhatsApp.",
    notFound: "Vous ne trouvez pas votre voiture ?",
    notFoundText: "Dites-nous le modèle et votre budget.",
    lookingFor: "Bonjour, je cherche une voiture : ",
    hello: "Bonjour, je vous écris depuis votre site.",
    interested: "Je suis intéressé",
    interestedLong: "Je suis intéressé, écrire sur WhatsApp",
    interestedMsg: (name, url) => `Bonjour, je suis intéressé par ce véhicule : ${name}\n${url}`,
    askDetails: "Demandez-nous l'année, le kilométrage et le prix sur WhatsApp.",
    askDetailsPriced: "Demandez-nous les autres détails sur WhatsApp.",
    seeAtYard: (street, district) => `À voir au parc : ${street}, ${district}.`,
    similar: "Dans le même esprit",
    photoOf: (name, i) => `${name}, photo ${i}`,
    showPhoto: (i) => `Afficher la photo ${i}`,
    specs: { type: "Type", year: "Année", km: "Kilométrage", gearbox: "Boîte", fuel: "Carburant", colour: "Couleur", origin: "Provenance" },
    breadcrumb: "Fil d'Ariane",
    contactHead: "Contact",
    rights: "Tous droits réservés.",
    demoNote: "Site de démonstration, photos et détails à confirmer.",
    metaStock: (name, city) => `Voitures d'occasion en stock chez ${name}, ${city}. Photos, détails et contact direct sur WhatsApp.`,
    metaCar: (car, name, city) => `${car} chez ${name}, ${city}. Photos, détails et contact direct sur WhatsApp.`,
  },
  en: {
    nav: { home: "Home", stock: "Stock", buy: "How to buy", yard: "The yard" },
    menu: "Menu",
    whatsapp: "WhatsApp",
    call: "Call",
    seeStock: "See the stock",
    allStock: "All the stock",
    all: "All",
    allBrands: "All",
    type: "Type",
    brand: "Make",
    types: { suv: "SUV", sedan: "Saloon", hatch: "Hatchback", mpv: "MPV", utility: "Utility" },
    gearbox: { auto: "Automatic", manual: "Manual" },
    onRequest: "Price on request",
    eyebrow: (district, city) => `Car yard · ${district}, ${city}`,
    heroText: "Browse the stock from your phone, message us on WhatsApp about the vehicle you like, then come and see it at the yard.",
    ratingLine: (v, n, src) => `on ${src} (${n} reviews)`,
    ratingValue: (v) => v.toString(),
    available: "Available at the yard",
    howToBuy: "How to buy",
    steps: [
      ["Choose online", "The photos and details of every vehicle, from your phone."],
      ["Message us on WhatsApp", "The button on each car sends us the right model, nothing to retype."],
      ["Come and see it", "Visit the yard to look at it closely before you decide."],
    ],
    visit: "Come and see us at the yard",
    reviewSource: "Google review, translated",
    address: "Address",
    hours: "Hours",
    phone: "Phone",
    writeWhatsapp: "Message on WhatsApp",
    directions: "Get directions",
    stockTitle: "Our stock",
    count: (n) => `${n} ${n > 1 ? "vehicles" : "vehicle"}`,
    noResult: "Nothing in this selection right now.",
    tellUs: "Tell us what you are looking for on WhatsApp.",
    notFound: "Can't find your car?",
    notFoundText: "Tell us the model and your budget.",
    lookingFor: "Hello, I am looking for a car: ",
    hello: "Hello, I am writing from your website.",
    interested: "I'm interested",
    interestedLong: "I'm interested, message on WhatsApp",
    interestedMsg: (name, url) => `Hello, I am interested in this vehicle: ${name}\n${url}`,
    askDetails: "Ask us for the year, mileage and price on WhatsApp.",
    askDetailsPriced: "Ask us for the other details on WhatsApp.",
    seeAtYard: (street, district) => `See it at the yard: ${street}, ${district}.`,
    similar: "You may also like",
    photoOf: (name, i) => `${name}, photo ${i}`,
    showPhoto: (i) => `Show photo ${i}`,
    specs: { type: "Type", year: "Year", km: "Mileage", gearbox: "Gearbox", fuel: "Fuel", colour: "Colour", origin: "Origin" },
    breadcrumb: "Breadcrumb",
    contactHead: "Contact",
    rights: "All rights reserved.",
    demoNote: "Demo site, photos and details to be confirmed.",
    metaStock: (name, city) => `Used cars in stock at ${name}, ${city}. Photos, details and direct contact on WhatsApp.`,
    metaCar: (car, name, city) => `${car} at ${name}, ${city}. Photos, details and direct contact on WhatsApp.`,
  },
};

export const t = (lang) => strings[lang];
