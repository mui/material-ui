import { chromium } from 'playwright';

const host = process.env.PR_NUMBER
  ? `https://deploy-preview-${process.env.PR_NUMBER}--material-ui.netlify.app`
  : 'http://localhost:3000';
const directory = 'docs/public/static/screenshots';

const urls = [
  '/joy-ui/getting-started/templates/email/',
  '/joy-ui/getting-started/templates/files/',
  '/joy-ui/getting-started/templates/team/',
];

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1600, height: 800 } });

    await Promise.resolve().then(() =>
      urls.reduce(async (sequence, aUrl) => {
        await sequence;
        await page.goto(`${host}${aUrl}`);

        const filePath = aUrl.replace(/(.*)\/?$/, '$1');
        await page.screenshot({ path: `${directory}${filePath}.png` });

        // capture dark mode
        const toggle = await page.$('#toggle-mode');
        if (toggle) {
          await page.click('#toggle-mode');
          await page.screenshot({ path: `${directory}${filePath}-dark.png` });
        }

        return Promise.resolve();
      }, Promise.resolve()),
    );

    await browser.close();
  } catch (error) {
    throw new Error(error);
  }
})();
