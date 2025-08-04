const { chromium } = require('@playwright/test');

/**
 * @param {number} timeoutMS
 * @returns {Promise<void>}
 */
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * Attempts page.goto with retries
 *
 * @remarks The server and runner can be started up simultaneously
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 * @returns {boolean}
 */
async function attemptGoto(page, url) {
  const maxAttempts = 10;
  const retryTimeoutMS = 250;

  let didNavigate = false;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await page.goto(url);
      didNavigate = true;
    } catch (error) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(retryTimeoutMS);
    }
  }

  return didNavigate;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', (consoleMessage) => {
    throw new Error(
      `Expected no console messages but got ${consoleMessage.type()}: '${consoleMessage.text()}' `,
    );
  });
  await attemptGoto(page, 'http://localhost:9000/gatsby.fixture');

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
