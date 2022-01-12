import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async () => {
  test.skip(!FEATURE_TOGGLE.enable_product_scope, 'Product scope is not enabled.');
});

test('able to navigate between products', async ({ page }) => {
  await page.goto('/material/getting-started/installation/');

  await page.click('#mui-product-selector');

  await expect(page.locator('#mui-product-menu')).toBeVisible();

  await expect(page.locator('#mui-product-menu a:has-text("Material Design")')).toHaveAttribute(
    'href',
    '/material/getting-started/installation/',
  );

  await expect(page.locator('#mui-product-menu a:has-text("System")')).toHaveAttribute(
    'href',
    '/system/basic/',
  );

  await expect(page.locator('#mui-product-menu a:has-text("Data Grid")')).toHaveAttribute(
    'href',
    '/x/data-grid/getting-started/',
  );

  if (FEATURE_TOGGLE.enable_mui_base_scope) {
    await expect(page.locator('#mui-product-menu a:has-text("Base")')).toHaveAttribute(
      'href',
      '/base/getting-started/installation',
    );
  }
});
