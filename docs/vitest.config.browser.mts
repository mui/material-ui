import sharedConfig from '../vitest.shared.mts';

export default sharedConfig(import.meta.url, {
  // Test WebKit without changing the viewport after the iframe loads.
  initialViewport: process.env.VITEST_BROWSERS === 'webkit',
});
