import client, { asset, carName } from "./client";
import { t, tr } from "./i18n";

// URL of each page per language (French at the root).
export const pagePath = (lang, page = "home", id) => {
  const base = lang === "fr" ? "/" : "/en/";
  if (page === "home") return base;
  if (page === "stock") return `${base}stock/`;
  return `${base}stock/${id}/`; // page === "car"
};

export const liveUrl = (path) => new URL(path, client.domain).href;
export const mapUrl = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.mapQuery)}`;

export const buildMetadata = (lang, page = "home", car) => {
  const s = t(lang);
  const { name } = client;
  const city = client.address.city;
  const id = car?.id;
  const title = page === "home" ? `${name} | ${tr(client.tagline, lang)}, ${city}` : page === "stock" ? `${s.stockTitle} | ${name}` : `${carName(car)} | ${name}`;
  const description = page === "home" ? tr(client.description, lang) : page === "stock" ? s.metaStock(name, city) : s.metaCar(carName(car), name, city);
  const path = pagePath(lang, page, id);
  return {
    metadataBase: new URL(client.domain),
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(client.languages.map((l) => [l, pagePath(l, page, id)])),
    },
    openGraph: {
      type: "website",
      siteName: name,
      title,
      description,
      url: path,
      locale: lang === "fr" ? "fr_CM" : "en_CM",
      images: [{ url: `${pagePath(lang)}og.png`, width: 1200, height: 630, alt: name }],
    },
    // Demo sites (shown to a prospect before they sign) stay out of search engines.
    robots: client.demo ? { index: false, follow: false } : undefined,
  };
};

export const dealerJsonLd = (lang) => {
  const { contact, address, geo, rating } = client;
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: client.name,
    description: tr(client.description, lang),
    url: liveUrl(pagePath(lang)),
    image: liveUrl(asset(client.hero)),
    telephone: contact.phone,
    openingHours: client.openingHours,
    aggregateRating: rating ? { "@type": "AggregateRating", ratingValue: rating.value, reviewCount: rating.count } : undefined,
    address: { "@type": "PostalAddress", streetAddress: address.street, addressLocality: address.city, addressRegion: "Littoral", addressCountry: address.country },
    geo: geo ? { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } : undefined,
    hasMap: mapUrl(),
  };
};

export const carJsonLd = (lang, car) => ({
  "@context": "https://schema.org",
  "@type": "Car",
  name: carName(car),
  brand: { "@type": "Brand", name: car.brand },
  model: car.model,
  vehicleModelDate: car.year,
  color: tr(car.colour, lang) || undefined,
  image: car.photos.map((f) => liveUrl(asset(f))),
  url: liveUrl(pagePath(lang, "car", car.id)),
  offers: car.price ? { "@type": "Offer", price: car.price, priceCurrency: "XAF", availability: "https://schema.org/InStock", seller: { "@type": "AutoDealer", name: client.name } } : undefined,
});
