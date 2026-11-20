import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import AppRouterCacheProvider from './appRouterV13';

describe('AppRouterCacheProvider', () => {
  const { render } = createRenderer();

  it('warns when the removed enableCssLayer option is passed', () => {
    const options = { enableCssLayer: true } as {};
    expect(() => {
      render(<AppRouterCacheProvider options={options}>{null}</AppRouterCacheProvider>);
    }).toErrorDev(
      'MUI: The `enableCssLayer` option of `AppRouterCacheProvider` was removed in v10.',
    );
  });
});
