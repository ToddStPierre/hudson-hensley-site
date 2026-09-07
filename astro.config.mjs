import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://hudsonhensley.com",
  output: "static",
  integrations: [sitemap()],
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
});
