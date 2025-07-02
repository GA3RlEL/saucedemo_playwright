import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
      },
    },
  ],
});
