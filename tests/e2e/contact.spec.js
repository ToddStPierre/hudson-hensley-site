import { test, expect } from "@playwright/test";

test("contact form shows a success message when Web3Forms returns success", async ({ page }) => {
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, message: "ok" }) }),
  );
  await page.goto("/#contact");
  await page.fill(".contact__form [name=name]", "Casting Director");
  await page.fill(".contact__form [name=email]", "cd@example.com");
  await page.fill(".contact__form [name=message]", "We'd like to see Hudson for a role.");
  await page.click(".contact__form button[type=submit]");
  await expect(page.locator(".contact__status")).toBeVisible();
  await expect(page.locator(".contact__status")).toContainText(/thank|received|sent/i);
});
