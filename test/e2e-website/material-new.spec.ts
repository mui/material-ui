import { test as base, expect, Page } from '@playwright/test';
import kebabCase from 'lodash/kebabCase';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async ({}) => {
  test.skip(!FEATURE_TOGGLE.enable_product_scope, "Migration haven't started yet");
});

test.describe.parallel('Material docs', () => {
  test('should have correct link with hash in the TOC', async ({ page }) => {
    await page.goto(`/material/getting-started/installation/`);

    const anchors = page.locator('[aria-label="Page table of contents"] ul a');

    const anchorTexts = await anchors.allTextContents();

    await Promise.all(
      anchorTexts.map((text, index) => {
        return expect(anchors.nth(index)).toHaveAttribute(
          'href',
          `/material/getting-started/installation/#${kebabCase(text)}`,
        );
      }),
    );
  });

  test.describe.parallel('Demo page', () => {
    test('should have correct link for API section', async ({ page }) => {
      await page.goto(`/material/react-cards/`);

      const anchors = await page.locator('div > h2#heading-api ~ ul a');

      const anchorTexts = await anchors.allTextContents();

      await Promise.all(
        anchorTexts.map((text, index) => {
          return expect(anchors.nth(index)).toHaveAttribute(
            'href',
            `/material/api/mui-material/${kebabCase(text)}/`,
          );
        }),
      );
    });

    test('should have correct API link to mui-base', async ({ page }) => {
      await page.goto(`/material/react-buttons/`);

      await expect(page.locator('a[href="/base/api/mui-base/button-unstyled/"]')).toContainText(
        '<ButtonUnstyled />',
      );
    });

    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto(`/material/react-cards/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('href', `/material/react-cards/`);
    });
  });

  test.describe.parallel('API page', () => {
    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto(`/material/api/mui-material/card/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('app-drawer-active', '');
      await expect(anchor).toHaveAttribute('href', `/material/api/mui-material/card/`);
    });

    test('all the links in the main content should have correct prefix', async ({ page }) => {
      await page.goto(`/material/api/mui-material/card/`);

      const anchors = await page.locator('div#main-content a');

      const handles = await anchors.elementHandles();

      const links = await Promise.all(handles.map((elm) => elm.getAttribute('href')));

      links.forEach((link) => {
        if (
          ['/getting-started', '/customization', '/guides', '/discover-more'].some((path) =>
            link.includes(path),
          )
        ) {
          expect(link.startsWith(`/material`)).toBeTruthy();
        }

        if (link.startsWith('/material/api/')) {
          expect(link).toMatch(/\/material\/api\/mui-(material|lab)\/.*/);
        }

        expect(link).not.toMatch(/\/components/); // there should be no `/components` in the url anymore

        if (link.startsWith('/system')) {
          expect(link.startsWith('/system')).toBeTruthy();
          expect(link.match(/\/system{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
        }

        if (link.startsWith('/styles')) {
          expect(link.startsWith('/styles')).toBeTruthy();
          expect(link.match(/\/styles{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
        }
      });
    });
  });

  test.describe.parallel('Search', () => {
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
      await page.goto(`/material/getting-started/installation/`);

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'card', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card")');

      await expect(anchor.first()).toHaveAttribute('href', `/material/react-cards/#main-content`);
    });

    test('should have correct link when searching API', async ({ page }) => {
      await page.goto(`/material/getting-started/installation/`);

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'card api', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card API")');

      await expect(anchor.first()).toHaveAttribute(
        'href',
        `/material/api/mui-material/card/#main-content`,
      );
    });
  });
});
