import { describe, it, expect } from 'vitest';
import createEmotionCache from './createCache';

describe('createEmotionCache', () => {
  it('warns when the removed enableCssLayer option is passed', () => {
    const options = { key: 'mui', enableCssLayer: true } as { key: string };
    expect(() => {
      createEmotionCache(options);
    }).toErrorDev('MUI: The `enableCssLayer` option of `createEmotionCache()` was removed in v10.');
  });
});
