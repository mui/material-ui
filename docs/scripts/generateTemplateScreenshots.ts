import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

/**
 * Usage:
 * - `yarn screenshot` to generate all screenshots
 * - `yarn screenshot order-dashboard` to generate screenshots for `docs/pages/joy-ui/getting-started/templates/order-dashboard.tsx`
 * - `yarn screenshot [...templates]` to generate screenshots for the templates in `docs/pages/joy-ui/getting-started/templates/*`
 */

const host = process.env.DEPLOY_PREVIEW || 'http://localhost:3000';
const directory = 'docs/public/static/screenshots';

const names = new Set(process.argv.slice(2));

(async () => {
  // eslint-disable-next-line no-console
  console.info('Host:', host);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1600, height: 800 },
    reducedMotion: 'reduce',
  });

  const files = await fs.readdir(
    path.join(process.cwd(), 'docs/pages/joy-ui/getting-started/templates'),
  );
  const urls = files
    .filter(
      (file) =>
        !file.startsWith('index') &&
        (names.size === 0 || names.has(file.replace(/\.(js|tsx)$/, ''))),
    )
    .map((file) => `/joy-ui/getting-started/templates/${file.replace(/\.(js|tsx)$/, '/')}`);

  try {
    await Promise.resolve().then(() =>
      urls.reduce(async (sequence, aUrl) => {
        await sequence;
        await page.goto(`${host}${aUrl}`, { waitUntil: 'networkidle' });

        const filePath = `${directory}${aUrl.replace(/\/$/, '')}.jpg`;
        // eslint-disable-next-line no-console
        console.info('Saving screenshot to:', filePath);
        await page.screenshot({ path: filePath, animations: 'disabled' });

        // capture dark mode
        const toggle = await page.$('#toggle-mode');
        if (toggle) {
          await page.click('#toggle-mode');
          await page.reload({ waitUntil: 'networkidle' });
          await page.screenshot({
            path: filePath.replace('.jpg', '-dark.jpg'),
            animations: 'disabled',
          });

          await page.click('#toggle-mode'); // switch back to light
        }

        return Promise.resolve();
      }, Promise.resolve()),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  await browser.close();
})();
