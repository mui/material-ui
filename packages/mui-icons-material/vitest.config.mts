import { mergeConfig } from 'vitest/config';
// eslint-disable-next-line import/no-relative-packages
import sharedConfig from '../../vitest.shared.mts';

export default mergeConfig(await sharedConfig(import.meta.url, { jsdom: true }), {
  test: {
    include: ['builder.test.*'],
  },
});
