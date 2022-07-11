import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async () => {
  test.skip(!FEATURE_TOGGLE.enable_product_scope, 'Product scope is not enabled.');
});

test('able to navigate between products', async ({ page }) => {
  await page.goto('/material-ui/getting-started/installation/');

  await page.click('#mui-product-selector');

  await expect(page.locator('#mui-product-menu')).toBeVisible();

  await expect(
    page.locator('#mui-product-menu a[href="/material-ui/getting-started/installation/"]'),
  ).toBeVisible();

  await expect(page.locator('#mui-product-menu a[href="/system/basics/"]')).toHaveAttribute(
    'href',
    '/system/basics/',
  );

  await expect(page.locator('#mui-product-menu a[href="/x/introduction/"]')).toBeVisible();

  if (FEATURE_TOGGLE.enable_mui_base_scope) {
    await expect(
      page.locator('#mui-product-menu a[href="/base/getting-started/installation/"]'),
    ).toBeVisible();
  }
});
