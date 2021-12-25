import { PlaywrightTestConfig } from '@playwright/test';

export type TestFixture = { materialUrlPrefix: string };

const config: PlaywrightTestConfig<TestFixture> = {
  reportSlowTests: {
    max: 1,
    threshold: 60 * 1000, // 1min
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com',
  },
  projects: [
    {
      name: 'current',
      use: {
        materialUrlPrefix: '',
      },
    },
    {
      name: 'new',
      use: {
        materialUrlPrefix: '/material',
      },
    },
  ],
};

export default config;
