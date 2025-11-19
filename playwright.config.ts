import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,

  timeout: 30000,

  forbidOnly: !!process.env.CI,
 
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
 
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

});
