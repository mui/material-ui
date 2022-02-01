import { test as base, expect, Page } from '@playwright/test';
import kebabCase from 'lodash/kebabCase';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async ({}) => {
  test.skip(FEATURE_TOGGLE.enable_redirects, "Migration haven't started yet");
});

test.describe('Material docs', () => {
  test('should have correct link with hash in the TOC', async ({ page }) => {
    await page.goto(`/getting-started/installation/`);

    const anchors = page.locator('[aria-label="Page table of contents"] ul a');

    const firstAnchor = await anchors.first();
    const textContent = await firstAnchor.textContent();

    await expect(firstAnchor).toHaveAttribute(
      'href',
      `/getting-started/installation/#${kebabCase(textContent || '')}`,
    );
  });

  test.describe('Demo page', () => {
    test('should have correct link for API section', async ({ page }) => {
      await page.goto(`/components/cards/`);

      const anchors = await page.locator('div > h2#heading-api ~ ul a');

      const firstAnchor = await anchors.first();
      const textContent = await firstAnchor.textContent();

      await expect(firstAnchor).toHaveAttribute('href', `/api/${kebabCase(textContent || '')}/`);
    });

    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto(`/components/cards/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('href', `/components/cards/`);
    });
  });

  test.describe('API page', () => {
    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto(`/api/card/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('app-drawer-active', '');
      await expect(anchor).toHaveAttribute('href', `/api/card/`);
    });

    test('all the links in the main content should have correct prefix', async ({ page }) => {
      await page.goto(`/api/card/`);

      const anchors = await page.locator('div#main-content a');

      const handles = await anchors.elementHandles();

      const links = await Promise.all(handles.map((elm) => elm.getAttribute('href')));

      links.forEach((link) => {
        expect(link.startsWith('/material')).toBeFalsy();
      });
    });
  });

  test.describe('Search', () => {
    const retryToggleSearch = async (page: Page, count = 3) => {
      try {
        await page.keyboard.press('Meta+k');
        await page.waitForSelector('input#docsearch-input', { timeout: 2000 });
      } catch (error) {
        if (count === 0) {
          throw error;
        }
        await retryToggleSearch(page, count - 1);
      }
    };
    test('should have correct link when searching component', async ({ page }) => {
      await page.goto(`/getting-started/installation/`, { waitUntil: 'networkidle' });

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'card', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card")');

      await expect(anchor.first()).toHaveAttribute('href', `/components/cards/#main-content`);
    });

    test('should have correct link when searching API', async ({ page }) => {
      await page.goto(`/getting-started/installation/`, { waitUntil: 'networkidle' });

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'card api', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card API")');

      await expect(anchor.first()).toHaveAttribute('href', `/api/card/#main-content`);
    });

    test('should have correct link when searching lab API', async ({ page }) => {
      await page.goto(`/getting-started/installation/`);

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'loading api', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("LoadingButton API")');

      await expect(anchor.first()).toHaveAttribute('href', `/api/loading-button/#main-content`);
    });
  });
});
