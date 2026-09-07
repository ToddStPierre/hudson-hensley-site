// scripts/extract-assets.mjs
// Decode the embedded base64 JPEG out of each 05-Assets/*.svg wrapper into a
// real .jpg in src/assets/. Do not ship the SVG wrappers.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "../05-Assets";
const OUT = "src/assets";
mkdirSync(OUT, { recursive: true });

const map = {
  "vertical headshot.svg": "hero.jpg",
  "portrait.svg": "portrait.jpg",
  "SongSungBlue.svg": "still-song-sung-blue.jpg",
  "Wildman.svg": "still-wildman.jpg",
};

for (const [svgName, outName] of Object.entries(map)) {
  const svg = readFileSync(`${SRC}/${svgName}`, "utf8");
  // Some wrappers (portrait.svg) embed more than one JPEG — a low-res/duplicate
  // layer plus the real image. Decode every candidate and keep the largest.
  const re = /(?:xlink:href|href)="data:image\/jpeg;base64,([A-Za-z0-9+/=]+)"/g;
  const blobs = [...svg.matchAll(re)].map((m) => Buffer.from(m[1], "base64"));
  if (blobs.length === 0) throw new Error(`no embedded JPEG in ${svgName}`);
  const buf = blobs.reduce((a, b) => (b.length > a.length ? b : a));
  writeFileSync(`${OUT}/${outName}`, buf);
  console.log(
    `wrote ${OUT}/${outName} (${buf.length} bytes, ${blobs.length} candidate blob(s))`
  );
}
