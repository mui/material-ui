import path from 'node:path';
import { test, expect } from '@playwright/test';

// Component under verification, e.g. `COMPONENT=OutlinedInput pnpm density:shot`.
const component = process.env.COMPONENT || 'Button';
const outDir = path.resolve(process.cwd(), 'density-screenshots', component);
const scopeSelector = '#density-scope';

async function scopeAt(page, level) {
  await page.goto(`/experiments/density-fixture?c=${component}&level=${level}`);
  const scope = page.locator(scopeSelector);
  await scope.waitFor();
  await page.evaluate(() => document.fonts.ready);
  return scope;
}

test.describe.configure({ mode: 'serial' });

// Regression gate: the default render (no density tokens) must match the
// "before" baseline exactly. Capture the baseline on the UNCONVERTED component
// (from master) with --update-snapshots.
test(`${component} — default is pixel-identical to baseline`, async ({ page }) => {
  const scope = await scopeAt(page, 'default');
  await scope.screenshot({ path: path.join(outDir, 'after-default.png') });
  await expect(scope).toHaveScreenshot(`${component}-default.png`);
});

// Density review (human only — new behavior, not assertable). Each level sets
// the component's density tokens (see density-fixture.tsx `scopes`).
for (const level of ['dense', 'loose']) {
  test(`${component} — density ${level} (review)`, async ({ page }) => {
    const scope = await scopeAt(page, level);
    await scope.screenshot({ path: path.join(outDir, `after-${level}.png`) });
  });
}
