# Hudson Hensley — actor website

Mobile-first static site for actor Hudson Hensley, built with [Astro](https://astro.build)
(`output: "static"`, no UI framework).

## Develop

```sh
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # serve ./dist locally
npm test         # Vitest (build-output assertions)
```

Node 20+ (`.nvmrc` / `package.json` engines). Package manager: npm.

## Deploy

Deploys to GitHub Pages via GitHub Actions on every push to `main`
(`.github/workflows/deploy.yml`). Custom domain in `public/CNAME`.
