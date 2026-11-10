import sharedConfig from '../vitest.shared.mts';

export default sharedConfig(import.meta.url, {
  // Test WebKit without changing the viewport after the iframe loads.
  initialViewport: process.env.VITEST_BROWSERS === 'webkit',
}).then((config) => {
  let diagnosticFile: string;
  if (process.env.MENU2_FRAME_CONTROL === 'without-menu2') {
    diagnosticFile = 'Menu2PlaygroundWithoutMenu2.diagnostic.tsx';
  } else if (process.env.MENU2_FRAME_CONTROL === 'without-popups') {
    diagnosticFile = 'Menu2PlaygroundWithoutPopups.diagnostic.tsx';
  } else {
    return config;
  }
  // Keep the diagnostic mock out of normal browser and unit test runs.
  return {
    ...config,
    test: {
      ...config.test,
      include: [`data/material/components/menu2/${diagnosticFile}`],
    },
  };
});
