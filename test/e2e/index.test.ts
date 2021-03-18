import { expect } from 'chai';
import * as playwright from 'playwright';

describe('e2e', () => {
  const baseUrl = 'http://localhost:5000';
  let browser: playwright.Browser;
  let page: playwright.Page;

  async function renderFixture(fixturePath) {
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
});
