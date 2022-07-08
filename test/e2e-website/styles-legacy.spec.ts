import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test('should see legacy styles', async ({ page }) => {
  await page.goto(`/styles/basics/`);

  await expect(page.locator('h1:has-text("@mui/styles")')).toBeVisible();
});

test('should see legacy styles inside system', async ({ page }) => {
  test.skip(!FEATURE_TOGGLE.enable_product_scope, "Migration haven't started yet");

  await page.goto(`/system/styles/basics/`);

  await expect(page.locator('h1:has-text("@mui/styles")')).toBeVisible();
});
