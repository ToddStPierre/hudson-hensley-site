// tests/build-output.test.js
import { test, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

beforeAll(() => {
  execSync("npm run build", { cwd: process.cwd(), stdio: "inherit" });
}, 120_000);

test("build produces index.html and the CNAME file", () => {
  expect(existsSync("dist/index.html")).toBe(true);
  expect(readFileSync("dist/CNAME", "utf8").trim()).toBe("hudsonhensley.com");
});

test("index.html applies the design tokens and sets lang", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/<html[^>]*lang="en"/);
  expect(html).toMatch(/--navy-900|--blue\b/);
});

test("hero: one h1 with the name, tagline, both CTAs", () => {
  const html = readFileSync("dist/index.html", "utf8");
  const h1s = html.match(/<h1[\s>]/g) || [];
  expect(h1s).toHaveLength(1);
  expect(html).toMatch(/<h1[^>]*>\s*Hudson Hensley\s*<\/h1>/);
  expect(html).toMatch(/href="#song-sung-blue"/);
  expect(html).toMatch(/href="https:\/\/www\.imdb\.com\/name\/nm16617332\/"[^>]*target="_blank"[^>]*rel="noopener"/);
  expect(html).toMatch(/<img[^>]+alt="Hudson Hensley, headshot"/);
});

test("award strip renders the verbatim nomination line", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/Nominated — 2026 Young Artist Academy Award, Feature Film Artists\./);
});
