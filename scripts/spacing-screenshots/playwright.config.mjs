import { defineConfig } from '@playwright/test';

// Local verification harness for the spacing-derivation rollout.
// See docs/adr/spacing-derived-rollout-plan.md ("How to verify").
export default defineConfig({
  testDir: '.',
  testMatch: /spacing\.spec\.mjs/,
  // Keep Playwright's artifacts out of the repo's tracked test-results/.
  outputDir: './.playwright-output',
  // "before" baselines (gitignored) — co-located with the harness.
  snapshotPathTemplate: '{testDir}/__baselines__/{arg}{ext}',
  reporter: 'list',
  use: {
    baseURL: process.env.SPACING_BASE_URL || 'http://localhost:3000',
    viewport: { width: 760, height: 720 },
  },
  // Strict: the default render must be pixel-identical to the baseline.
  expect: { toHaveScreenshot: { maxDiffPixels: 0 } },
});
