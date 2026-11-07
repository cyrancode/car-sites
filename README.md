# Car seller sites

One static website per car seller. Next.js (static export), Tailwind 4, plain JavaScript, FR/EN.

## Commands

```bash
npm install
npm run dev -- reduction-automobile
npm run build -- reduction-automobile
```

The build puts the site in `dist/<slug>/`, ready to upload to any host.

## Add a seller

1. Copy `clients/reduction-automobile.js` to `clients/<slug>.js` and fill it in. The comment at the top explains a car's fields; leave out what isn't known.
2. Register it in `clients/index.js`.
3. Put photos in `public/clients/<slug>/` as `.webp`, about 1600 px wide. The build makes the smaller copies.
4. Set `domain` to the live address, or the WhatsApp preview image breaks. Keep `demo: true` until the client signs (it hides the site from search engines and adds a note in the footer).

## Update the stock

Edit the `cars` list in the seller's data file, add or remove photos, then build and deploy. A car's page exists at `/stock/<id>/` and `/en/stock/<id>/`.

## Deploy a demo (Cloudflare Pages)

First time only:

```bash
npx wrangler pages project create <slug>-demo --production-branch main --force
```

Each deploy:

```bash
npx wrangler pages deploy dist/<slug> --project-name <slug>-demo --branch main --commit-dirty=true
```
