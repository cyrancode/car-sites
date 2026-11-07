"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

// The data comes as props from Shell so the other clients' data stays out of the browser bundle.
export default function Header({ wordmark, homeHref, links, current, langLinks, phone, phoneHref, whatsappHref, labels }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-dark text-white">
      <div className="wrap flex h-[54px] items-center gap-7">
        <a href={homeHref} className="font-display text-lg font-bold leading-none tracking-[0.02em] md:text-[21px]">
          {wordmark[0]} <span className="text-on-dark">{wordmark[1]}</span>
        </a>

        <nav aria-label={labels.menu} className="hidden flex-auto gap-5 text-[13.5px] font-medium md:flex">
          {links.map(([key, href, label]) => (
            <a key={key} href={href} aria-current={key === current ? "page" : undefined} className={key === current ? "text-white" : "text-dark-muted hover:text-white"}>{label}</a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3.5">
          <div className="flex gap-1 text-xs font-semibold">
            {langLinks.map(([l, href, active]) => (
              <a key={l} href={href} hrefLang={l} aria-current={active ? "true" : undefined} className={`px-1 py-1 uppercase ${active ? "text-white" : "text-dark-muted hover:text-white"}`}>{l}</a>
            ))}
          </div>
          <a href={phoneHref} className="hidden text-[13.5px] font-semibold hover:text-on-dark lg:block">{phone}</a>
          <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-sm btn-wa hidden md:inline-flex"><WhatsAppIcon size={14} />{labels.whatsapp}</a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={labels.menu} className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label={labels.menu} className="absolute inset-x-0 top-full flex flex-col border-t border-white/12 bg-dark px-4 pb-2 md:hidden">
          {links.map(([key, href, label]) => (
            <a key={key} href={href} onClick={() => setOpen(false)} className="flex h-11 items-center border-b border-white/12 text-sm font-medium last:border-b-0">{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
