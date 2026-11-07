import client from "@/lib/client";
import { carCard } from "@/lib/cards";
import { t, waLink } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";
import StockGrid from "./StockGrid";

export default function StockPage({ lang }) {
  const s = t(lang);
  const cars = client.cars.map((c) => carCard(c, lang));
  const typeOrder = ["suv", "sedan", "mpv", "utility"];
  const inStock = new Set(client.cars.map((c) => c.type));
  const types = typeOrder.filter((v) => inStock.has(v)).map((v) => [v, s.types[v]]);
  const brands = [...new Set(client.cars.map((c) => c.brand))].sort();
  const wa = waLink(client.contact.whatsapp, s.lookingFor);
  return (
    <div className="wrap pb-7 pt-3.5 md:pt-6">
      <StockGrid lang={lang} cars={cars} types={types} brands={brands} wa={wa} />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 rounded-lg bg-dark px-4 py-3.5 text-white">
        <div>
          <p className="font-display text-[22px] font-bold leading-tight">{s.notFound}</p>
          <p className="text-[13px] text-dark-muted">{s.notFoundText}</p>
        </div>
        <a href={wa} target="_blank" rel="noopener" className="btn btn-wa"><WhatsAppIcon size={15} />{s.writeWhatsapp}</a>
      </div>
    </div>
  );
}
