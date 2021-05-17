const playwright = require('playwright');

async function main() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  page.on('console', consoleMessage => {
    console.log(consoleMessage.type())
    throw new Error(`Expect no console messages`)
  })
  await page.goto('http://localhost:3000/');
  try {
    await page.waitForSelector('button', { timeout: 100 });
  } catch (error) {
    throw new Error(
      `Unable to find <button> on the page. This probably indicates the page wasn't rendered correctly.`,
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
