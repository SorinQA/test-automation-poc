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
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  // reporter: [['playwright-tesults-reporter', {'tesults-target': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQzZTc0MzYxLWFiZWYtNGY0Zi05NmYxLWM1NGE2OWM5MzU1OS0xNzA4NjkzMjU2MzcwIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMThlZjFiYTYtNzQ3ZC00N2I5LThjOWEtNDZmMjVhNDQzYjA1IiwidHlwZSI6InQifQ.G4jMPla6VGMgMaJW0QhHXtCBWMhsAhDTVyu5t5YAO6M'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: 'on',
    trace: 'on-first-retry',
    headless: true,
    // channel: 'chrome',
    baseURL: 'https://testintect.app/',
    // extraHTTPHeaders: {
    //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) /537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      
    // //   // Authorization for login using username and password
    //   'Authorization': `Basic ${btoa("svd@intect.io:Sorintest9!")}`,
      
    // //   // Authorization for requests after login using token
    // //   'Authorization': `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN2ZEBpbnRlY3QuaW8iLCJuYmYiOjE3MDg1MTQ1NDAsImV4cCI6MjUzNDAyMjk3MjAwLCJpYXQiOjE3MDg1MTQ1NDB9.1-7T9y0EcrlYNs6-jHQuXgy0f8pDoA0_a9CXeXXJ_Rw`,
    // },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
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
