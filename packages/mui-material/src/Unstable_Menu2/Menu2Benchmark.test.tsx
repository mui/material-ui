import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';

/**
 * Behavior benchmark: the classic `Menu` against the Base UI-backed successor,
 * from the user's perspective. It is the RFC's precondition for finalizing the
 * API shape -- every assertion here is a difference (or a parity) the design
 * phase has to accept or design around, so a failure means the benchmark needs
 * re-reading, not silencing.
 *
 * Both harnesses use a host `button` as the trigger so that ButtonBase's
 * focus-visible and ripple state updates -- which this benchmark does not
 * measure -- stay out of the measurements.
 */
function ClassicMenuHarness(props: { withSelected?: boolean; variant?: 'menu' | 'selectedMenu' }) {
  const { withSelected = false, variant } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div>
      <button type="button" onClick={(event) => setAnchorEl(event.currentTarget)}>
        Options
      </button>
      <p data-testid="sibling">sibling content</p>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        variant={variant}
      >
        <MenuItem>Alpha</MenuItem>
        <MenuItem disabled>Beta</MenuItem>
        <MenuItem selected={withSelected}>Gamma</MenuItem>
      </Menu>
    </div>
  );
}

function Menu2Harness(props: { withSelected?: boolean }) {
  const { withSelected = false } = props;

  return (
    <div>
      <Menu2>
        <Menu2Trigger slots={{ root: 'button' }}>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Item>Alpha</Menu2Item>
          <Menu2Item disabled>Beta</Menu2Item>
          <Menu2Item selected={withSelected}>Gamma</Menu2Item>
        </Menu2Popup>
      </Menu2>
      <p data-testid="sibling">sibling content</p>
    </div>
  );
}

const menuEl = () => document.querySelector('[role="menu"]');
const openTrigger = () => screen.getByRole('button', { name: 'Options' });
const waitForOpen = () => waitFor(() => expect(menuEl()).not.to.equal(null));

describe.skipIf(isJsdom())('Menu behavior benchmark: classic vs Menu2', () => {
  const { render } = createRenderer();

  describe('opening', () => {
    it('classic needs the trigger wired by hand; Menu2 opens from the keyboard', async () => {
      const { user } = render(<ClassicMenuHarness />);
      openTrigger().focus();
      await user.keyboard('{ArrowDown}');
      // The classic Menu has no trigger part: an anchor button only opens it
      // through whatever the consumer wired to onClick.
      expect(menuEl()).to.equal(null);
    });

    it('Menu2 opens on ArrowDown from its trigger', async () => {
      const { user } = render(<Menu2Harness />);
      openTrigger().focus();
      await user.keyboard('{ArrowDown}');
      await waitForOpen();
      expect(menuEl()).not.to.equal(null);
    });
  });

  describe('initial focus', () => {
    it('classic moves focus onto the selected item', async () => {
      const { user } = render(<ClassicMenuHarness withSelected />);
      await user.click(openTrigger());
      await waitForOpen();
      // `variant="selectedMenu"` is the classic default.
      expect(screen.getByRole('menuitem', { name: 'Gamma' })).toHaveFocus();
    });

    it('Menu2 focuses the popup, leaving no item highlighted', async () => {
      const { user } = render(<Menu2Harness withSelected />);
      await user.click(openTrigger());
      await waitForOpen();
      // Focus lands on the popup a tick after it mounts, and stays there: the
      // successor highlights nothing until the user navigates.
      await waitFor(() => expect(menuEl()).toHaveFocus());
      expect(screen.getByRole('menuitem', { name: 'Gamma' })).not.toHaveFocus();
    });
  });

  describe('disabled items', () => {
    it('classic never lets a disabled item take focus', async () => {
      const { user } = render(<ClassicMenuHarness />);
      await user.click(openTrigger());
      await waitForOpen();

      const disabled = screen.getByRole('menuitem', { name: 'Beta' });
      // Walk the whole list twice over; classic hops over disabled entries.
      for (let step = 0; step < 4; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.keyboard('{ArrowDown}');
        expect(disabled).not.toHaveFocus();
      }
    });

    it('Menu2 keeps disabled items focusable, per the WAI-ARIA menu pattern', async () => {
      const { user } = render(<Menu2Harness />);
      await user.click(openTrigger());
      await waitForOpen();

      const disabled = screen.getByRole('menuitem', { name: 'Beta' });
      const focused: boolean[] = [];
      for (let step = 0; step < 3; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.keyboard('{ArrowDown}');
        focused.push(disabled === document.activeElement);
      }
      expect(focused.some(Boolean), 'the disabled item takes focus while navigating').to.equal(
        true,
      );
    });
  });

  describe('dismissal', () => {
    it('both restore focus to the trigger on Escape', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      const classicTrigger = openTrigger();
      await classicUser.click(classicTrigger);
      await waitForOpen();
      await classicUser.keyboard('{Escape}');
      await waitFor(() => expect(menuEl()).to.equal(null));
      expect(classicTrigger).toHaveFocus();
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      const successorTrigger = openTrigger();
      await successorUser.click(successorTrigger);
      await waitForOpen();
      await successorUser.keyboard('{Escape}');
      await waitFor(() => expect(menuEl()).to.equal(null));
      expect(successorTrigger).toHaveFocus();
    });

    it('classic traps Tab inside the menu; Menu2 closes on Tab', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      await classicUser.click(openTrigger());
      await waitForOpen();
      await classicUser.tab();
      expect(menuEl()).not.to.equal(null);
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      await successorUser.click(openTrigger());
      await waitForOpen();
      await successorUser.tab();
      await waitFor(() => expect(menuEl()).to.equal(null));
    });
  });

  describe('page treatment while open', () => {
    it('both lock body scrolling in their default modal state', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      await classicUser.click(openTrigger());
      await waitForOpen();
      expect(window.getComputedStyle(document.body).overflow).to.equal('hidden');
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      await successorUser.click(openTrigger());
      await waitForOpen();
      expect(window.getComputedStyle(document.body).overflow).to.equal('hidden');
    });

    it('classic renders a backdrop and hides siblings; Menu2 does neither', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      await classicUser.click(openTrigger());
      await waitForOpen();
      expect(document.querySelector('.MuiBackdrop-root')).not.to.equal(null);
      expect(
        screen.getByTestId('sibling').closest('[aria-hidden="true"]'),
        'classic marks sibling content aria-hidden',
      ).not.to.equal(null);
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      await successorUser.click(openTrigger());
      await waitForOpen();
      expect(document.querySelector('.MuiBackdrop-root')).to.equal(null);
      expect(
        screen.getByTestId('sibling').closest('[aria-hidden="true"]'),
        'Menu2 leaves sibling content in the accessibility tree',
      ).to.equal(null);
    });
  });

  describe('placement', () => {
    it('classic overlays the trigger; Menu2 sits below it', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      const classicTrigger = openTrigger();
      const classicAnchor = classicTrigger.getBoundingClientRect();
      await classicUser.click(classicTrigger);
      await waitForOpen();
      const classicSurface = document.querySelector('.MuiPaper-root')!.getBoundingClientRect();
      // Default anchorOrigin/transformOrigin put the surface over the anchor;
      // it only moves to stay inside the viewport.
      expect(classicSurface.top).to.be.lessThan(classicAnchor.bottom + 8);
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      const successorTrigger = openTrigger();
      const successorAnchor = successorTrigger.getBoundingClientRect();
      await successorUser.click(successorTrigger);
      await waitForOpen();
      const successorSurface = document.querySelector('.MuiPaper-root')!.getBoundingClientRect();
      // `side="bottom"` places the surface under the trigger instead.
      expect(successorSurface.top).to.be.at.least(successorAnchor.bottom - 1);
    });
  });
});
