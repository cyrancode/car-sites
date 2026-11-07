import { WhatsAppIcon } from "./Icons";
import { srcSetOf } from "@/lib/images";

// One car in a grid (a list row on small phones). Gets ready-made text so it can also run in the browser.
export default function CarCard({ car }) {
  return (
    <article className="card grid grid-cols-[132px_minmax(0,1fr)] sm:flex sm:flex-col">
      {/* On phones the photo fills the row without setting its height, so tall photos don't stretch the card. */}
      <a href={car.href} className="relative block min-h-[112px] sm:min-h-0">
        <img src={car.img} srcSet={srcSetOf(car.img)} sizes="(min-width: 640px) 300px, 132px" alt={car.name} loading="lazy" className="absolute inset-0 block h-full w-full object-cover sm:static sm:aspect-[4/3] sm:h-auto" />
      </a>
      <div className="flex flex-col justify-between gap-1.5 px-2.5 py-2 sm:px-3 sm:pb-3 sm:pt-2.5">
        <div>
          <a href={car.href} className="block text-sm font-semibold leading-tight hover:text-accent sm:text-[15px] sm:leading-snug">{car.name}</a>
          <p className="text-xs text-muted sm:text-[12.5px]">{car.meta}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="price text-base sm:text-xl">{car.price}</p>
          <a href={car.wa} target="_blank" rel="noopener" aria-label={`${car.waLabel}: ${car.name}`} className="btn btn-sm btn-wa h-[34px] w-[34px] flex-none px-0 sm:h-[30px] sm:w-auto sm:px-2.5">
            <WhatsAppIcon size={15} /><span className="hidden sm:inline">{car.waLabel}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
