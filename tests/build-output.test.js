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
