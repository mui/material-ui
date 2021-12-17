import { test as base, expect } from '@playwright/test';
import kebabCase from 'lodash/kebabCase';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.beforeEach(async ({ materialUrlPrefix }) => {
  test.skip(
    !!materialUrlPrefix && !FEATURE_TOGGLE.enable_product_scope,
    "Migration haven't started yet",
  );
});

test.describe.parallel('Material docs', () => {
  test('should have correct link with hash in the TOC', async ({ page, materialUrlPrefix }) => {
    await page.goto(`${materialUrlPrefix}/getting-started/installation/`);

    const anchors = page.locator('[aria-label="Page table of contents"] ul a');

    const anchorTexts = await anchors.allTextContents();

    await Promise.all(
      anchorTexts.map((text, index) => {
        return expect(anchors.nth(index)).toHaveAttribute(
          'href',
          `${materialUrlPrefix}/getting-started/installation/#${kebabCase(text)}`,
        );
      }),
    );
  });

  test.describe.parallel('Demo page', () => {
    test('should have correct link for API section', async ({ page, materialUrlPrefix }) => {
      await page.goto(`${materialUrlPrefix}/components/cards/`);

      const anchors = await page.locator('div > h2#heading-api ~ ul a');

      const anchorTexts = await anchors.allTextContents();

      await Promise.all(
        anchorTexts.map((text, index) => {
          return expect(anchors.nth(index)).toHaveAttribute(
            'href',
            `${materialUrlPrefix}/api/${kebabCase(text)}/`,
          );
        }),
      );
    });

    test('should have correct link for sidebar anchor', async ({ page, materialUrlPrefix }) => {
      await page.goto(`${materialUrlPrefix}/components/cards/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('href', `${materialUrlPrefix}/components/cards/`);
    });
  });

  test.describe.parallel('API page', () => {
    test('should have correct link for sidebar anchor', async ({ page, materialUrlPrefix }) => {
      await page.goto(`${materialUrlPrefix}/api/card/`);

      const anchor = await page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveAttribute('app-drawer-active', '');
      await expect(anchor).toHaveAttribute('href', `${materialUrlPrefix}/api/card/`);
    });

    test('all the links in the main content should have correct prefix', async ({
      page,
      materialUrlPrefix,
    }) => {
      await page.goto(`${materialUrlPrefix}/api/card/`);

      const anchors = await page.locator('div#main-content a');

      const handles = await anchors.elementHandles();

      const links = await Promise.all(handles.map((elm) => elm.getAttribute('href')));

      links.forEach((link) => {
        if (
          [
            '/getting-started',
            '/components',
            '/api',
            '/customization',
            '/guides',
            '/discover-more',
          ].some((path) => link.replace(materialUrlPrefix, '').startsWith(path))
        ) {
          expect(link.startsWith(materialUrlPrefix)).toBeTruthy();
        }

        if (link.replace(materialUrlPrefix, '').startsWith('/system')) {
          expect(link.startsWith('/system')).toBeTruthy();
          expect(link.match(/\/system{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
        }

        if (link.replace(materialUrlPrefix, '').startsWith('/styles')) {
          expect(link.startsWith('/styles')).toBeTruthy();
          expect(link.match(/\/styles{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
        }
      });
    });
  });

  test.describe.parallel('Search', () => {
    test('should have correct link when searching component', async ({
      page,
      materialUrlPrefix,
    }) => {
      await page.goto(`${materialUrlPrefix}/getting-started/installation/`);

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await page.keyboard.press('Meta+k');

      await page.type('input#docsearch-input', 'card', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card")');

      await expect(anchor.first()).toHaveAttribute(
        'href',
        `${materialUrlPrefix}/components/cards/#main-content`,
      );
    });

    test('should have correct link when searching API', async ({ page, materialUrlPrefix }) => {
      await page.goto(`${materialUrlPrefix}/getting-started/installation/`);

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await page.keyboard.press('Meta+k');

      await page.type('input#docsearch-input', 'card api', { delay: 50 });

      const anchor = await page.locator('.DocSearch-Hits a:has-text("Card API")');

      await expect(anchor.first()).toHaveAttribute(
        'href',
        `${materialUrlPrefix}/api/card/#main-content`,
      );
    });
  });
});
