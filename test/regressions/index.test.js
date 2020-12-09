import * as fse from 'fs-extra';
import * as path from 'path';
import * as playwright from 'playwright';

async function main() {
  const baseUrl = 'http://localhost:5000';
  const screenshotDir = path.resolve(__dirname, './screenshots/chrome');

  const browser = await playwright.chromium.launch({
    args: ['--font-render-hinting=none'],
    // otherwise the loaded google Roboto font isn't applied
    headless: false,
  });
  // reuse viewport from `vrtest`
  // https://github.com/nathanmarks/vrtest/blob/1185b852a6c1813cedf5d81f6d6843d9a241c1ce/src/server/runner.js#L44
  const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });

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
  // This should load shared ressources such as fonts.
  await page.goto(`${baseUrl}#no-dev`, { waitUntil: 'networkidle0' });
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

  const routes = await page.$$eval('#tests a', (links) => {
    return links.map((link) => {
      return link.href;
    });
  });

  // prepare screenshots
  await fse.emptyDir(screenshotDir);

  describe('visual regressions', () => {
    after(async () => {
      await browser.close();
    });

    routes.forEach((route, index) => {
      it(`creates screenshots of ${route.replace(baseUrl, '')}`, async () => {
        // Use client-side routing which is much faster than full page navigation via page.goto().
        // Could become an issue with test isolation.
        // If tests are flaky due to global pollution switch to page.goto(route);
        // puppeteers built-in click() times out
        await page.$eval(`#tests li:nth-of-type(${index + 1}) a`, (link) => {
          link.click();
        });
        // Move cursor offscreen to not trigger unwanted hover effects.
        page.mouse.move(0, 0);

        const testcase = await page.waitForSelector(
          '[data-testid="testcase"]:not([aria-busy="true"])',
        );
        const clip = await testcase.boundingBox();

        const screenshotPath = path.resolve(screenshotDir, `${route.replace(baseUrl, '.')}.png`);
        await fse.ensureDir(path.dirname(screenshotPath));
        // Testcase.screenshot would resize the viewport to the element bbox.
        await page.screenshot({ clip, path: screenshotPath, type: 'png' });
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
