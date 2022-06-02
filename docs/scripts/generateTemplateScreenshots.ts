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
  // eslint-disable-next-line no-console
  console.info('host:', host);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 800 } });

  try {
    await Promise.resolve().then(() =>
      urls.reduce(async (sequence, aUrl) => {
        await sequence;
        await page.goto(`${host}${aUrl}`);

        const filePath = aUrl.replace(/\/$/, '');
        // eslint-disable-next-line no-console
        console.info('Saving screenshot to:', filePath);
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  await browser.close();
})();
