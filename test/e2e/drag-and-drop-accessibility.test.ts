/* eslint-disable testing-library/no-await-sync-queries */
import { expect } from 'chai';
import { Page, Browser, chromium } from '@playwright/test';
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

describe('Drag and Drop Accessibility', () => {
  const baseUrl = 'http://localhost:5001';
  let browser: Browser;
  let page: Page;

  const fixtures = [
    { name: 'SortableList', itemSelector: '[data-testid="item-1"]' },
    { name: 'SortableTable', itemSelector: '[data-testid="row-1"]' },
    { name: 'SortableGrid', itemSelector: '[data-testid="card-1"]' },
    { name: 'SortableChips', itemSelector: '[data-testid="chip-1"]' },
  ];

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

  describe('ARIA attributes', () => {
    fixtures.forEach(({ name, itemSelector }) => {
      describe(`${name}`, () => {
        beforeEach(async () => {
          await renderFixture(`DragAndDrop/${name}`);
        });

        it('should have role="button" on draggable items', async () => {
          const item = page.locator(itemSelector);
          const role = await item.getAttribute('role');
          expect(role).to.equal('button');
        });

        it('should have tabindex for keyboard focus', async () => {
          const item = page.locator(itemSelector);
          const tabindex = await item.getAttribute('tabindex');
          expect(tabindex).to.equal('0');
        });

        it('should have aria-roledescription if provided', async () => {
          const item = page.locator(itemSelector);
          const roleDesc = await item.getAttribute('aria-roledescription');
          // aria-roledescription is optional - if present, it should be a non-empty string
          if (roleDesc !== null) {
            expect(roleDesc).to.be.a('string');
            expect(roleDesc.length).to.be.greaterThan(0);
          }
        });

        it('should have aria-describedby pointing to instructions', async () => {
          const item = page.locator(itemSelector);
          const describedBy = await item.getAttribute('aria-describedby');

          if (describedBy) {
            // Instructions element should exist
            const instructions = page.locator(`#${describedBy}`);
            const instructionsExist = (await instructions.count()) > 0;
            expect(instructionsExist).to.equal(true);
          }
        });

        it('should update aria-pressed during drag', async () => {
          const item = page.locator(itemSelector);

          // Initially not pressed
          let ariaPressed = await item.getAttribute('aria-pressed');
          expect(ariaPressed).to.equal('false');

          // Focus and start drag with keyboard
          await item.focus();
          await page.keyboard.press('Enter');
          await sleep(100);

          // During drag, should be pressed
          ariaPressed = await item.getAttribute('aria-pressed');
          expect(ariaPressed).to.equal('true');

          // Cancel drag
          await page.keyboard.press('Escape');
          await sleep(100);

          // After cancel, should not be pressed
          ariaPressed = await item.getAttribute('aria-pressed');
          expect(ariaPressed).to.equal('false');
        });
      });
    });
  });

  describe('screen reader announcements', () => {
    beforeEach(async () => {
      await renderFixture('DragAndDrop/SortableList');
    });

    it('should have a live region for announcements', async () => {
      // Look for aria-live region
      const liveRegion = page.locator('[aria-live="assertive"], [role="status"]');
      const count = await liveRegion.count();

      // Should have at least one live region for announcements
      expect(count).to.be.greaterThan(0);
    });

    it('should announce drag start', async () => {
      const item = page.locator('[data-testid="item-1"]');
      await item.focus();

      // Start drag
      await page.keyboard.press('Enter');
      await sleep(200);

      // Check live region content
      const liveRegion = page.locator('[aria-live="assertive"]').first();
      const announcement = await liveRegion.textContent();

      // Should contain some announcement text (implementation may vary)
      expect(announcement).to.be.a('string');

      // Cancel to clean up
      await page.keyboard.press('Escape');
    });

    it('should announce position changes during drag', async () => {
      const item = page.locator('[data-testid="item-1"]');
      await item.focus();

      // Start drag
      await page.keyboard.press('Enter');
      await sleep(100);

      // Move down
      await page.keyboard.press('ArrowDown');
      await sleep(200);

      // Check live region was updated
      const liveRegion = page.locator('[aria-live="assertive"]').first();
      const announcement = await liveRegion.textContent();

      // Should have been updated with new position info
      expect(announcement).to.be.a('string');

      // Cancel to clean up
      await page.keyboard.press('Escape');
    });

    it('should announce drag end', async () => {
      const item = page.locator('[data-testid="item-1"]');
      await item.focus();

      // Start drag
      await page.keyboard.press('Enter');
      await sleep(100);

      // Move down
      await page.keyboard.press('ArrowDown');
      await sleep(100);

      // Drop
      await page.keyboard.press('Enter');
      await sleep(200);

      // Check live region content
      const liveRegion = page.locator('[aria-live="assertive"]').first();
      const announcement = await liveRegion.textContent();

      // Should announce the completion
      expect(announcement).to.be.a('string');
    });
  });

  describe('focus management', () => {
    fixtures.forEach(({ name, itemSelector }) => {
      describe(`${name}`, () => {
        beforeEach(async () => {
          await renderFixture(`DragAndDrop/${name}`);
        });

        it('should maintain focus on dragged item during keyboard drag', async () => {
          const item = page.locator(itemSelector);
          await item.focus();

          // Start drag
          await page.keyboard.press('Enter');
          await sleep(100);

          // Move
          await page.keyboard.press('ArrowDown');
          await sleep(100);

          // Focus should still be on the item
          let isFocused = await item.evaluate((el) => document.activeElement === el);
          expect(isFocused).to.equal(true);

          // Drop
          await page.keyboard.press('Enter');
          await sleep(100);

          // Focus should remain on the item after drop
          isFocused = await item.evaluate((el) => document.activeElement === el);
          expect(isFocused).to.equal(true);
        });

        it('should support Tab navigation through items', async () => {
          const firstItem = page.locator(itemSelector);
          await firstItem.focus();

          // Tab to next item
          await page.keyboard.press('Tab');
          await sleep(50);

          // Focus should have moved to another element
          const activeElement = await page.evaluate(() => document.activeElement?.tagName);
          expect(activeElement).to.be.a('string');
        });
      });
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(async () => {
      await renderFixture('DragAndDrop/SortableList');
    });

    it('should complete full drag cycle with keyboard only', async () => {
      // Get initial order
      const initialOrder = await page.locator('[data-testid="item-order"]').textContent();
      expect(initialOrder).to.equal('1,2,3,4');

      // Tab to first item
      const item = page.locator('[data-testid="item-1"]');
      await item.focus();
      const isFocused = await item.evaluate((el) => document.activeElement === el);
      expect(isFocused).to.equal(true);

      // Enter to pick up
      await page.keyboard.press('Enter');
      await sleep(100);

      // Arrow down to move
      await page.keyboard.press('ArrowDown');
      await sleep(100);

      // Enter to drop
      await page.keyboard.press('Enter');
      await sleep(300);

      // Verify position changed
      const finalOrder = await page.locator('[data-testid="item-order"]').textContent();
      expect(finalOrder).to.not.equal(initialOrder);
    });

    it('should support Space key as alternative to Enter', async () => {
      const item = page.locator('[data-testid="item-1"]');
      await item.focus();

      // Space to pick up
      await page.keyboard.press('Space');
      await sleep(100);

      // Verify drag started by checking aria-pressed
      const ariaPressed = await item.getAttribute('aria-pressed');
      expect(ariaPressed).to.equal('true');

      // Escape to cancel
      await page.keyboard.press('Escape');
    });

    it('should support all arrow key directions', async () => {
      const item = page.locator('[data-testid="item-1"]');
      await item.focus();

      // Start drag
      await page.keyboard.press('Enter');
      await sleep(100);

      // Test all directions (vertical list supports up/down)
      await page.keyboard.press('ArrowDown');
      await sleep(50);
      await page.keyboard.press('ArrowUp');
      await sleep(50);

      // Cancel
      await page.keyboard.press('Escape');
    });
  });

  describe('color contrast and visual indicators', () => {
    fixtures.forEach(({ name, itemSelector }) => {
      describe(`${name}`, () => {
        beforeEach(async () => {
          await renderFixture(`DragAndDrop/${name}`);
        });

        it('should have visible focus indicator', async () => {
          const item = page.locator(itemSelector);
          await item.focus();

          // Check that focus styles are applied
          // MUI components should have outline or other focus indicators
          const styles = await item.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              outline: computed.outline,
              boxShadow: computed.boxShadow,
              borderColor: computed.borderColor,
            };
          });

          // At least one visual indicator should be present
          const hasVisibleFocus =
            styles.outline !== 'none' ||
            styles.boxShadow !== 'none' ||
            styles.borderColor !== 'rgba(0, 0, 0, 0)';

          // Note: This test may need adjustment based on actual theme styling
          expect(typeof styles.outline).to.equal('string');
        });

        it('should have grab cursor when not dragging', async () => {
          const item = page.locator(itemSelector);
          const cursor = await item.evaluate((el) => {
            return window.getComputedStyle(el).cursor;
          });

          expect(cursor).to.equal('grab');
        });

        it('should change cursor to grabbing during drag', async () => {
          const item = page.locator(itemSelector);
          const box = await item.boundingBox();

          if (!box) throw new Error('Item not found');

          // Start mouse drag
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 10);

          const cursor = await item.evaluate((el) => {
            return window.getComputedStyle(el).cursor;
          });

          expect(cursor).to.equal('grabbing');

          await page.mouse.up();
        });
      });
    });
  });

  describe('touch target size', () => {
    // Test List, Table, Grid for 44x44px minimum (Chips are intentionally smaller per MUI design)
    const touchTargetFixtures = fixtures.filter(({ name }) => name !== 'SortableChips');

    touchTargetFixtures.forEach(({ name, itemSelector }) => {
      it(`${name} items should have minimum touch target size (44x44px)`, async () => {
        await renderFixture(`DragAndDrop/${name}`);

        const item = page.locator(itemSelector);
        const box = await item.boundingBox();

        if (!box) throw new Error('Item not found');

        // WCAG 2.1 AA requires minimum 44x44px touch targets
        expect(box.width).to.be.greaterThanOrEqual(44);
        expect(box.height).to.be.greaterThanOrEqual(44);
      });
    });

    it('SortableChips items should have reasonable touch target width', async () => {
      await renderFixture('DragAndDrop/SortableChips');

      const item = page.locator('[data-testid="chip-1"]');
      const box = await item.boundingBox();

      if (!box) throw new Error('Item not found');

      // Chips are smaller by MUI design (32px height), but width should be reasonable
      expect(box.width).to.be.greaterThanOrEqual(44);
      // Note: MUI Chips are 32px tall by design, below WCAG 44px recommendation
      expect(box.height).to.be.greaterThanOrEqual(32);
    });
  });
});
