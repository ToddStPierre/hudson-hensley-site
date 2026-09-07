import { test, expect } from "@playwright/test";

test("trailer iframe loads only after clicking play", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".trailer iframe")).toHaveCount(0);
  await page.locator(".trailer__play").click();
  const frame = page.locator(".trailer iframe");
  await expect(frame).toHaveCount(1);
  await expect(frame).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/ZqU7iiHFCzw/);
});
