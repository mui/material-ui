import * as url from 'url';
import * as path from 'path';
import * as fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { test as base } from 'vitest';
import { recordA11y, WCAG_TAGS, GLOBAL_DISABLED_RULES } from './a11y/axe';
import { A11Y_RULES, DEFAULT_VIEWPORT, SCREENSHOT_RULES, getConfig, parseRoute } from './demoMeta';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const AXE_SCRIPT = path.resolve(currentDirectory, '../../node_modules/axe-core/axe.min.js');

async function main() {
  const baseUrl = 'http://localhost:5001';
  const screenshotDir = path.resolve(currentDirectory, './screenshots/chrome');

  const browser = await chromium.launch({
    args: ['--font-render-hinting=none'],
    // otherwise the loaded google Roboto font isn't applied
    headless: false,
  });

  /**
   * Builds a Playwright page wired up for regression testing: viewport,
   * reduced motion, image blocking, navigated to the dev fixture host with
   * fonts loaded and orientation pinned to portrait.
   *
   * @param {import('@playwright/test').Browser} _browser
   * @returns {Promise<import('@playwright/test').Page>}
   */
  async function newTestPage(_browser) {
    // Default viewport reused from `vrtest`
    // (https://github.com/nathanmarks/vrtest/blob/1185b852a6c1813cedf5d81f6d6843d9a241c1ce/src/server/runner.js#L44).
    // Per-route overrides are applied below via `page.setViewportSize`.
    const page = await _browser.newPage({
      viewport: DEFAULT_VIEWPORT,
      reducedMotion: 'reduce',
      // Pin the timezone so the frozen `Date` (see `index.html`) renders the
      // same instant regardless of the CI machine's local timezone.
      timezoneId: 'UTC',
    });

    // Block images since they slow down tests (need download).
    // They're also most likely decorative for documentation demos
    await page.route(/./, async (route, request) => {
      const type = await request.resourceType();
      if (type === 'image') {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Wait for all requests to finish.
    // This should load shared resources such as fonts.
    await page.goto(`${baseUrl}#dev`, { waitUntil: 'networkidle0' });
    // If we still get flaky fonts after awaiting this try `document.fonts.ready`
    await page.waitForSelector('[data-webfontloader="active"]', { state: 'attached' });

    // Simulate portrait mode for date pickers.
    // See `useIsLandscape`.
    await page.evaluate(() => {
      Object.defineProperty(window.screen.orientation, 'angle', {
        get() {
          return 0;
        },
      });
    });

    return page;
  }

  const pool = createPagePool(() => newTestPage(browser));

  // prepare screenshots
  await fs.rm(screenshotDir, { recursive: true, force: true });
  await fs.mkdir(screenshotDir, { recursive: true });

  const probePage = await pool.acquire();
  let routes = await probePage.$$eval('#tests a', (links) => {
    return links.map((link) => link.href);
  });
  routes = routes.map((route) => route.replace(baseUrl, ''));
  pool.release(probePage);

  const test = base.extend({
    // eslint-disable-next-line no-empty-pattern
    pooled: async ({}, use) => {
      const page = await pool.acquire();
      await page.evaluate(() => {
        localStorage.clear();
      });
      try {
        // `use` here is the vitest fixture callback, not a React hook.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await use({ page });
      } finally {
        pool.release(page);
      }
    },
  });

  const axeSource = await fs.readFile(AXE_SCRIPT, 'utf8');

  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} route
   */
  async function renderFixture(page, route) {
    await page.evaluate((_route) => {
      // Use client-side routing which is much faster than full page navigation via page.goto().
      window.muiFixture.navigate(`${_route}#no-dev`);

      // Playwright hides scrollbar when capturing a screenshot on an element or with fullPage: true.
      // When the body has a scrollbar, this causes a brief layout shift. Disable the body overflow
      // altogether to prevent this
      window.document.body.style.overflow = 'hidden';
    }, route);

    // Move cursor offscreen to not trigger unwanted hover effects.
    await page.mouse.move(0, 0);

    const testcase = await page.waitForSelector(
      `[data-testid="testcase"][data-testpath="${route}"]:not([aria-busy="true"])`,
    );

    return testcase;
  }

  async function takeScreenshot(page, { testcase, route }) {
    const screenshotPath = path.resolve(screenshotDir, `.${route}.png`);
    await fs.mkdir(path.dirname(screenshotPath), { recursive: true });

    const explicitScreenshotTarget = await page.$('[data-testid="screenshot-target"]');
    const screenshotTarget = explicitScreenshotTarget || testcase;

    await screenshotTarget.screenshot({
      path: screenshotPath,
      type: 'png',
      animations: 'disabled',
    });
  }

  describe('visual regressions', () => {
    afterAll(async () => {
      await pool.closeAll();
      await browser.close();
    });

    describe.concurrent('routes', () => {
      routes.forEach((route) => {
        const parsed = parseRoute(route);
        const screenshotRule = parsed ? getConfig(SCREENSHOT_RULES, parsed.path) : undefined;
        const a11yRule = parsed ? getConfig(A11Y_RULES, parsed.path) : undefined;
        const runScreenshot = parsed ? (screenshotRule?.enabled ?? true) : true;
        const runA11y = a11yRule?.enabled === true;
        if (!runScreenshot && !runA11y) {
          return;
        }

        let action;
        if (runA11y && runScreenshot) {
          action = 'creates screenshots and runs a11y on';
        } else if (runA11y) {
          action = 'runs a11y on';
        } else {
          action = 'creates screenshots of';
        }

        test(
          `${action} ${route}`,
          { timeout: process.env.PWDEBUG ? 0 : undefined },
          async ({ pooled, task }) => {
            const { page } = pooled;
            // Apply per-route viewport before rendering so the composite
            // renders at its desktop breakpoint. Routes without a matching
            // rule fall back to DEFAULT_VIEWPORT — important when the page
            // comes from a pool and may have been resized by a prior test.
            await page.setViewportSize(screenshotRule?.viewport ?? DEFAULT_VIEWPORT);
            const testcase = await renderFixture(page, route);

            if (screenshotRule?.waitForSelector) {
              await page.waitForSelector(screenshotRule.waitForSelector);
            }

            // Run axe before the screenshot (if any) so it observes the natural
            // DOM — Playwright's `animations: 'disabled'` injects inline
            // `!important` styles that otherwise perturb rule applicability.
            if (runA11y) {
              // Inject axe fresh each run — page.addScriptTag can leak between navigations.
              await page.evaluate(axeSource);
              const results = await page.evaluate(
                async ({ element, disabledRules, tags }) => {
                  window.axe.configure({
                    rules: disabledRules.map((id) => ({ id, enabled: false })),
                  });
                  return window.axe.run(element, {
                    runOnly: { type: 'tag', values: tags },
                  });
                },
                { element: testcase, disabledRules: GLOBAL_DISABLED_RULES, tags: WCAG_TAGS },
              );
              recordA11y({ task }, results, {
                slug: parsed.slug,
                demo: parsed.demo,
                skipAssertions: a11yRule.skipAssertions,
              });
            }

            if (runScreenshot) {
              await takeScreenshot(page, { testcase, route });
            }
          },
        );
      });
    });

    describe('Rating', () => {
      test('should handle focus-visible correctly', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(page, '/regression-Rating/FocusVisibleRating');
        await page.keyboard.press('Tab');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/FocusVisibleRating2',
        });
        await page.keyboard.press('ArrowLeft');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/FocusVisibleRating3',
        });
      });

      test('should handle focus-visible with precise ratings correctly', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(page, '/regression-Rating/PreciseFocusVisibleRating');
        await page.keyboard.press('Tab');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/PreciseFocusVisibleRating2',
        });
        await page.keyboard.press('ArrowRight');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/PreciseFocusVisibleRating3',
        });
      });
    });

    describe('Autocomplete', () => {
      test('should not close immediately when textbox expands', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(
          page,
          '/regression-Autocomplete/TextboxExpandsOnListboxOpen',
        );
        await page.getByRole('combobox').click();
        await page.waitForTimeout(10);
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Autocomplete/TextboxExpandsOnListboxOpen2',
        });
      });

      test('should style virtualized listbox correctly', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(page, '/regression-Autocomplete/Virtualize');
        await page.getByRole('combobox').click();
        await takeScreenshot(page, { testcase, route: '/regression-Autocomplete/Virtualize2' });
        await page.hover('[role="option"]');
        await takeScreenshot(page, { testcase, route: '/regression-Autocomplete/Virtualize3' });
        await page.click('[role="option"]');
        await takeScreenshot(page, { testcase, route: '/regression-Autocomplete/Virtualize4' });
      });
    });

    describe('Switch', () => {
      test('should render standard variant correctly in forced-colors mode', async ({ pooled }) => {
        const { page } = pooled;
        await page.emulateMedia({ forcedColors: 'active' });
        try {
          const testcase = await renderFixture(page, '/regression-Switch/SimpleSwitch');
          await takeScreenshot(page, {
            testcase,
            route: '/regression-Switch/SimpleSwitchForcedColors',
          });
        } finally {
          await page.emulateMedia({ forcedColors: 'none' });
        }
      });
    });

    describe('TextField', () => {
      test('should render standard variant correctly in forced-colors mode', async ({ pooled }) => {
        const { page } = pooled;
        await page.emulateMedia({ forcedColors: 'active' });
        try {
          const testcase = await renderFixture(page, '/regression-TextField/StandardTextField');
          await takeScreenshot(page, {
            testcase,
            route: '/regression-TextField/StandardTextFieldForcedColors',
          });
        } finally {
          await page.emulateMedia({ forcedColors: 'none' });
        }
      });
    });

    describe('Textarea', () => {
      test('should keep input caret position at the end when adding a newline', async ({
        pooled,
      }) => {
        const { page } = pooled;
        await renderFixture(page, '/regression-Textarea/TextareaAutosize');
        await page.getByTestId('input').focus();

        const textWithEndline = `abc def abc def abc def\n`;
        await page.evaluate((text) => {
          navigator.clipboard.writeText(text);
        }, textWithEndline);

        const pasteCommand = process.platform === 'darwin' ? 'Meta+V' : 'Control+V';

        await page.keyboard.press(pasteCommand);
        await page.keyboard.press(pasteCommand);
        await page.keyboard.press(pasteCommand);

        await page.evaluate(() => {
          const textarea = document.querySelector('textarea');
          if (textarea.selectionStart !== textarea.value.length) {
            throw new Error('The caret is not at the end of the textarea');
          }
        });
      });
    });
  });
}

function createPagePool(factory) {
  const all = new Set();
  const available = [];

  return {
    async acquire() {
      const existing = available.shift();
      if (existing) {
        return existing;
      }
      const page = await factory();
      all.add(page);
      return page;
    },
    release(page) {
      available.push(page);
    },
    async closeAll() {
      const pages = Array.from(all);
      all.clear();
      available.length = 0;
      await Promise.all(pages.map((page) => page.close()));
    },
  };
}

await main();
