import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test('able to navigate between products', async ({ page }) => {
  await page.goto('/material-ui/getting-started/installation/');

  await page.click('#mui-product-selector');

  await expect(page.locator('#mui-product-menu')).toBeVisible();

  await expect(
    page.locator('#mui-product-menu a[href^="/material-ui/getting-started/"]'),
  ).toBeVisible();

  await expect(page.locator('#mui-product-menu a[href^="/system/"]')).toHaveAttribute(
    'href',
    '/system/getting-started/overview/',
  );

  await expect(page.locator('#mui-product-menu a[href^="/x/introduction/"]')).toBeVisible();

  await expect(page.locator('#mui-product-menu a[href^="/base/getting-started/"]')).toBeVisible();
});
