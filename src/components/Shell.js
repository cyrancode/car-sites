import client from "@/lib/client";
import { prettyPhone, t, tr, waLink } from "@/lib/i18n";
import { dealerJsonLd, pagePath } from "@/lib/seo";
import Header from "./Header";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

function Footer({ lang }) {
  const s = t(lang);
  const { contact, address } = client;
  return (
    <footer className="bg-dark text-[13px] text-dark-muted">
      <div className="wrap grid gap-5 pb-4 pt-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))]">
        <div>
          <p className="font-display text-lg font-bold tracking-[0.02em] text-white">{client.wordmark[0]} <span className="text-on-dark">{client.wordmark[1]}</span></p>
          <p className="mt-1">{tr(client.tagline, lang)}<br />{address.street}, {address.district}, {address.city}</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white">{s.contactHead}</p>
          <a href={`tel:${contact.phone}`} className="hover:text-white">{prettyPhone(contact.phone)}</a>
          <a href={waLink(contact.whatsapp, s.hello)} target="_blank" rel="noopener" className="hover:text-white">{s.whatsapp}</a>
        </div>
        <nav aria-label={s.menu} className="flex flex-col items-start gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white">{s.menu}</p>
          <a href={pagePath(lang, "stock")} className="hover:text-white">{s.nav.stock}</a>
          <a href={`${pagePath(lang)}#acheter`} className="hover:text-white">{s.nav.buy}</a>
          <a href={`${pagePath(lang)}#parc`} className="hover:text-white">{s.nav.yard}</a>
        </nav>
      </div>
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-white/14 py-3 text-xs">
          <span>© {new Date().getFullYear()} {client.name}. {s.rights}</span>
          {client.demo && <span>{s.demoNote}</span>}
        </div>
      </div>
    </footer>
  );
}

// Phone bar. The car page passes its own WhatsApp link, with the car in the message.
function MobileBar({ lang, whatsappHref, whatsappLabel }) {
  const s = t(lang);
  return (
    <nav aria-label={s.contactHead} className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[96px_1fr] gap-2 border-t border-line bg-surface px-4 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 md:hidden">
      <a href={`tel:${client.contact.phone}`} className="btn btn-line h-11"><PhoneIcon size={15} />{s.call}</a>
      <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-wa h-11 text-sm"><WhatsAppIcon size={16} />{whatsappLabel}</a>
    </nav>
  );
}

// The frame of every page. pageId is the car's id on a car page.
export default function Shell({ lang, page, pageId, barHref, barLabel, children }) {
  const s = t(lang);
  const { contact } = client;
  const links = [
    ["stock", pagePath(lang, "stock"), s.nav.stock],
    ["buy", `${pagePath(lang)}#acheter`, s.nav.buy],
    ["yard", `${pagePath(lang)}#parc`, s.nav.yard],
  ];
  const langLinks = client.languages.map((l) => [l, pagePath(l, page, pageId), l === lang]);
  const hello = waLink(contact.whatsapp, s.hello);
  return (
    <div className="flex min-h-svh flex-col pb-[61px] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd(lang)) }} />
      <Header
        wordmark={client.wordmark}
        homeHref={pagePath(lang)}
        links={links}
        current={page === "car" ? "stock" : page}
        langLinks={langLinks}
        phone={prettyPhone(contact.phone)}
        phoneHref={`tel:${contact.phone}`}
        whatsappHref={hello}
        labels={{ menu: s.menu, whatsapp: s.whatsapp }}
      />
      <main className="flex-auto">{children}</main>
      <Footer lang={lang} />
      <MobileBar lang={lang} whatsappHref={barHref ?? hello} whatsappLabel={barLabel ?? s.writeWhatsapp} />
    </div>
  );
}
