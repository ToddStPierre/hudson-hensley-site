import { defineConfig, configDefaults } from "vitest/config";

// Unit/integration tests only. Playwright e2e specs (tests/e2e) are run by
// `npx playwright test`, not vitest — exclude them so vitest's *.spec.js glob
// does not try to collect them.
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});
