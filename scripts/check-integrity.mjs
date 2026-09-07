// scripts/check-integrity.mjs
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const errors = [];

// 1. every in-page anchor resolves to an element id in the document
const anchors = [...html.matchAll(/href="#([\w-]+)"/g)].map((m) => m[1]);
for (const id of new Set(anchors)) {
  if (!new RegExp(`id="${id}"`).test(html)) errors.push(`dead in-page anchor: #${id}`);
}

// 2. every referenced asset exists in dist/
const assets = [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:jpg|jpeg|png|webp|avif|svg|css|js|xml|woff2))"/g)].map((m) => m[1]);
for (const a of new Set(assets)) {
  if (!existsSync(`dist${a.replace("/hudson-hensley-site", "")}`)) errors.push(`missing asset: ${a}`);
}

// 3. CNAME + sitemap + social share image present
for (const f of ["dist/CNAME", "dist/sitemap-index.xml", "dist/og-image.jpg"]) {
  if (!existsSync(f)) errors.push(`missing: ${f}`);
}

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("integrity OK");
