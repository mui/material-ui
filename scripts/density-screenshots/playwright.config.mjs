import { defineConfig } from '@playwright/test';

// Local verification harness for the CSS-var density adapter.
// See docs/adr/0001-css-var-density-adapter.md and ./README.md.
export default defineConfig({
  testDir: '.',
  testMatch: /density\.spec\.mjs/,
  // Keep Playwright's artifacts out of the repo's tracked test-results/.
  outputDir: './.playwright-output',
  // "before" baselines (gitignored) — co-located with the harness.
  snapshotPathTemplate: '{testDir}/__baselines__/{arg}{ext}',
  reporter: 'list',
  use: {
    baseURL: process.env.DENSITY_BASE_URL || 'http://localhost:3000',
    viewport: { width: 760, height: 720 },
  },
  // Strict: the default render must be pixel-identical to the baseline.
  expect: { toHaveScreenshot: { maxDiffPixels: 0 } },
});
