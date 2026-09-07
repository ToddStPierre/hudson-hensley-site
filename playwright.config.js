import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  webServer: { command: "npm run build && npm run preview", port: 4321, reuseExistingServer: !process.env.CI },
  use: { baseURL: "http://localhost:4321" },
  projects: [{ name: "mobile", use: { ...devices["iPhone 13"] } }, { name: "desktop", use: { ...devices["Desktop Chrome"] } }],
});
