import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['list']
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://mvcbasev3.leia.tiarc-live.co.uk',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 812 }
      },
    },
    {
      name: 'desktop-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      },
    },
    {
      name: 'large-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 }
      },
    },
  ],
});
