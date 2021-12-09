import { PlaywrightTestConfig } from '@playwright/test';
import sharedConfig from './config';

const config: PlaywrightTestConfig = {
  ...sharedConfig,
  use: {
    baseURL: 'https://mui.com',
  },
};

export default config;
