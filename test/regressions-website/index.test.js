import * as fse from 'fs-extra';
import * as path from 'path';
import * as playwright from 'playwright';

async function main() {
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com';
  const screenshotDir = path.resolve(__dirname, './screenshots/chrome');

  const browser = await playwright.chromium.launch({
    args: ['--font-render-hinting=none'],
    // otherwise the loaded google Roboto font isn't applied
    headless: false,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // prepare screenshots
  await fse.emptyDir(screenshotDir);

  ['/', '/#main-content'].forEach((route) => {
    it(`creates screenshots of ${route}`, async function test() {
      await page.goto(baseUrl, { waitUntil: 'networkidle0' });

      const [pathname, targetId] = route.split('#');
      const elm = targetId ? await page.waitForSelector(`#${targetId}`) : page;
      const screenshotPath = path.resolve(screenshotDir, `.${pathname}${targetId || 'page'}.png`);
      await fse.ensureDir(path.dirname(screenshotPath));

      await elm.screenshot({ path: screenshotPath, type: 'png' });
    });
  });

  await browser.close();

  run();
}

main().catch((error) => {
  // error during setup.
  // Throwing lets mocha hang.
  console.error(error);
  process.exit(1);
});
