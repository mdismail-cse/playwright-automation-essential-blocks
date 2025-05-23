"use strict";

import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

config();

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./src/global-setup",
  globalTeardown: "./src/global-teardown",

  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 1,
  timeout: 60 * 1000,
  actionTimeout: 10_000,
  navigationTimeout: 10_000,

  reporter: process.env.CI
    ? [
        [
          "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
          {
            slackWebHookUrl: process.env.SLACK_WEBHOOK_URL,
            sendResults: "always", // "always" , "on-failure", "off"
            maxNumberOfFailuresToShow: 0,
            meta: [
              {
                key: ":eb: Essential Blocks - Test Results",
                value:
                  "<https://hurayraiit.github.io/playwright-automation-essential-blocks/ | 📂 Click Here!> (It may take a few minutes to update.)",
              },
            ],
          },
        ]
      ]
    : [["dot"], ["list"]],

  use: {
    baseURL: process.env.WP_BASE_URL,
    storageState: process.env.WP_AUTH_STORAGE,
    testIdAttribute: "data-id",

    screenshot: "on",
    trace: "retain-on-failure",
    video: "retain-on-failure",

    ignoreHTTPSErrors: true,
    locale: "en-US",
    contextOptions: {
      reducedMotion: "reduce",
      strictSelectors: true,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    
    },
  ],
});
