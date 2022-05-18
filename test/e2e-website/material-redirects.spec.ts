import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async ({}) => {
  test.skip(!FEATURE_TOGGLE.enable_redirects, "Redirects haven't started yet");
});

test.describe.parallel('Redirects', () => {
  ['checkbox', 'switch'].forEach((component) => {
    test(`[${component}] should redirect correctly`, async ({ page }) => {
      await page.goto(`/components/${component}es/`);

      await expect(page).toHaveURL(`/material-ui/react-${component}/`);

      await expect(page.locator('h1')).toHaveText(new RegExp(component, 'i'));
    });
  });

  [
    'button',
    'radio-button',
    'select',
    'text-field',
    'avatar',
    'badge',
    'chip',
    'divider',
    'list',
    'table',
    'tooltip',
    'dialog',
    'snackbar',
    'card',
    'drawer',
    'link',
    'menu',
    'stepper',
  ].forEach((component) => {
    test(`[${component}] should redirect correctly`, async ({ page }) => {
      await page.goto(`/components/${component}s/`);

      await expect(page).toHaveURL(`/material-ui/react-${component}/`);

      if (component === 'radio-button') {
        await expect(page.locator('h1')).toHaveText(/^radio/i);
      } else if (component === 'text-field') {
        await expect(page.locator('h1')).toHaveText(/^text field/i);
      } else {
        await expect(page.locator('h1')).toHaveText(new RegExp(component, 'i'));
      }
    });
  });

  test(`autocomplete should redirect correctly`, async ({ page }) => {
    await page.goto(`/components/autocomplete/`);

    await expect(page).toHaveURL(`/material-ui/react-autocomplete/`);

    await expect(page.locator('h1')).toHaveText('Autocomplete');
  });

  test(`button api should redirect correctly`, async ({ page }) => {
    await page.goto(`/api/button/`);

    await expect(page).toHaveURL(`/material-ui/api/button/`);

    await expect(page.locator('h1')).toHaveText('Button API');
  });

  test(`styles should redirect correctly`, async ({ page }) => {
    await page.goto(`/styles/basics/`);

    await expect(page).toHaveURL(`/system/styles/basics/`);

    await expect(page.locator('h1')).toHaveText('@mui/styles (LEGACY)');
  });
});
