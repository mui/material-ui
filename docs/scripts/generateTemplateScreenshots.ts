import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

/**
 * README
 *
 * Usage:
 * - `yarn screenshot` to generate all screenshots
 * - `yarn screenshot material-ui` to generate all screenshots for Material-UI templates
 * - `yarn screenshot order-dashboard` to generate screenshots for file named `order-dashboard.tsx`
 * - `yarn screenshot material-ui dashboard` to generate screenshots for file named `dashboard.tsx` of Material UI templates
 *
 * Note:
 * - The screenshot with `-dark` suffix is generated if the page has a button with id `toggle-mode`
 *   <button data-screenshot="toggle-mode" onClick={toggleMode}>Toggle Mode</button>
 *
 * - The screenshot with `-default` suffix is generated if the page has a button with id `toggle-default-theme`
 *   <button data-screenshot="toggle-default-theme" onClick={toggleDefaultTheme}>Toggle Default Theme</button>
 *
 * - The screenshot with `-default-dark` suffix is generated if the page has both buttons
 *
 * Debug:
 * - Set `chromium.launch({ headless: false })` in line:50 to see the browser
 */

const host = process.env.DEPLOY_PREVIEW || 'http://localhost:3000';

/**
 * project key should be `mui.com/<project-key>/*`
 */
const projects = {
  'material-ui': {
    input: path.join(process.cwd(), 'docs/pages/material-ui/getting-started/templates'),
    output: 'docs/public/static/screenshots',
    viewport: { width: 1680, height: 1092 },
  },
  'joy-ui': {
    input: path.join(process.cwd(), 'docs/pages/joy-ui/getting-started/templates'),
    output: 'docs/public/static/screenshots',
    viewport: { width: 1600, height: 800 },
  },
};

const names = new Set(process.argv.slice(2));

(async () => {
  // eslint-disable-next-line no-console
  console.info('Host:', host);
  const browser = await chromium.launch({ headless: true });

  await Promise.all(
    Object.entries(projects)
      .filter(([project]) => names.size === 0 || names.has(project))
      .map(async ([project, { input, output, viewport }]) => {
        const page = await browser.newPage({
          viewport,
          reducedMotion: 'reduce',
        });

        names.delete(project);

        const files = await fs.readdir(input);
        const urls = files
          .filter(
            (file) =>
              !file.startsWith('index') &&
              (names.size === 0 || names.has(file.replace(/\.(js|tsx)$/, ''))),
          )
          .map(
            (file) => `/${project}/getting-started/templates/${file.replace(/\.(js|tsx)$/, '/')}`,
          );

        async function captureDarkMode(outputPath: string) {
          const btn = await page.$('[data-screenshot="toggle-mode"]');
          if (btn) {
            await page.click('[data-screenshot="toggle-mode"]');
            await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
            await page.screenshot({
              path: outputPath,
              animations: 'disabled',
            });

            await page.click('[data-screenshot="toggle-mode"]'); // switch back to light
          }
        }

        try {
          await Promise.resolve().then(() =>
            urls.reduce(async (sequence, aUrl) => {
              await sequence;
              await page.goto(`${host}${aUrl}`, { waitUntil: 'networkidle' });

              const filePath = `${output}${aUrl.replace(/\/$/, '')}.jpg`;
              // eslint-disable-next-line no-console
              console.info('Saving screenshot to:', filePath);
              await page.screenshot({ path: filePath, animations: 'disabled' });

              await captureDarkMode(filePath.replace('.jpg', '-dark.jpg'));

              // capture custom theme
              const toggleTheme = await page.$('[data-screenshot="toggle-default-theme"]');
              if (toggleTheme) {
                await page.click('[data-screenshot="toggle-default-theme"]');
                await page.screenshot({
                  path: filePath.replace('.jpg', '-default.jpg'),
                  animations: 'disabled',
                });

                await captureDarkMode(filePath.replace('.jpg', '-default-dark.jpg'));
              }

              return Promise.resolve();
            }, Promise.resolve()),
          );
        } catch (error) {
          console.error(error);
        }
      }),
  );

  await browser.close();
})();
