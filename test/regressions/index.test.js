import * as url from 'url';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as playwright from 'playwright';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

async function main() {
  const baseUrl = 'http://localhost:5001';
  const screenshotDir = path.resolve(currentDirectory, './screenshots/chrome');

  const browser = await playwright.chromium.launch({
    args: ['--font-render-hinting=none'],
    // otherwise the loaded google Roboto font isn't applied
    headless: false,
  });
  // reuse viewport from `vrtest`
  // https://github.com/nathanmarks/vrtest/blob/1185b852a6c1813cedf5d81f6d6843d9a241c1ce/src/server/runner.js#L44
  const page = await browser.newPage({
    viewport: { width: 1000, height: 700 },
    reducedMotion: 'reduce',
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

  let routes = await page.$$eval('#tests a', (links) => {
    return links.map((link) => link.href);
  });
  routes = routes.map((route) => route.replace(baseUrl, ''));

  /**
   * @param {string} route
   */
  async function renderFixture(route) {
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

  async function takeScreenshot({ testcase, route }) {
    const screenshotPath = path.resolve(screenshotDir, `.${route}.png`);
    await fse.ensureDir(path.dirname(screenshotPath));

    const explicitScreenshotTarget = await page.$('[data-testid="screenshot-target"]');
    const screenshotTarget = explicitScreenshotTarget || testcase;

    await screenshotTarget.screenshot({
      path: screenshotPath,
      type: 'png',
      animations: 'disabled',
    });
  }

  // prepare screenshots
  await fse.emptyDir(screenshotDir);

  describe('visual regressions', () => {
    beforeEach(async () => {
      await page.evaluate(() => {
        localStorage.clear();
      });
    });

    after(async () => {
      await browser.close();
    });

    routes.forEach((route) => {
      it(`creates screenshots of ${route}`, async function test() {
        // With the playwright inspector we might want to call `page.pause` which would lead to a timeout.
        if (process.env.PWDEBUG) {
          this.timeout(0);
        }

        const testcase = await renderFixture(route);
        await takeScreenshot({ testcase, route });
      });
    });

    describe('Rating', () => {
      it('should handle focus-visible correctly', async () => {
        const testcase = await renderFixture('/regression-Rating/FocusVisibleRating');
        await page.keyboard.press('Tab');
        await takeScreenshot({ testcase, route: '/regression-Rating/FocusVisibleRating2' });
        await page.keyboard.press('ArrowLeft');
        await takeScreenshot({ testcase, route: '/regression-Rating/FocusVisibleRating3' });
      });

      it('should handle focus-visible with precise ratings correctly', async () => {
        const testcase = await renderFixture('/regression-Rating/PreciseFocusVisibleRating');
        await page.keyboard.press('Tab');
        await takeScreenshot({ testcase, route: '/regression-Rating/PreciseFocusVisibleRating2' });
        await page.keyboard.press('ArrowRight');
        await takeScreenshot({ testcase, route: '/regression-Rating/PreciseFocusVisibleRating3' });
      });
    });

    describe('Autocomplete', () => {
      it('should not close immediately when textbox expands', async () => {
        const testcase = await renderFixture(
          '/regression-Autocomplete/TextboxExpandsOnListboxOpen',
        );
        await page.getByRole('combobox').click();
        await page.waitForTimeout(10);
        await takeScreenshot({
          testcase,
          route: '/regression-Autocomplete/TextboxExpandsOnListboxOpen2',
        });
      });

      it('should style virtualized listbox correctly', async () => {
        const testcase = await renderFixture('/regression-Autocomplete/Virtualize');
        await page.getByRole('combobox').click();
        await takeScreenshot({ testcase, route: '/regression-Autocomplete/Virtualize2' });
        await page.hover('[role="option"]');
        await takeScreenshot({ testcase, route: '/regression-Autocomplete/Virtualize3' });
        await page.click('[role="option"]');
        await takeScreenshot({ testcase, route: '/regression-Autocomplete/Virtualize4' });
      });
    });
  });

  run();
}

main().catch((error) => {
  // error during setup.
  // Throwing lets mocha hang.
  console.error(error);
  process.exit(1);
});
