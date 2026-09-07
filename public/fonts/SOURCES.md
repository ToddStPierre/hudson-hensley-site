# Font sources

Self-hosted woff2 pulled from the Google Fonts CSS2 API on 2026-09-06.

Request:
`https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Titan+One&display=swap`

| File | Upstream (fonts.gstatic.com) | Notes |
|---|---|---|
| `Outfit-Variable.woff2` | `/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2` (latin subset) | Outfit ships as a single variable woff2 covering wght 100–900. One `@font-face` with `font-weight:300 700` and `format("woff2-variations")` serves every weight the design uses. |
| `TitanOne-Regular.woff2` | `/s/titanone/v17/mFTzWbsGxbbS_J5cQcjClDgm.woff2` (latin subset) | Single weight (400). |

License: SIL Open Font License 1.1 (both families).

Served from `public/fonts/`, so the files are copied verbatim to `dist/fonts/`
and referenced as `/fonts/…` from `src/styles/global.css` and the
`<link rel="preload">` tags in `src/layouts/Base.astro`.

Note: the original brief asked for this provenance to live in
`Hudson Hensley/Website/02-content/asset-manifest.md`; that path is outside the
Task 1 working directory, so it is recorded here and should be copied across when
02-content is set up.
