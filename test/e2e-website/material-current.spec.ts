import { test as base, expect } from '@playwright/test';
import kebabCase from 'lodash/kebabCase';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.describe.parallel('Material docs', () => {
  test('should have correct link with hash in the TOC', async ({ page }) => {
    await page.goto(`/getting-started/installation/`);

    const anchors = page.locator('[aria-label="Page table of contents"] ul a');

    const anchorTexts = await anchors.allTextContents();

    await Promise.all(
      anchorTexts.map((text, index) => {
        return expect(anchors.nth(index)).toHaveAttribute(
          'href',
          `/getting-started/installation/#${kebabCase(text)}`,
        );
      }),
    );
  });

  test.describe.parallel('Demo page', () => {
    test('should have correct link for API section', async ({ page }) => {
      await page.goto(`/components/cards/`);

      const anchors = await page.locator('div > h2#heading-api ~ ul a');

      const anchorTexts = await anchors.allTextContents();

      await Promise.all(
        anchorTexts.map((text, index) => {
          return expect(anchors.nth(index)).toHaveAttribute(
            'href',
            FEATURE_TOGGLE.enable_product_scope
              ? `/material/api/mui-material/${kebabCase(text)}`
              : `/api/${kebabCase(text)}/`,
          );
        }),
      );
    });

    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto(`/components/cards/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute(
        'href',
        FEATURE_TOGGLE.enable_product_scope ? `/material/react-cards/` : `/components/cards/`,
      );
    });
  });

  test.describe.parallel('API page', () => {
    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto(`/api/card/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('app-drawer-active', '');
      await expect(anchor).toHaveAttribute(
        'href',
        FEATURE_TOGGLE.enable_product_scope ? `/material/api/mui-material/card/` : `/api/card/`,
      );
    });

    test('all the links in the main content should have correct prefix', async ({ page }) => {
      await page.goto(`/api/card/`);

      const anchors = await page.locator('div#main-content a');

      const handles = await anchors.elementHandles();

      const links = await Promise.all(handles.map((elm) => elm.getAttribute('href')));

      if (FEATURE_TOGGLE.enable_product_scope) {
        links.forEach((link) => {
          if (
            ['/getting-started', '/customization', '/guides', '/discover-more'].some((path) =>
              link.includes(path),
            )
          ) {
            expect(link.startsWith(`/material`)).toBeTruthy();
          }

          if (link.startsWith('/material') && link.includes('api')) {
            expect(link).toMatch(/\/material\/api\/mui-(material|lab)\/.*/);
          }

          expect(link).not.toMatch(/components/); // there should be no `components` in the url anymore

          if (link.startsWith('/system')) {
            expect(link.startsWith('/system')).toBeTruthy();
            expect(link.match(/\/system{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
          }

          if (link.startsWith('/styles')) {
            expect(link.startsWith('/styles')).toBeTruthy();
            expect(link.match(/\/styles{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
          }
        });
      } else {
        links.forEach((link) => {
          expect(link.startsWith('/material')).toBeFalsy();
        });
      }
    });
  });

  test.describe.parallel('Search', () => {
    test('should have correct link when searching component', async ({ page }) => {
      await page.goto(`/getting-started/installation/`, { waitUntil: 'networkidle' });

      try {
        await page.keyboard.press('Meta+k');
        await page.waitForSelector('input#docsearch-input', { timeout: 2000 });
      } catch (error) {
        await page.keyboard.press('Meta+k'); // retry
      }

      await page.type('input#docsearch-input', 'card', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card")');

      if (FEATURE_TOGGLE.enable_product_scope) {
        // the old url doc should point to the new location
        await expect(anchor.first()).toHaveAttribute('href', `/material/react-cards/#main-content`);
      } else {
        await expect(anchor.first()).toHaveAttribute('href', `/components/cards/#main-content`);
      }
    });

    test('should have correct link when searching API', async ({ page }) => {
      await page.goto(`/getting-started/installation/`, { waitUntil: 'networkidle' });

      try {
        await page.keyboard.press('Meta+k');
        await page.waitForSelector('input#docsearch-input', { timeout: 2000 });
      } catch (error) {
        await page.keyboard.press('Meta+k'); // retry
      }

      await page.type('input#docsearch-input', 'card api', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card API")');

      if (FEATURE_TOGGLE.enable_product_scope) {
        await expect(anchor.first()).toHaveAttribute(
          'href',
          `/api/mui-material/card/#main-content`,
        );
      } else {
        await expect(anchor.first()).toHaveAttribute('href', `/api/card/#main-content`);
      }
    });

    test('should have correct link when searching lab API', async ({ page }) => {
      await page.goto(`/getting-started/installation/`);

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await page.keyboard.press('Meta+k');

      await page.type('input#docsearch-input', 'loading api', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("LoadingButton API")');

      if (FEATURE_TOGGLE.enable_product_scope) {
        await expect(anchor.first()).toHaveAttribute(
          'href',
          `/api/mui-lab/loading-button/#main-content`,
        );
      } else {
        await expect(anchor.first()).toHaveAttribute('href', `/api/loading-button/#main-content`);
      }
    });
  });
});
