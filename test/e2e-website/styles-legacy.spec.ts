import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test('should see legacy styles inside system', async ({ page }) => {
  await page.goto(`/system/styles/basics/`);

  await expect(page.locator('h1:has-text("@mui/styles")')).toBeVisible();
});
