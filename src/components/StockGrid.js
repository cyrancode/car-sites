"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";
import CarCard from "./CarCard";

// Filters by type and make. The home page search arrives as ?type=suv&brand=Toyota.
export default function StockGrid({ lang, cars, types, brands, wa }) {
  const s = t(lang);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const wantedType = q.get("type");
    const wantedBrand = q.get("brand");
    if (types.some(([v]) => v === wantedType)) setType(wantedType);
    if (brands.includes(wantedBrand)) setBrand(wantedBrand);
  }, [types, brands]);

  const shown = cars.filter((c) => (!type || c.type === type) && (!brand || c.brand === brand));

  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="font-display text-[30px] font-bold leading-[1.1] md:text-[38px]">{s.stockTitle}</h1>
        <p aria-live="polite" className="text-[12.5px] text-muted md:text-[13px]">{s.count(shown.length)}</p>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 md:rounded-lg md:border md:border-line md:bg-surface md:px-3 md:py-2.5">
        <div role="group" aria-label={s.type} className="-mx-4 flex flex-1 basis-full gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:basis-auto md:flex-wrap md:overflow-visible md:px-0">
          {[["", s.all], ...types].map(([value, label]) => (
            <button key={value || "all"} type="button" onClick={() => setType(value)} aria-pressed={type === value} className={`h-8 flex-none cursor-pointer rounded-full border px-3 text-[13px] font-semibold ${type === value ? "border-dark bg-dark text-white" : "border-line-strong bg-surface text-ink hover:border-ink"}`}>
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-muted">{s.brand}
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="field h-8 font-normal">
            <option value="">{s.allBrands}</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      </div>

      {shown.length > 0 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      ) : (
        <p className="card mt-3 p-4">{s.noResult} <a href={wa} target="_blank" rel="noopener" className="font-semibold text-wa">{s.tellUs}</a></p>
      )}
    </>
  );
}
