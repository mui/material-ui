import { expect } from 'chai';
import * as playwright from 'playwright';

function sleep(timeoutMS: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeoutMS);
  });
}

/**
 * Attempts page.goto with retries
 *
 * @remarks The server and runner can be started up simultaneously
 * @param page
 * @param url
 */
async function attemptGoto(page: playwright.Page, url: string): Promise<boolean> {
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

describe('e2e', () => {
  const baseUrl = 'http://localhost:5000';
  let browser: playwright.Browser;
  let page: playwright.Page;

  async function renderFixture(fixturePath: string) {
    await page.goto(`${baseUrl}/e2e/${fixturePath}#no-dev`);
  }

  before(async function beforeHook() {
    this.timeout(20000);

    browser = await playwright.chromium.launch({
      headless: true,
    });
    page = await browser.newPage();
    const isServerRunning = await attemptGoto(page, `${baseUrl}#no-dev`);
    if (!isServerRunning) {
      throw new Error(
        `Unable to navigate to ${baseUrl} after multiple attempts. Did you forget to run \`yarn test:e2e:server\` and \`yarn test:e2e:build\`?`,
      );
    }
  });

  after(async () => {
    await browser.close();
  });

  describe('<TrapFocus />', () => {
    it('should loop the tab key', async () => {
      await renderFixture('Unstable_TrapFocus/OpenTrapFocus');

      expect(
        await page.evaluate(() => document.activeElement?.getAttribute('data-testid')),
      ).to.equal('root');

      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('x');
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('cancel');
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('ok');
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('x');

      await page.focus('[data-testid="initial-focus"]');
      expect(
        await page.evaluate(() => document.activeElement?.getAttribute('data-testid')),
      ).to.equal('root');
      await page.focus('text=x');
      await page.keyboard.press('Shift+Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('ok');
    });

    it('should focus on first focus element after last has received a tab click', async () => {
      await renderFixture('Unstable_TrapFocus/OpenTrapFocus');

      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('x');
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('cancel');
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.textContent)).to.equal('ok');
    });
  });

  describe('styled-engine', () => {
    it('should forward classes to slots', async () => {
      await renderFixture('styled-engine/ClassesPropsTest');

      // root has the correct class
      expect(
        await page.evaluate(() => document.getElementsByClassName('MuiParent-root')[0]?.classList.contains('root')),
      ).to.equal(true);

      // child has the correct class
      expect(
        await page.evaluate(() => document.getElementsByClassName('MuiChild-root')[0]?.classList.contains('slot')),
      ).to.equal(true);

      // none of the elements should have the classes attribute
      expect(
        await page.evaluate(() => document.querySelectorAll('[classes]').length)
      ).to.equal(0);
    });
  });
});
