// One-off: build public/og-image.jpg — a 1200x630 centre-weighted crop of the
// hero JPEG with Hudson's name set in the lower-left corner.
// Run: node scripts/make-og-image.mjs
import sharp from "sharp";

const W = 1200;
const H = 630;
const SRC = "src/assets/hero.jpg";
const OUT = "public/og-image.jpg";

const label = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <defs>
       <linearGradient id="shade" x1="0" y1="1" x2="0" y2="0">
         <stop offset="0" stop-color="#041a33" stop-opacity="0.85"/>
         <stop offset="0.4" stop-color="#041a33" stop-opacity="0.35"/>
         <stop offset="1" stop-color="#041a33" stop-opacity="0"/>
       </linearGradient>
     </defs>
     <rect x="0" y="${H - 220}" width="${W}" height="220" fill="url(#shade)"/>
     <text x="64" y="${H - 96}" fill="#ffffff"
       font-family="Arial Rounded MT Bold, system-ui, sans-serif" font-weight="bold"
       font-size="76">Hudson Hensley</text>
     <text x="66" y="${H - 50}" fill="#60A5FA"
       font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-weight="600"
       font-size="30" letter-spacing="3">ACTOR</text>
   </svg>`
);

await sharp(SRC)
  .resize(W, H, { fit: "cover", position: "top" })
  .composite([{ input: label, top: 0, left: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} — ${meta.width}x${meta.height}`);
