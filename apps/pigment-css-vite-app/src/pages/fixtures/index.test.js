import * as path from 'path';
import * as fse from 'fs-extra';
import { chromium } from '@playwright/test';

async function main() {
  const baseUrl = 'http://localhost:5001/fixtures';
  const screenshotDir = path.resolve('test/regressions/screenshots/chrome');
  const browser = await chromium.launch({
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
  await page.goto(`${baseUrl}`, { waitUntil: 'networkidle0' });
  // If we still get flaky fonts after awaiting this try `document.fonts.ready`
  // await page.waitForSelector('[data-webfontloader="active"]', { state: 'attached' });

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

  async function renderFixture(index) {
    await page.evaluate(() => {
      // Playwright hides scrollbar when capturing a screenshot on an element or with fullPage: true.
      // When the body has a scrollbar, this causes a brief layout shift. Disable the body overflow
      // altogether to prevent this
      window.document.body.style.overflow = 'hidden';
    });

    // Use client-side routing which is much faster than full page navigation via page.goto().
    // Could become an issue with test isolation.
    // If tests are flaky due to global pollution switch to page.goto(route);
    // puppeteers built-in click() times out
    await page.$eval(`#tests li:nth-of-type(${index + 1}) a`, (link) => {
      link.click();
    });
    // Move cursor offscreen to not trigger unwanted hover effects.
    page.mouse.move(0, 0);

    const testcase = await page.waitForSelector('#root-demo');

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

  describe('visual regressions', () => {
    beforeEach(async () => {
      await page.evaluate(() => {
        localStorage.clear();
      });
    });

    after(async () => {
      await browser.close();
    });

    routes.forEach((route, index) => {
      it(`creates screenshots of ${route}`, async function test() {
        // With the playwright inspector we might want to call `page.pause` which would lead to a timeout.
        if (process.env.PWDEBUG) {
          this.timeout(0);
        }

        const testcase = await renderFixture(index);
        await takeScreenshot({ testcase, route });
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
