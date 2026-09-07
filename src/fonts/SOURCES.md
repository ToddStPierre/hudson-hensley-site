# Font sources

Self-hosted woff2 pulled from the Google Fonts CSS2 API on 2026-09-06.

Request:
`https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Titan+One&display=swap`

| File | Upstream (fonts.gstatic.com) | Notes |
|---|---|---|
| Outfit-Light.woff2 / Outfit-Regular.woff2 / Outfit-Medium.woff2 / Outfit-SemiBold.woff2 / Outfit-Bold.woff2 | `/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2` (latin subset) | Outfit ships as a single variable woff2 covering wght 100–900, so all five weight files are byte-identical copies of that one variable file. `@font-face` still declares them per weight per the spec. |
| TitanOne-Regular.woff2 | `/s/titanone/v17/mFTzWbsGxbbS_J5cQcjClDgm.woff2` (latin subset) | Single weight (400). |

License: SIL Open Font License 1.1 (both families).

Note: the original brief asked for this provenance to be recorded in
`Hudson Hensley/Website/02-content/asset-manifest.md`; that path is outside the
Task 1 working directory, so it is recorded here instead and should be copied
across when 02-content is set up.
