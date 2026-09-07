// tests/e2e/a11y.spec.js
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  await page.locator(".trailer__play").click(); // exercise the injected iframe state too
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const bad = results.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  expect(bad, JSON.stringify(bad, null, 2)).toEqual([]);
});
