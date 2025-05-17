import { mergeConfig, defineProject } from 'vitest/config';
import sharedConfig from '../../vitest.shared.mts';

export default mergeConfig(
  sharedConfig,
  defineProject({
    test: {
      name: 'browser:@mui/joy',
      browser: {
        enabled: true,
      },
    },
  }),
);
