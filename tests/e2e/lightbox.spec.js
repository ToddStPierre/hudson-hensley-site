import { test, expect } from "@playwright/test";

test("clicking a still opens the lightbox; Esc closes it", async ({ page }) => {
  await page.goto("/#film-tv");
  await page.locator(".card__media").first().click();
  const dialog = page.locator("dialog.lightbox");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute("src", /still-/);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
