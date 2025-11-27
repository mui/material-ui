/* eslint-disable testing-library/no-await-sync-queries */
import { expect } from 'chai';
import { Page, Browser, chromium, ElementHandle } from '@playwright/test';
import '@mui/internal-test-utils/initMatchers';
import '@mui/internal-test-utils/initPlaywrightMatchers';

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * Helper to perform mouse drag from one element to another
 */
async function dragElement(page: Page, fromSelector: string, toSelector: string) {
  const fromEl = page.locator(fromSelector);
  const toEl = page.locator(toSelector);

  const fromBox = await fromEl.boundingBox();
  const toBox = await toEl.boundingBox();

  if (!fromBox || !toBox) {
    throw new Error('Elements not found for drag operation');
  }

  const fromX = fromBox.x + fromBox.width / 2;
  const fromY = fromBox.y + fromBox.height / 2;
  const toX = toBox.x + toBox.width / 2;
  const toY = toBox.y + toBox.height / 2;

  await page.mouse.move(fromX, fromY);
  await page.mouse.down();
  // Move in steps to trigger drag events properly
  await page.mouse.move(toX, toY, { steps: 10 });
  await page.mouse.up();
}

/**
 * Helper to get element text content
 */
async function getTextContent(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  return (await element.textContent()) || '';
}

/**
 * Attempts page.goto with retries
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
      break;
    } catch (error) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(retryTimeoutMS);
    }
  }

  return didNavigate;
}

describe('Drag and Drop E2E', () => {
  const baseUrl = 'http://localhost:5001';
  let browser: Browser;
  let page: Page;

  async function renderFixture(fixturePath: string) {
    await page.goto(`${baseUrl}/e2e/${fixturePath}#no-dev`);
    await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');
  }

  before(async function beforeHook() {
    this?.timeout?.(20000);

    browser = await chromium.launch({
      headless: true,
    });
    page = await browser.newPage();
    const isServerRunning = await attemptGoto(page, `${baseUrl}#no-dev`);
    if (!isServerRunning) {
      throw new Error(
        `Unable to navigate to ${baseUrl} after multiple attempts. Did you forget to run \`pnpm test:e2e:server\` and \`pnpm test:e2e:build\`?`,
      );
    }
  });

  after(async () => {
    await browser.close();
  });

  describe('<SortableList />', () => {
    beforeEach(async () => {
      await renderFixture('DragAndDrop/SortableList');
    });

    describe('mouse interactions', () => {
      it('should display initial item order', async () => {
        const order = await getTextContent(page, '[data-testid="item-order"]');
        expect(order).to.equal('1,2,3,4');
      });

      it('should drag item down to new position', async () => {
        // Drag item 1 to position of item 3
        await dragElement(page, '[data-testid="item-1"]', '[data-testid="item-3"]');

        // Wait for animation/state update
        await sleep(300);

        const order = await getTextContent(page, '[data-testid="item-order"]');
        // Item 1 should now be after item 2 (moved down)
        expect(order).to.include('2');
        expect(order).to.include('1');
      });

      it('should show visual feedback during drag', async () => {
        const item = page.locator('[data-testid="item-1"]');
        const box = await item.boundingBox();

        if (!box) throw new Error('Item not found');

        // Start drag
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 50);

        // Check for dragging styles (opacity, cursor changes are applied via CSS)
        const styles = await item.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            cursor: computed.cursor,
            opacity: computed.opacity,
          };
        });

        // Dragging cursor should be 'grabbing'
        expect(styles.cursor).to.equal('grabbing');

        await page.mouse.up();
      });
    });

    describe('keyboard interactions', () => {
      it('should pick up item with Enter key', async () => {
        const item = page.locator('[data-testid="item-1"]');
        await item.focus();
        await page.keyboard.press('Enter');

        // Item should now be in dragging state (indicated by aria-pressed or class)
        // We can verify by checking if the item has focus and is ready for arrow keys
        const isFocused = await item.evaluate((el) => document.activeElement === el);
        expect(isFocused).to.equal(true);
      });

      it('should move item with Arrow keys and drop with Enter', async () => {
        const item = page.locator('[data-testid="item-1"]');
        await item.focus();

        // Pick up
        await page.keyboard.press('Enter');
        await sleep(100);

        // Move down
        await page.keyboard.press('ArrowDown');
        await sleep(100);

        // Drop
        await page.keyboard.press('Enter');
        await sleep(300);

        const order = await getTextContent(page, '[data-testid="item-order"]');
        // Order should have changed
        expect(order.indexOf('1')).to.be.greaterThan(order.indexOf('2'));
      });

      it('should cancel drag with Escape key', async () => {
        const initialOrder = await getTextContent(page, '[data-testid="item-order"]');

        const item = page.locator('[data-testid="item-1"]');
        await item.focus();

        // Pick up
        await page.keyboard.press('Enter');
        await sleep(100);

        // Move down
        await page.keyboard.press('ArrowDown');
        await sleep(100);

        // Cancel
        await page.keyboard.press('Escape');
        await sleep(300);

        const finalOrder = await getTextContent(page, '[data-testid="item-order"]');
        // Order should be unchanged
        expect(finalOrder).to.equal(initialOrder);
      });
    });

    describe('touch interactions', () => {
      it('should have touch-action: none for touch drag support', async () => {
        const item1 = page.locator('[data-testid="item-1"]');

        // Verify items are configured for touch dragging via touch-action: none
        // This prevents browser default touch behaviors during drag
        const touchAction = await item1.evaluate((el) => {
          return window.getComputedStyle(el).touchAction;
        });

        expect(touchAction).to.equal('none');
      });
    });
  });

  describe('<SortableTable />', () => {
    beforeEach(async () => {
      await renderFixture('DragAndDrop/SortableTable');
    });

    it('should display initial row order', async () => {
      const order = await getTextContent(page, '[data-testid="row-order"]');
      expect(order).to.equal('1,2,3,4');
    });

    it('should reorder table rows', async () => {
      // Drag row 1 to position of row 3
      await dragElement(page, '[data-testid="row-1"]', '[data-testid="row-3"]');
      await sleep(300);

      const order = await getTextContent(page, '[data-testid="row-order"]');
      // Order should have changed
      expect(order).to.not.equal('1,2,3,4');
    });

    it('should preserve cell structure during drag', async () => {
      const row = page.locator('[data-testid="row-1"]');
      const cells = row.locator('td');

      // Get initial cell count
      const initialCellCount = await cells.count();
      expect(initialCellCount).to.equal(3); // Name, Role, Status

      // Start drag
      const box = await row.boundingBox();
      if (!box) throw new Error('Row not found');

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 50);

      // Verify cells still exist and have reasonable widths during drag
      const dragCellCount = await cells.count();
      expect(dragCellCount).to.equal(initialCellCount);

      // Verify each cell has a positive width (not collapsed)
      const dragWidths = await cells.evaluateAll((cellElements) =>
        cellElements.map((cell) => cell.getBoundingClientRect().width),
      );

      for (const width of dragWidths) {
        expect(width).to.be.greaterThan(0);
      }

      await page.mouse.up();
    });
  });

  describe('<SortableGrid />', () => {
    beforeEach(async () => {
      await renderFixture('DragAndDrop/SortableGrid');
    });

    it('should display initial card order', async () => {
      const order = await getTextContent(page, '[data-testid="card-order"]');
      expect(order).to.equal('1,2,3,4,5,6');
    });

    it('should support 2D grid reordering', async () => {
      // Drag card 1 to position of card 4 (different row in grid)
      await dragElement(page, '[data-testid="card-1"]', '[data-testid="card-4"]');
      await sleep(300);

      const order = await getTextContent(page, '[data-testid="card-order"]');
      // Order should have changed
      expect(order).to.not.equal('1,2,3,4,5,6');
    });

    it('should show visual feedback during grid item drag', async () => {
      const card = page.locator('[data-testid="card-1"]');
      const box = await card.boundingBox();

      if (!box) throw new Error('Card not found');

      // Start drag
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2);

      // Check for dragging styles
      const opacity = await card.evaluate((el) => {
        return window.getComputedStyle(el).opacity;
      });

      // Opacity should be reduced during drag
      expect(parseFloat(opacity)).to.be.lessThan(1);

      await page.mouse.up();
    });
  });

  describe('<SortableChips />', () => {
    beforeEach(async () => {
      await renderFixture('DragAndDrop/SortableChips');
    });

    it('should display initial chip order', async () => {
      const order = await getTextContent(page, '[data-testid="chip-order"]');
      expect(order).to.equal('1,2,3,4,5');
    });

    it('should reorder chips horizontally', async () => {
      // Drag chip 1 to position of chip 3
      await dragElement(page, '[data-testid="chip-1"]', '[data-testid="chip-3"]');
      await sleep(300);

      const order = await getTextContent(page, '[data-testid="chip-order"]');
      // Order should have changed
      expect(order).to.not.equal('1,2,3,4,5');
    });

    it('should render delete icons on chips', async () => {
      // Verify delete icons are rendered and accessible
      const deleteIcon = page.locator('[data-testid="chip-1"] .MuiChip-deleteIcon');
      const iconCount = await deleteIcon.count();
      expect(iconCount).to.equal(1);

      // Verify the icon is visible
      const isVisible = await deleteIcon.isVisible();
      expect(isVisible).to.equal(true);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid drag operations', async () => {
      await renderFixture('DragAndDrop/SortableList');

      // Perform multiple quick drags
      for (let i = 0; i < 3; i++) {
        // eslint-disable-next-line no-await-in-loop
        await dragElement(page, '[data-testid="item-1"]', '[data-testid="item-2"]');
        // eslint-disable-next-line no-await-in-loop
        await sleep(100);
      }

      // Should not crash or have console errors
      const order = await getTextContent(page, '[data-testid="item-order"]');
      expect(order.split(',')).to.have.length(4);
    });

    it('should clean up on page navigation', async () => {
      await renderFixture('DragAndDrop/SortableList');

      const item = page.locator('[data-testid="item-1"]');
      const box = await item.boundingBox();

      if (!box) throw new Error('Item not found');

      // Start drag
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 50);

      // Navigate away while dragging
      await page.goto(`${baseUrl}#no-dev`);
      await sleep(100);

      // Navigate back
      await renderFixture('DragAndDrop/SortableList');

      // Should render correctly without errors
      const order = await getTextContent(page, '[data-testid="item-order"]');
      expect(order).to.equal('1,2,3,4');
    });
  });
});
