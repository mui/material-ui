import * as fse from 'fs-extra';
import * as path from 'path';
import * as playwright from 'playwright';

async function main() {
  const baseUrl = 'http://localhost:5000';
  const screenshotDir = path.resolve(__dirname, './screenshots/chrome');

  const browser = await playwright.chromium.launch({ args: ['--no-sandbox'] });

  // reuse viewport from `vrtest`
  // https://github.com/nathanmarks/vrtest/blob/1185b852a6c1813cedf5d81f6d6843d9a241c1ce/src/server/runner.js#L44
  const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });

  // prevent flaky tests using assets
  await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());

  // Wait for all requests to finish.
  // This should load shared ressources such as fonts.
  await page.goto(baseUrl, { waitUntil: 'networkidle0' });
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
        await page.waitForSelector('[data-testid="testcase"]');

        const clip = await page.$eval('[data-testid="testcase"]', (element) => {
          const bbox = element.getBoundingClientRect();

          return { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height };
        });
        const screenshotPath = path.resolve(screenshotDir, `${route.replace(baseUrl, '.')}.png`);
        await fse.ensureDir(path.dirname(screenshotPath));
        await page.screenshot({ clip, path: screenshotPath, type: 'png' });
      });
    });
  });

  run();
}

main();
