import client, { asset, carName } from "@/lib/client";
import { formatKm, formatXAF, prettyPhone, t, tr, waLink } from "@/lib/i18n";
import { carJsonLd, liveUrl, pagePath } from "@/lib/seo";
import { srcSetOf } from "@/lib/images";
import CarGallery from "./CarGallery";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

// Same type first, then the same make, then the rest.
const similarTo = (car) =>
  client.cars
    .filter((c) => c.id !== car.id)
    .map((c) => ({ c, score: (c.type === car.type ? 2 : 0) + (c.brand === car.brand ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ c }) => c);

export const carWaLink = (car, lang) => waLink(client.contact.whatsapp, t(lang).interestedMsg(carName(car), liveUrl(pagePath(lang, "car", car.id))));

export default function CarPage({ lang, car }) {
  const s = t(lang);
  const name = carName(car);
  const { address, contact } = client;
  const specs = [
    [s.specs.type, s.types[car.type]],
    [s.specs.year, car.year],
    [s.specs.km, car.km && formatKm(car.km, lang)],
    [s.specs.gearbox, car.gearbox && s.gearbox[car.gearbox]],
    [s.specs.fuel, tr(car.fuel, lang)],
    [s.specs.colour, tr(car.colour, lang)],
    [s.specs.origin, tr(car.origin, lang)],
  ].filter(([, v]) => v);
  const missingBasics = !car.year || !car.km || !car.price;
  const photos = car.photos.map(asset);

  return (
    <div className="mx-auto max-w-[1240px] pb-7 md:px-6 md:pt-3.5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd(lang, car)) }} />
      <nav aria-label={s.breadcrumb} className="px-4 py-2 text-[12.5px] text-muted md:mb-1 md:px-0 md:py-0">
        <a href={pagePath(lang, "stock")} className="font-semibold text-accent hover:text-accent-hover">{s.nav.stock}</a> / {name}
      </nav>

      <div className="grid items-start gap-3 md:grid-cols-[minmax(0,1fr)_360px] md:gap-5">
        <CarGallery photos={photos} alts={photos.map((_, i) => s.photoOf(name, i + 1))} showLabels={photos.map((_, i) => s.showPhoto(i + 1))} />

        <aside className="flex flex-col gap-2.5 px-4 md:rounded-lg md:border md:border-line md:bg-surface md:p-4">
          <div>
            <h1 className="font-display text-[30px] font-bold leading-[1.05] md:text-[34px]">{name}</h1>
            <p className="text-[12.5px] text-muted md:text-[13px]">{[s.types[car.type], car.year, car.gearbox && s.gearbox[car.gearbox], tr(car.colour, lang)].filter(Boolean).join(" · ")}</p>
          </div>
          <p className="price text-2xl text-accent md:text-[28px]">{car.price ? formatXAF(car.price, lang) : s.onRequest}</p>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-surface px-2.5 py-1.5">
                <dt className="text-[11.5px] text-muted">{k}</dt>
                <dd className="text-[13.5px] font-semibold">{v}</dd>
              </div>
            ))}
            {specs.length % 2 === 1 && <div className="bg-surface" />}
          </dl>
          {missingBasics && <p className="text-[12.5px] text-muted">{car.price ? s.askDetailsPriced : s.askDetails}</p>}

          <a href={carWaLink(car, lang)} target="_blank" rel="noopener" className="btn btn-wa hidden h-[42px] text-sm md:flex"><WhatsAppIcon size={16} />{s.interestedLong}</a>
          <a href={`tel:${contact.phone}`} className="btn btn-line hidden md:flex"><PhoneIcon size={15} />{s.call} {prettyPhone(contact.phone)}</a>
          <p className="text-[12.5px] text-muted">{s.seeAtYard(address.street, address.district)}</p>
        </aside>
      </div>

      <section className="mt-5 px-4 md:mt-7 md:px-0">
        <h2 className="font-display mb-2.5 text-[22px] font-bold leading-tight md:text-[26px]">{s.similar}</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3.5">
          {similarTo(car).map((c) => (
            <a key={c.id} href={pagePath(lang, "car", c.id)} className="card block hover:border-line-strong">
              <img src={asset(c.photos[0])} srcSet={srcSetOf(asset(c.photos[0]))} sizes="(min-width: 768px) 290px, 50vw" alt={carName(c)} loading="lazy" className="block aspect-[4/3] w-full object-cover" />
              <div className="px-2 py-1.5 md:px-2.5 md:pb-2.5 md:pt-2">
                <p className="text-[13px] font-semibold leading-snug md:text-sm">{carName(c)}</p>
                <p className="text-xs text-muted md:text-[12.5px]">{c.price ? formatXAF(c.price, lang) : s.onRequest}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
