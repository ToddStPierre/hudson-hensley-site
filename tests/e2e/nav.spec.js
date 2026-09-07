import { test, expect } from "@playwright/test";

test("mobile: menu is hidden until the toggle is pressed", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  await page.goto("/");
  const menu = page.locator("#nav-menu");
  await expect(menu).toBeHidden();
  const toggle = page.locator(".nav__toggle");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.locator("#nav-menu a", { hasText: "About" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#about$/);
});

test("desktop: links are visible and there is no toggle", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop");
  await page.goto("/");
  await expect(page.locator("#nav-menu")).toBeVisible();
  await expect(page.locator(".nav__toggle")).toBeHidden();
});
