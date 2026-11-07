import client, { asset, carName } from "./client";
import { formatXAF, t, tr, waLink } from "./i18n";
import { liveUrl, pagePath } from "./seo";

// The text a card shows, worked out on the server so the browser never needs the client file.
export const carCard = (car, lang) => {
  const s = t(lang);
  const name = carName(car);
  const href = pagePath(lang, "car", car.id);
  const meta = [s.types[car.type], car.year, car.gearbox && s.gearbox[car.gearbox], tr(car.colour, lang)].filter(Boolean).join(" · ");
  return {
    id: car.id,
    brand: car.brand,
    type: car.type,
    name,
    href,
    meta,
    img: asset(car.photos[0]),
    price: car.price ? formatXAF(car.price, lang) : s.onRequest,
    wa: waLink(client.contact.whatsapp, s.interestedMsg(name, liveUrl(href))),
    waLabel: s.whatsapp,
  };
};
