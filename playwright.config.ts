import { defineConfig, devices, type Project } from "@playwright/test";

const usingSystemChrome =
  Boolean(process.env.PLAYWRIGHT_SYSTEM_CHROME) ||
  (process.platform === "win32" &&
    !process.env.CI &&
    !process.env.PLAYWRIGHT_MANAGED_BROWSERS);

const systemChromeProjects: Project[] = [
  {
    name: "desktop-chromium",
    use: { ...devices["Desktop Chrome"], channel: "chrome" },
  },
  {
    name: "mobile-chromium",
    use: { ...devices["Pixel 5"], channel: "chrome" },
  },
];

const managedBrowserProjects: Project[] = [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
  { name: "mobile-chromium", use: { ...devices["Pixel 5"] } },
];

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: !usingSystemChrome,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: usingSystemChrome ? 1 : process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: usingSystemChrome ? systemChromeProjects : managedBrowserProjects,
  webServer: process.env.PLAYWRIGHT_EXTERNAL_SERVER
    ? undefined
    : {
        command:
          "node node_modules/next/dist/bin/next start --hostname 127.0.0.1",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
