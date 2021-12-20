import { test as base, expect } from '@playwright/test';
import kebabCase from 'lodash/kebabCase';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async ({ materialUrlPrefix }) => {
  test.skip(!FEATURE_TOGGLE.enable_product_scope, 'Product scope is not enabled.');
  test.skip(!materialUrlPrefix, 'Skip tests for old urls');
});

test('able to navigate to `system`', async ({ page }) => {
  await page.goto('/material/getting-started/installation/');

  // await page.click()
});
