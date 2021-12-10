import { PlaywrightTestConfig } from '@playwright/test';
import sharedConfig from './config';

const config: PlaywrightTestConfig = {
  ...sharedConfig,
  timeout: 5 * 60 * 1000, // 5 minutes
  webServer: {
    command: 'yarn docs:dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
