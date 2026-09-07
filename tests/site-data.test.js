import { test, expect } from "vitest";
import { existsSync } from "node:fs";
import { loadSite } from "../src/content/site.schema.ts";

const site = loadSite(); // throws if site.json is missing or malformed

test("core identity fields are present and non-empty", () => {
  expect(site.name).toBe("Hudson Hensley");
  expect(site.tagline.length).toBeGreaterThan(10);
  expect(site.footerCredit).toBe(
    "© Copyright Hudson Hensley 2026. All rights reserved. Website Created & Hosted By: More Views Pro."
  );
});

test("nothing invented: role name and award text carried verbatim", () => {
  const ssb = site.credits.find((c) => c.title === "Song Sung Blue");
  expect(ssb.role).toBe("Dayna Cartwright");
  expect(site.award.text).toMatch(/2026 Young Artist Academy Award/);
});

test("exactly three press items, each with a real https URL", () => {
  expect(site.press).toHaveLength(3);
  for (const p of site.press) expect(p.url).toMatch(/^https:\/\/(www\.)?(deadline|hollywoodreporter|broadwayworld)\.com\//);
});

test("every referenced image file exists in src/assets", () => {
  const refs = [
    site.hero.image, site.feature.posterImage, site.about.image,
    ...site.credits.map((c) => c.image).filter(Boolean),
  ];
  for (const r of refs) expect(existsSync(new URL(`../src/assets/${r}`, import.meta.url))).toBe(true);
});

test("representation phones are tel-ready and no email addresses leak in", () => {
  const withPhone = site.representation.filter((r) => r.phone);
  expect(withPhone.length).toBeGreaterThanOrEqual(3);
  for (const r of withPhone) expect(r.phoneHref).toMatch(/^tel:\+?[\d]+$/);
  expect(JSON.stringify(site.representation)).not.toMatch(/@|mailto:/);
});

test("contact form config present with a non-empty access key", () => {
  expect(site.contact.accessKey.length).toBeGreaterThan(0);
  expect(site.contact.subjectLine.length).toBeGreaterThan(0);
});
