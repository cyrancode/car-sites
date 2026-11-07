"use client";

import { useState } from "react";
import { srcSetOf } from "@/lib/images";

// Main photo with small photos to switch between. Thumbnails only show when there is more than one.
export default function CarGallery({ photos, alts, showLabels }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <img src={photos[current]} srcSet={srcSetOf(photos[current])} sizes="(min-width: 900px) 760px, 100vw" alt={alts[current]} fetchPriority="high" className="block aspect-[16/10] w-full bg-line object-cover md:rounded-lg" />
      {photos.length > 1 && (
        <div className="flex gap-2 px-4 md:px-0">
          {photos.map((p, i) => (
            <button key={p} type="button" onClick={() => setCurrent(i)} aria-label={showLabels[i]} aria-current={i === current ? "true" : undefined} className={`h-[54px] w-[76px] flex-none cursor-pointer overflow-hidden rounded-md border-2 md:h-[72px] md:w-[104px] ${i === current ? "border-accent" : "border-transparent"}`}>
              <img src={`${p.slice(0, -".webp".length)}-320.webp`} alt="" loading="lazy" className="block h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
