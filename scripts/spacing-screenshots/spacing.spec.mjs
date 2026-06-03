import path from 'node:path';
import { test, expect } from '@playwright/test';

// Component under verification, e.g. `COMPONENT=Button pnpm spacing:shot`.
const component = process.env.COMPONENT || 'Button';
const outDir = path.resolve(process.cwd(), 'spacing-screenshots', component);
const scopeSelector = '#spacing-scope';

async function scopeAt(page, spacing) {
  await page.goto(`/experiments/spacing-fixture?c=${component}&spacing=${spacing}`);
  const scope = page.locator(scopeSelector);
  await scope.waitFor();
  await page.evaluate(() => document.fonts.ready);
  return scope;
}

test.describe.configure({ mode: 'serial' });

// Regression gate: default render must match the "before" baseline exactly.
// Run with --update-snapshots on the UNCONVERTED component to capture the baseline.
test(`${component} — default is pixel-identical to baseline`, async ({ page }) => {
  const scope = await scopeAt(page, 8);
  await scope.screenshot({ path: path.join(outDir, 'after-default.png') });
  await expect(scope).toHaveScreenshot(`${component}-default.png`);
});

// Density review (human only — new behavior, not assertable).
for (const spacing of [6, 10]) {
  test(`${component} — density --mui-spacing ${spacing}px (review)`, async ({ page }) => {
    const scope = await scopeAt(page, spacing);
    await scope.screenshot({ path: path.join(outDir, `after-${spacing}px.png`) });
  });
}
