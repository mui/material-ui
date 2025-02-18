import { test as base, expect } from '@playwright/test';
import kebabCase from 'lodash/kebabCase';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.describe('Joy docs', () => {
  test('should have correct link with hash in the TOC', async ({ page }) => {
    await page.goto('/joy-ui/getting-started/installation/');

    const anchors = page.locator('[aria-label="Page table of contents"] ul a');

    const firstAnchor = anchors.first();
    const textContent = await firstAnchor.textContent();

    await expect(firstAnchor).toHaveAttribute(
      'href',
      `/joy-ui/getting-started/installation/#${kebabCase(textContent || '')}`,
    );
  });

  test('should be able to see demos', async ({ page }) => {
    await page.goto('/joy-ui/react-button/');

    const headline = page.locator('main h1');

    await expect(headline).toHaveText('Button');
  });
});
