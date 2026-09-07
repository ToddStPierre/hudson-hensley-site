# Asset manifest

## Fonts
- `public/fonts/Outfit-Variable.woff2` — body font (weights 300–700), `font-display: swap`.
- `public/fonts/TitanOne-Regular.woff2` — wordmark + section `<h2>` headers only.

## Images (`src/assets/`, rendered through Astro `<Image>`)
- `hero.jpg` — 1959×2938, Hudson Hensley headshot. Extracted from `05-Assets/vertical headshot.svg`.
- `portrait.jpg` — About-section portrait. From `05-Assets/portrait.svg`.
- `still-song-sung-blue.jpg` — From `05-Assets/SongSungBlue.svg`.
- `still-wildman.jpg` — From `05-Assets/Wildman.svg`.

## Static (`public/`)
- `favicon.svg` — 32×32, navy `#0d2a4e` rounded square, white "HH" monogram (`Arial Rounded MT Bold` stack). Hand-authored.
- `favicon.ico` — legacy fallback (Astro default, retained).
- `og-image.jpg` — 1200×630 Open Graph / Twitter card image.

### og-image.jpg regeneration
Requires `sharp` (devDependency; `npm install --save-dev sharp`).

```
node scripts/make-og-image.mjs
```

`scripts/make-og-image.mjs` takes `src/assets/hero.jpg`, does a centre-weighted
`fit: cover` crop to 1200×630 anchored to the top (keeps the face), composites a
navy bottom-gradient with "Hudson Hensley" / "ACTOR" set in the lower-left corner,
and writes `public/og-image.jpg` (mozjpeg, q82). Output is committed.
