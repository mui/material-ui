import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async ({}) => {
  test.skip(!FEATURE_TOGGLE.enable_redirects, "Redirects haven't started yet");
});

test(`[data grid] overview should redirect correctly`, async ({ page }) => {
  await page.goto(`/components/data-grid/`);

  await expect(page).toHaveURL(`/x/react-data-grid/`);

  await expect(page.locator('h1')).toHaveText('Data Grid');
});

test(`[data grid] demo should redirect correctly`, async ({ page }) => {
  await page.goto(`/components/data-grid/demo/`);

  await expect(page).toHaveURL(`/x/react-data-grid/demo/`);

  await expect(page.locator('h1')).toHaveText('Data Grid - Demo');
});

test(`[data grid] api should redirect correctly`, async ({ page }) => {
  await page.goto(`/api/data-grid/data-grid/`);

  await expect(page).toHaveURL(`/x/api/data-grid/data-grid/`);

  await expect(page.locator('h1')).toHaveText('DataGrid API');
});

test(`[date pickers] overview should redirect correctly`, async ({ page }) => {
  await page.goto(`/components/date-pickers/`);

  await expect(page).toHaveURL(`/x/react-date-pickers/getting-started`);

  await expect(page.locator('h1')).toHaveText(/pickers/);
});

test(`[date pickers] api should redirect correctly`, async ({ page }) => {
  await page.goto(`/api/date-picker/`);

  await expect(page).toHaveURL(`/x/api/date-pickers/date-picker/`);

  await expect(page.locator('h1')).toHaveText('DatePicker API');
});
