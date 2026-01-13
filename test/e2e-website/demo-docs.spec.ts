import { test as base, expect } from '@playwright/test';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.describe('Demo docs', () => {
  test('mode toggle demos should work', async ({ page }) => {
    await page.goto('/experiments/docs/demos/');

    await expect(page.locator('div:has(> [data-element="demo-mode-toggle-paper"])')).toHaveClass(
      /light/,
    );
    await expect(page.locator('[data-element="demo-mode-toggle-paper"]')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );

    // Toggle dark mode
    await page
      .getByRole('radiogroup', { name: /^demo-mode-toggle$/ })
      .locator('label:nth-child(3)')
      .click();

    await expect(page.locator('div:has(> [data-element="demo-mode-toggle-paper"])')).toHaveClass(
      /dark/,
    );
    await expect(page.locator('[data-element="demo-mode-toggle-paper"]')).toHaveCSS(
      'background-color',
      'rgb(18, 18, 18)',
    );
  });

  test('mode toggle custom theme demos should work', async ({ page }) => {
    await page.goto('/experiments/docs/demos/');

    await expect(
      page.locator('div:has(> [data-element="demo-mode-toggle-custom-theme-paper"])'),
    ).toHaveClass(/light/);
    await expect(page.locator('[data-element="demo-mode-toggle-custom-theme-paper"]')).toHaveCSS(
      'background-color',
      'rgb(239, 154, 154)',
    );

    // Toggle dark mode
    await page
      .getByRole('radiogroup', { name: /^demo-mode-toggle-custom-theme$/ })
      .locator('label:nth-child(3)')
      .click();

    await expect(
      page.locator('div:has(> [data-element="demo-mode-toggle-custom-theme-paper"])'),
    ).toHaveClass(/dark/);
    await expect(page.locator('[data-element="demo-mode-toggle-custom-theme-paper"]')).toHaveCSS(
      'background-color',
      'rgb(183, 28, 28)',
    );
  });

  test('mode toggle iframe demos should work', async ({ page }) => {
    await page.goto('/experiments/docs/demos/');

    const iframe = page.locator('iframe[title*="DemoModeToggleIframe"]').contentFrame();

    await expect(iframe.locator('html')).toHaveClass(/light/);
    await expect(iframe.locator('[data-element="demo-mode-toggle-iframe-paper"]')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );

    // Toggle dark mode
    await iframe
      .getByRole('radiogroup', { name: /^demo-mode-toggle-iframe$/ })
      .locator('label:nth-child(3)')
      .click();

    await expect(iframe.locator('html')).toHaveClass(/dark/);
    await expect(iframe.locator('[data-element="demo-mode-toggle-iframe-paper"]')).toHaveCSS(
      'background-color',
      'rgb(18, 18, 18)',
    );
  });
});
