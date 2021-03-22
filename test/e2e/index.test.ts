import { expect } from 'chai';
import * as playwright from 'playwright';

describe('e2e', () => {
  const baseUrl = 'http://localhost:5000';
  let browser: playwright.Browser;
  let page: playwright.Page;

  async function renderFixture(fixturePath: string) {
    await page.goto(`${baseUrl}/e2e/${fixturePath}#no-dev`);
  }

  before(async () => {
    browser = await playwright.chromium.launch({
      headless: true,
    });
    page = await browser.newPage();
    await page.goto(`${baseUrl}#no-dev`);
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
});
