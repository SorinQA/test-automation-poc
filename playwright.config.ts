import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 1,
  // screenshot: 'only-on-failure',
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [['html', { open: 'never' }]],
  // reporter: [['line']],
  reporter: [['list'], ['html', { open: 'never' }], ['playwright-tesults-reporter', {'tesults-target': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQzZTc0MzYxLWFiZWYtNGY0Zi05NmYxLWM1NGE2OWM5MzU1OS0xNzA4NjkzMjU2MzcwIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMThlZjFiYTYtNzQ3ZC00N2I5LThjOWEtNDZmMjVhNDQzYjA1IiwidHlwZSI6InQifQ.G4jMPla6VGMgMaJW0QhHXtCBWMhsAhDTVyu5t5YAO6M'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: 'on',
    trace: 'on-first-retry',
    headless: true,
    baseURL: 'https://testintect.app/',
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome',
    //     launchOptions: {
    //       // Put your chromium-specific args here
    //       args: [
    //         '--disable-web-security',
    //         '--disable-dev-shm-usage',
    //         '--no-sandbox',
    //         '--ignore-certificate-errors',
    //         '--start-maximized',]
    //     },
    //     video: 'on',
    //   }
    // },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
        // Put your chromium-specific args here
          args: [
            '--disable-web-security',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--ignore-certificate-errors',
            // '--start-maximized',
          ],
        },
        video: 'on',
      },
    },

    // {
      // name: 'firefox',
      // use: { ...devices['Desktop Firefox'] },
    // },

    // {
      // name: 'webkit',
      // use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
