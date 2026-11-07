// Usage:
//   npm run dev -- <slug>     dev server for one client
//   npm run build -- <slug>   static site in dist/<slug>/
// CLIENT=<slug> also works. Default: reduction-automobile.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [cmd, slugArg] = process.argv.slice(2);
const slug = slugArg || process.env.CLIENT || "reduction-automobile";

if (!existsSync(path.join("clients", `${slug}.js`))) {
  const known = readdirSync("clients").filter((f) => f !== "index.js").map((f) => f.replace(/\.js$/, ""));
  console.error(`Unknown client "${slug}". Known: ${known.join(", ")}`);
  process.exit(1);
}

const env = { ...process.env, CLIENT: slug };
const run = (args) => spawnSync("npx", ["next", ...args], { stdio: "inherit", env, shell: true });

// Smaller copies of each photo (photo-320.webp, photo-800.webp) for phones; see src/lib/images.js.
const makeImageSizes = async () => {
  const dir = path.join("public", "clients", slug);
  if (!existsSync(dir)) return;
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".webp") || /-(320|800).webp$/.test(file)) continue;
    for (const width of [320, 800]) {
      const dest = path.join(dir, file.replace(/.webp$/, `-${width}.webp`));
      if (existsSync(dest)) continue;
      await sharp(path.join(dir, file)).resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(dest);
    }
  }
};
await makeImageSizes();

if (cmd === "dev") {
  process.exit(run(["dev"]).status ?? 1);
}

if (cmd === "build") {
  const res = run(["build"]);
  if (res.status !== 0) process.exit(res.status ?? 1);

  // Ship only this client's images.
  const clientsDir = path.join("out", "clients");
  if (existsSync(clientsDir)) {
    for (const dir of readdirSync(clientsDir)) {
      if (dir !== slug) rmSync(path.join(clientsDir, dir), { recursive: true, force: true });
    }
  }

  // The share image has a photo in it: keep it light enough for the WhatsApp preview.
  for (const og of [path.join("out", "og.png"), path.join("out", "en", "og.png")]) {
    if (!existsSync(og)) continue;
    const small = await sharp(og).png({ palette: true, quality: 80, compressionLevel: 9 }).toBuffer();
    writeFileSync(og, small);
  }

  const dest = path.join("dist", slug);
  rmSync(dest, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); // OneDrive can hold locks briefly
  cpSync("out", dest, { recursive: true });
  console.log(`\nSite ready in ${dest}/ (upload this folder to the host).`);
  process.exit(0);
}

console.error("Usage: node scripts/client.mjs <dev|build> [slug]");
process.exit(1);
