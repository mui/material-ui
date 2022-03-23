import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test('should see the selected icon popup that match the query', async ({ page }) => {
  await page.goto(
    FEATURE_TOGGLE.enable_redirects
      ? '/components/material-icons/?selected=AcUnit'
      : '/material-ui/material-icons/?selected=AcUnit',
    { waitUntil: 'networkidle' },
  );

  await expect(page.locator('h2:has-text("AcUnit")')).toBeVisible();
});
