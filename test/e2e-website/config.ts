import { PlaywrightTestConfig } from '@playwright/test';

export type TestFixture = { materialUrlPrefix: string };

const config: PlaywrightTestConfig<TestFixture> = {
  workers: 4,
  retries: 3,
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
