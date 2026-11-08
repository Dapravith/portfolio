import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 3300);
const MOCK_PORT = 3399;

// The contact form is enabled at build time when the provider env vars are
// present, so the e2e server builds with a mock provider configured.
const appEnv = {
  RESEND_API_KEY: 'e2e-test-key',
  CONTACT_TO_EMAIL: 'inbox@example.com',
  CONTACT_FROM_EMAIL: 'Portfolio <portfolio@example.com>',
  RESEND_API_URL: `http://127.0.0.1:${MOCK_PORT}/emails`,
  NEXT_TELEMETRY_DISABLED: '1',
};

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'off',
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /(navigation|contact)\.spec\.ts/ },
  ],
  webServer: [
    {
      command: 'node tests/e2e/mock-email-provider.mjs',
      url: `http://127.0.0.1:${MOCK_PORT}/health`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: process.env.E2E_SKIP_BUILD ? `npx next start -p ${PORT}` : `npx next build && npx next start -p ${PORT}`,
      url: `http://localhost:${PORT}/`,
      env: appEnv,
      timeout: 240_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
