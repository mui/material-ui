import { mergeConfig, defineProject } from 'vitest/config';
import sharedConfig from '../../vitest.shared';

export default mergeConfig(
  sharedConfig,
  defineProject({
    test: {
      browser: {
        ...sharedConfig.test.browser,
        enabled: true,
      },
    },
  }),
);
