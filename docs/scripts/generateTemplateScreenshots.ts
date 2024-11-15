import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

/**
 * README
 *
 * Usage:
 * - `pnpm template:screenshot` to generate all screenshots
 * - `pnpm template:screenshot material-ui` to generate all screenshots for Material-UI templates
 * - `pnpm template:screenshot order-dashboard` to generate screenshots for file named `order-dashboard.tsx`
 * - `pnpm template:screenshot material-ui dashboard` to generate screenshots for file named `dashboard.tsx` of Material UI templates
 * - `pnpm template:screenshot toolpad` to generate screenshots for Toolpad Core templates
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

interface ProjectConfig {
  input?: string;
  output?: string;
  externalInput?: string[];
  viewport?: {
    width: number;
    height: number;
  };
}

/**
 * project key should be `mui.com/<project-key>/*`
 */
const projects: Record<string, ProjectConfig> = {
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
  toolpad: {
    externalInput: [
      'https://deploy-preview-4415--mui-toolpad-docs.netlify.app/toolpad/core/templates/nextjs-dashboard',
    ],
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
      .map(async ([project, config]) => {
        const page = await browser.newPage({
          viewport: config.viewport,
          reducedMotion: 'reduce',
        });

        names.delete(project);

        let urls: string[];

        if (config.externalInput) {
          urls = config.externalInput;
        } else if (config.input) {
          const files = await fs.readdir(config.input);
          urls = files
            .filter(
              (file) =>
                !file.startsWith('index') &&
                (names.size === 0 || names.has(file.replace(/\.(js|tsx)$/, ''))),
            )
            .map(
              (file) => `/${project}/getting-started/templates/${file.replace(/\.(js|tsx)$/, '/')}`,
            );
        }
        async function captureDarkMode(outputPath: string) {
          const btn = await page.$('[data-screenshot="toggle-mode"]');
          if (btn) {
            if ((await btn.getAttribute('aria-haspopup')) === 'true') {
              await page.click('[data-screenshot="toggle-mode"]');
              await page.getByRole('menuitem').filter({ hasText: /dark/i }).click();
              await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
              await page.screenshot({
                path: outputPath,
                animations: 'disabled',
              });

              await page.click('[data-screenshot="toggle-mode"]');
              await page
                .getByRole('menuitem')
                .filter({ hasText: /system/i })
                .click(); // switch back to light
            } else if ((await btn.getAttribute('aria-haspopup')) === 'listbox') {
              await page.click('[data-screenshot="toggle-mode"]');
              await page.getByRole('option').filter({ hasText: /dark/i }).click();
              await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
              await page.screenshot({
                path: outputPath,
                animations: 'disabled',
              });

              await page.click('[data-screenshot="toggle-mode"]');
              await page
                .getByRole('option')
                .filter({ hasText: /system/i })
                .click(); // switch back to light
            } else {
              await page.click('[data-screenshot="toggle-mode"]');
              await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
              await page.screenshot({
                path: outputPath,
                animations: 'disabled',
              });

              await page.click('[data-screenshot="toggle-mode"]'); // switch back to light
            }
          }
        }

        try {
          await Promise.resolve().then(async () => {
            if (config.externalInput) {
              return Promise.all(
                config.externalInput.map(async (url) => {
                  await page.goto(url, { waitUntil: 'networkidle' });
                  const urlPath = new URL(url).pathname;
                  const filePath = `${config.output}${urlPath.replace(/\/$/, '')}.jpg`;
                  // eslint-disable-next-line no-console
                  console.info('Saving screenshot to:', filePath);
                  await page.screenshot({ path: filePath, animations: 'disabled' });
                }),
              );
            }

            return urls.reduce(async (sequence, aUrl) => {
              await sequence;
              await page.goto(`${host}${aUrl}?hideFrame=true`, { waitUntil: 'networkidle' });

              const filePath = `${config.output}${aUrl.replace(/\/$/, '')}.jpg`;
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
            }, Promise.resolve());
          });
        } catch (error) {
          console.error(error);
        }
      }),
  );

  await browser.close();
})();
