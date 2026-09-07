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

test("film & tv: three credit cards incl. Song Sung Blue and Stage", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/id="film-tv"/);
  expect((html.match(/class="card"/g) || []).length).toBe(3);
  expect(html).toMatch(/Song Sung Blue/);
  expect(html).toMatch(/The Wildman of Shaggy Creek/);
  expect(html).toMatch(/Thirteen Jr\. and Legally Blonde Jr\., Nashville Theatre School\./);
});

test("press: three cards, each linking out to the real article", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/id="press"/);
  expect((html.match(/class="pcard"/g) || []).length).toBe(3);
  for (const host of ["deadline.com", "hollywoodreporter.com", "broadwayworld.com"]) {
    expect(html).toMatch(new RegExp(`href="https://[^"]*${host.replace(".", "\\.")}[^"]*"[^>]*target="_blank"[^>]*rel="noopener"`));
  }
});

test("about: portrait with alt, based-in line, two body paragraphs", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/id="about"/);
  expect(html).toMatch(/<img[^>]+alt="Hudson Hensley portrait"/);
  expect(html).toMatch(/Based in Los Angeles and Nashville\./);
  expect((html.match(/class="about__p"/g) || []).length).toBe(2);
});

test("representation: tel: links with the exact numbers, no emails", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/id="contact"/);
  for (const tel of ["tel:+18186189786", "tel:+13234628000", "tel:+12126864343"]) {
    expect(html).toContain(`href="${tel}"`);
  }
  expect(html).toMatch(/Kate Hensley/);
  const section = html.split('id="contact"')[1].split("</section>")[0];
  expect(section).not.toMatch(/mailto:|@gmail\.com/);
});

test("contact form: posts to Web3Forms with the access key and honeypot", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toMatch(/<form[^>]*class="contact__form"/);
  expect(html).toMatch(/name="access_key"[^>]*value="[^"]+"/);
  expect(html).toMatch(/name="botcheck"/);
  expect(html).toMatch(/name="email"[^>]*type="email"|type="email"[^>]*name="email"/);
});

test("footer: verbatim credit and outbound social links", () => {
  const html = readFileSync("dist/index.html", "utf8");
  expect(html).toContain("© Copyright Hudson Hensley 2026. All rights reserved. Website Created & Hosted By: More Views Pro.");
  expect(html).toMatch(/href="https:\/\/www\.instagram\.com\/thehudsonhensley"[^>]*rel="noopener"/);
  expect(html).toMatch(/href="https:\/\/www\.tiktok\.com\/@thehudsonhensley_"[^>]*rel="noopener"/);
});
