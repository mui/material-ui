import { Page, Browser, chromium, expect } from '@playwright/test';
import { describe, it, beforeAll } from 'vitest';
import '@mui/internal-test-utils/initPlaywrightMatchers';

const BASE_URL = 'http://localhost:5001';

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * Attempts page.goto with retries
 *
 * @remarks The server and runner can be started up simultaneously
 * @param page
 * @param url
 */
async function attemptGoto(page: Page, url: string): Promise<boolean> {
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
  let browser: Browser;
  let page: Page;

  async function renderFixture(fixturePath: string) {
    await page.goto(`${BASE_URL}/e2e/${fixturePath}#no-dev`);
    await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');
  }

  beforeAll(async function beforeHook() {
    browser = await chromium.launch({
      headless: true,
    });
    page = await browser.newPage();
    const isServerRunning = await attemptGoto(page, `${BASE_URL}#no-dev`);
    if (!isServerRunning) {
      throw new Error(
        `Unable to navigate to ${BASE_URL} after multiple attempts. Did you forget to run \`pnpm test:e2e:server\` and \`pnpm test:e2e:build\`?`,
      );
    }
  }, 20000);

  afterAll(async () => {
    await browser.close();
  });

  describe('<FocusTrap />', () => {
    it('should loop the tab key', async () => {
      await renderFixture('FocusTrap/OpenFocusTrap');

      await expect(page.getByTestId('root')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByText('confirm')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('cancel')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('ok')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('confirm')).toBeFocused();

      await page.getByTestId('initial-focus').focus();
      await expect(page.getByTestId('root')).toBeFocused();
      await page.getByText('confirm').focus();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('ok')).toBeFocused();
    });

    it('should loop the tab key after activation', async () => {
      await renderFixture('FocusTrap/DefaultOpenLazyFocusTrap');

      await expect(page.getByTestId('initial-focus')).toBeFocused();

      const close = page.getByRole('button', { name: 'close' });

      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('noop')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByTestId('initial-focus')).toBeFocused();
    });

    it('should focus on first focus element after last has received a tab click', async () => {
      await renderFixture('FocusTrap/OpenFocusTrap');

      await page.keyboard.press('Tab');
      await expect(page.getByText('confirm')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('cancel')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('ok')).toBeFocused();
    });

    it('should be able to be tabbed straight through when rendered closed', async () => {
      await renderFixture('FocusTrap/ClosedFocusTrap');

      await expect(page.getByText('initial focus')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('inside focusable')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('final tab target')).toBeFocused();
    });

    it('should not trap focus when clicking outside when disableEnforceFocus is set', async () => {
      await renderFixture('FocusTrap/DisableEnforceFocusFocusTrap');

      // initial focus is on the button outside of the trap focus
      await expect(page.getByTestId('initial-focus')).toBeFocused();

      // focus the button inside the trap focus
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('inside-trap-focus')).toBeFocused();

      // the focus is now trapped inside
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('inside-trap-focus')).toBeFocused();

      const initialFocus = (await page.getByTestId('initial-focus'))!;
      await initialFocus.click();

      await expect(page.getByTestId('initial-focus')).toBeFocused();
    });
  });

  describe('<Rating />', () => {
    it('should loop the arrow key', async () => {
      await renderFixture('Rating/BasicRating');

      const activeEl = page.locator(':focus');

      await page.focus('input[name="rating-test"]:checked');
      await expect(activeEl).toHaveAttribute('value', '1');
      await page.keyboard.press('ArrowLeft');
      await expect(activeEl).toHaveAttribute('value', '');
      await page.keyboard.press('ArrowLeft');
      await expect(activeEl).toHaveAttribute('value', '5');
    });
  });

  describe('<Autocomplete/>', () => {
    it('[Material Autocomplete] should highlight correct option when initial navigation through options starts from mouse move', async () => {
      await renderFixture('Autocomplete/HoverMaterialAutocomplete');

      const combobox = (await page.getByRole('combobox'))!;
      await combobox.click();

      const firstOption = (await page.getByText('one'))!;

      const dimensions = (await firstOption.boundingBox())!;

      await page.mouse.move(dimensions.x + 10, dimensions.y + 10); // moves to 1st option
      await page.keyboard.down('ArrowDown'); // moves to 2nd option
      await page.keyboard.down('ArrowDown'); // moves to 3rd option
      await page.keyboard.down('ArrowDown'); // moves to 4th option

      const listbox = await page.getByRole('listbox');
      const focusedOption = listbox.locator('.Mui-focused');
      const focusedOptionText = await focusedOption.innerHTML();

      expect(focusedOptionText).toEqual('four');
    });

    it('[Joy Autocomplete] should highlight correct option when initial navigation through options starts from mouse move', async () => {
      await renderFixture('Autocomplete/HoverJoyAutocomplete');

      const combobox = (await page.getByRole('combobox'))!;
      await combobox.click();

      const firstOption = (await page.getByText('one'))!;

      const dimensions = (await firstOption.boundingBox())!;

      await page.mouse.move(dimensions.x + 10, dimensions.y + 10); // moves to 1st option
      await page.keyboard.down('ArrowDown'); // moves to 2nd option
      await page.keyboard.down('ArrowDown'); // moves to 3rd option
      await page.keyboard.down('ArrowDown'); // moves to 4th option

      const listbox = await page.getByRole('listbox');
      const focusedOption = listbox.locator('.Mui-focused');
      const focusedOptionText = await focusedOption.innerHTML();

      expect(focusedOptionText).toEqual('four');
    });
  });

  describe('<TextareaAutosize />', () => {
    // https://github.com/mui/material-ui/issues/32640
    it('should handle suspense without error', async () => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.name));

      await renderFixture('TextareaAutosize/TextareaAutosizeSuspense');
      expect(await page.isVisible('textarea')).toEqual(true);
      await page.click('button');
      expect(await page.isVisible('textarea')).toEqual(false);
      await page.waitForTimeout(200); // Wait for debounce to fire (166)

      expect(pageErrors.length).toEqual(0);
    });

    it('should not glitch when resizing', async () => {
      await renderFixture('TextareaAutosize/BasicTextareaAutosize');

      const textarea = await page.getByTestId('textarea')!;

      // Get the element's dimensions
      const { x, y, width, height } = (await textarea.boundingBox())!;

      // Calculate coordinates of bottom-right corner
      const bottomRightX = x + width;
      const bottomRightY = y + height;

      // Get the initial height of textarea as a number
      const initialHeight = await textarea.evaluate((textareaElement) =>
        parseFloat(textareaElement.style.height),
      );

      // Move the mouse to the bottom-right corner, adjusting slightly to grab the resize handle
      await page.mouse.move(bottomRightX - 5, bottomRightY - 5);

      // Hold the mouse down without releasing the mouse button (mouseup) to grab the resize handle
      await page.mouse.down();

      // Move the mouse to resize the textarea
      await page.mouse.move(bottomRightX + 50, bottomRightY + 50);

      // Assert that the textarea height has increased after resizing
      expect(
        await textarea.evaluate((textareaElement) => parseFloat(textareaElement.style.height)),
      ).toBeGreaterThan(initialHeight);
    });
  });

  describe('<TextField />', () => {
    it('should fire `onClick` when clicking on the focused label position', async () => {
      await renderFixture('TextField/OutlinedTextFieldOnClick');

      // execute the click on the focused label position
      await page.getByRole('textbox').click({ position: { x: 10, y: 10 } });
      const errorSelector = page.locator('.MuiInputBase-root.Mui-error');
      await errorSelector.waitFor();
    });
  });
});
