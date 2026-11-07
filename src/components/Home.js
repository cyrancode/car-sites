import client, { asset, carById } from "@/lib/client";
import { carCard } from "@/lib/cards";
import { srcSetOf } from "@/lib/images";
import { prettyPhone, t, tr, waLink } from "@/lib/i18n";
import { mapUrl, pagePath } from "@/lib/seo";
import CarCard from "./CarCard";
import { StarIcon, WhatsAppIcon } from "./Icons";

export default function Home({ lang }) {
  const s = t(lang);
  const { address, contact, rating, yard } = client;
  const types = [...new Set(client.cars.map((c) => c.type))];
  const brands = [...new Set(client.cars.map((c) => c.brand))].sort();
  const featured = client.featured.map(carById).filter(Boolean);
  const hello = waLink(contact.whatsapp, s.hello);

  return (
    <>
      <section className="bg-dark text-white">
        <div className="mx-auto grid max-w-[1240px] md:grid-cols-2">
          <img src={asset(client.hero)} srcSet={srcSetOf(asset(client.hero))} sizes="(min-width: 768px) 620px, 100vw" alt={tr(client.heroAlt, lang)} fetchPriority="high" className="block h-[210px] w-full object-cover md:order-2 md:h-full md:min-h-[400px]" />
          <div className="flex flex-col justify-center gap-3 px-4 py-4 md:gap-4 md:py-11 md:pl-6 md:pr-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-dark md:text-xs">{s.eyebrow(address.district, address.city)}</p>
            <h1 className="font-display text-[36px] font-bold leading-[1.03] md:text-[54px] md:leading-[1.02]">{tr(client.heroTitle, lang)}</h1>
            <p className="hidden max-w-[440px] text-[15px] text-dark-muted md:block">{s.heroText}</p>

            <form action={pagePath(lang, "stock")} method="get" className="hidden max-w-[500px] grid-cols-[1fr_1fr_auto] items-end gap-2 rounded-lg bg-surface p-2.5 text-ink md:grid">
              <label className="flex flex-col gap-0.5 text-[11px] font-semibold text-muted">{s.type}
                <select name="type" className="field">
                  <option value="">{s.all}</option>
                  {types.map((v) => <option key={v} value={v}>{s.types[v]}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-0.5 text-[11px] font-semibold text-muted">{s.brand}
                <select name="brand" className="field">
                  <option value="">{s.allBrands}</option>
                  {brands.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </label>
              <button type="submit" className="btn btn-accent h-[34px]">{s.seeStock}</button>
            </form>

            <div className="grid grid-cols-2 gap-2 md:hidden">
              <a href={pagePath(lang, "stock")} className="btn btn-accent h-[42px] text-sm">{s.seeStock}</a>
              <a href={hello} target="_blank" rel="noopener" className="btn btn-wa h-[42px] text-sm"><WhatsAppIcon size={15} />{s.whatsapp}</a>
            </div>

            {rating && (
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-dark-muted md:text-[13px]">
                <span className="inline-flex items-center gap-1"><StarIcon className="text-on-dark" /><strong className="text-white">{s.ratingValue(rating.value)}</strong> {s.ratingLine(rating.value, rating.count, rating.source)}</span>
                <span className="hidden md:inline">{address.street}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="wrap pb-2 pt-5 md:pt-9">
        <div className="mb-2.5 flex items-baseline justify-between gap-2 md:mb-3.5">
          <h2 className="h-sect">{s.available}</h2>
          <a href={pagePath(lang, "stock")} className="text-[13px] font-semibold text-accent hover:text-accent-hover">{s.allStock}</a>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
          {featured.map((car) => <CarCard key={car.id} car={carCard(car, lang)} />)}
        </div>
      </section>

      <section id="acheter" className="wrap py-5 md:py-8">
        <h2 className="h-sect mb-2.5 md:mb-3.5">{s.howToBuy}</h2>
        <ol className="grid gap-2 md:grid-cols-3 md:gap-3.5">
          {s.steps.map(([title, text], i) => (
            <li key={title} className="card flex gap-3 px-3.5 py-2.5 md:block md:px-4 md:py-3.5">
              <span className="font-display text-2xl font-bold leading-tight text-accent">{i + 1}</span>
              <div>
                <p className="text-[14.5px] font-semibold">{title}</p>
                <p className="text-[13px] text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="parc" className="bg-dark text-white">
        <div className="wrap grid items-center gap-4 py-5 md:grid-cols-2 md:gap-6 md:py-9">
          <div className="grid grid-cols-2 gap-2">
            <img src={asset(yard.wide.src)} srcSet={srcSetOf(asset(yard.wide.src))} sizes="(min-width: 768px) 600px, 100vw" alt={tr(yard.wide.alt, lang)} loading="lazy" className="col-span-2 block aspect-[16/8] w-full rounded-md object-cover" />
            {yard.photos.map((p) => (
              <img key={p.src} src={asset(p.src)} srcSet={srcSetOf(asset(p.src))} sizes="(min-width: 768px) 300px, 50vw" alt={tr(p.alt, lang)} loading="lazy" className="block aspect-[4/3] w-full rounded-md object-cover" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[28px] font-bold leading-[1.05] md:text-[34px]">{s.visit}</h2>
            {client.review && (
              <blockquote className="text-[15px] text-[#E7E8EA]">« {tr(client.review, lang)} »<footer className="mt-0.5 text-xs text-dark-muted">{s.reviewSource}</footer></blockquote>
            )}
            <dl className="grid grid-cols-[76px_1fr] gap-x-2.5 gap-y-1 text-[13.5px]">
              <dt className="text-dark-muted">{s.address}</dt><dd>{address.street}, {address.district}, {address.city}</dd>
              {client.hours && <><dt className="text-dark-muted">{s.hours}</dt><dd>{tr(client.hours, lang)}</dd></>}
              <dt className="text-dark-muted">{s.phone}</dt><dd><a href={`tel:${contact.phone}`} className="hover:text-on-dark">{prettyPhone(contact.phone)}</a></dd>
            </dl>
            <p className="text-[13px] text-dark-muted">{s.rentalNote}</p>
            <div className="flex flex-wrap gap-2">
              <a href={hello} target="_blank" rel="noopener" className="btn btn-wa"><WhatsAppIcon size={15} />{s.writeWhatsapp}</a>
              <a href={mapUrl()} target="_blank" rel="noopener" className="btn btn-dark-line">{s.directions}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
