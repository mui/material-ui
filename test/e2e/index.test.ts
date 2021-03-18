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

  describe('<TrapFocus />', () => {
    it('should loop the tab key', () => {
      render(
        <TrapFocus {...defaultProps} open>
          <div tabIndex={-1} data-testid="root">
            <div>Title</div>
            <button type="button">x</button>
            <button type="button">cancel</button>
            <button type="button">ok</button>
          </div>
        </TrapFocus>,
      );
      expect(screen.getByTestId('root')).toHaveFocus();

      userEvent.tab();
      expect(screen.getByText('x')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByText('cancel')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByText('ok')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByText('x')).toHaveFocus();

      initialFocus.focus();
      expect(screen.getByTestId('root')).toHaveFocus();
      screen.getByText('x').focus();
      userEvent.tab({ shift: true });
      expect(screen.getByText('ok')).toHaveFocus();
    });

    it('should focus on first focus element after last has received a tab click', async () => {
      render(
        <TrapFocus {...defaultProps} open>
          <div tabIndex={-1} data-testid="root">
            <div>Title</div>
            <button type="button">x</button>
            <button type="button">cancel</button>
            <button type="button">ok</button>
          </div>
        </TrapFocus>,
      );

      userEvent.tab();
      expect(screen.getByText('x')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByText('cancel')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByText('ok')).toHaveFocus();
    });
  });
});
