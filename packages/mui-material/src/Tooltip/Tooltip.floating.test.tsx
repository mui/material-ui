import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  flushMicrotasks,
  screen,
  simulatePointerDevice,
  isJsdom,
} from '@mui/internal-test-utils';
import { offset } from '@floating-ui/react-dom';
import Tooltip from '@mui/material/Tooltip';
import FloatingPopup from '@mui/material/FloatingPopup';
// @ts-ignore — testReset is exported from Tooltip.js but not declared in Tooltip.d.ts (test-only export)
import { testReset } from './Tooltip';

/**
 * Integration tests for Tooltip with FloatingPopup as the popper slot.
 *
 * FloatingPopup uses async computePosition from floating-ui.
 * All fake-timer tests must use `await clock.tickAsync()` (not `clock.tick()`)
 * to flush the microtask queue so positioning completes and the FOUC guard
 * (`visibility: hidden`) is removed.
 *
 * user-event is not used here because createRenderer's userEvent.setup()
 * does not configure `advanceTimers`, causing deadlocks with fake timers.
 * Tooltip's enterDelay/leaveDelay/transition behavior requires fake timers
 * for all interactive tests.
 */
describe('<Tooltip slots={{ popper: FloatingPopup }} />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  beforeEach(() => {
    testReset();
  });

  // ──────────────────────────────────────────────
  // Basic rendering
  // ──────────────────────────────────────────────

  describe('rendering', () => {
    it('should render the tooltip content when open', async () => {
      render(
        <Tooltip title="Hello World" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      // Flush async computePosition so visibility:hidden is removed
      await flushMicrotasks();
      expect(screen.getByText('Hello World')).not.to.equal(null);
    });

    it('should not render tooltip content when closed', () => {
      render(
        <Tooltip title="Hello World" open={false} slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.queryByText('Hello World')).to.equal(null);
    });

    it('should have role="tooltip" on the popup', async () => {
      render(
        <Tooltip title="Hello World" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      // Flush async computePosition so visibility:hidden is removed —
      // getByRole skips elements with visibility:hidden
      await flushMicrotasks();
      expect(screen.getByRole('tooltip')).not.to.equal(null);
    });

    it('should set data-popper-placement on the floating element', () => {
      render(
        <Tooltip title="Placement attr" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const floating = document.querySelector('[data-popper-placement]');
      expect(floating).not.to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Mouse interaction
  // ──────────────────────────────────────────────

  describe('mouse interaction', () => {
    clock.withFakeTimers();

    it('should open on mouseOver and close on mouseLeave', async () => {
      const transitionTimeout = 10;
      render(
        <Tooltip
          title="Hover tooltip"
          slots={{ popper: FloatingPopup }}
          slotProps={{ transition: { timeout: transitionTimeout } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(screen.getByRole('button'));
      await clock.tickAsync(0);
      await clock.tickAsync(transitionTimeout);
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should respect enterDelay', async () => {
      render(
        <Tooltip title="Delayed tooltip" slots={{ popper: FloatingPopup }} enterDelay={200}>
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100);
      expect(screen.queryByRole('tooltip')).to.equal(null);

      await clock.tickAsync(100);
      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should respect leaveDelay', async () => {
      render(
        <Tooltip title="Delayed leave" slots={{ popper: FloatingPopup }} leaveDelay={200}>
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(screen.getByRole('button'));
      await clock.tickAsync(100);
      // Still visible during leaveDelay
      expect(screen.getByRole('tooltip')).toBeVisible();
    });
  });

  // ──────────────────────────────────────────────
  // Keyboard interaction
  // ──────────────────────────────────────────────

  describe('keyboard interaction', () => {
    clock.withFakeTimers();

    it('should close on Escape', async () => {
      const transitionTimeout = 10;
      render(
        <Tooltip
          title="Escapable"
          slots={{ popper: FloatingPopup }}
          slotProps={{ transition: { timeout: transitionTimeout } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.keyDown(document.activeElement || document.body, { key: 'Escape' });
      await clock.tickAsync(transitionTimeout);
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it.skipIf(isJsdom())('should open on focus-visible', async () => {
      simulatePointerDevice();
      render(
        <Tooltip title="Focus tooltip" slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );

      const button = screen.getByRole('button');
      await act(async () => {
        button.blur();
      });
      fireEvent.keyDown(document.body, { key: 'Tab' });
      await act(async () => {
        button.focus();
      });

      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();
    });
  });

  // ──────────────────────────────────────────────
  // Touch interaction
  // ──────────────────────────────────────────────

  describe('touch interaction', () => {
    clock.withFakeTimers();

    it('should open on long press', async () => {
      render(
        <Tooltip title="Touch tooltip" slots={{ popper: FloatingPopup }} enterTouchDelay={700}>
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.touchStart(screen.getByRole('button'));
      await clock.tickAsync(700 + 100); // enterTouchDelay + enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();
    });
  });

  // ──────────────────────────────────────────────
  // Accessibility
  // ──────────────────────────────────────────────

  describe('accessibility', () => {
    it('should label the trigger with the tooltip title', () => {
      render(
        <Tooltip title="Accessible tooltip" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const button = screen.getByRole('button');
      expect(button).to.have.attribute('aria-label', 'Accessible tooltip');
    });

    it('should set aria-describedby when describeChild is true', () => {
      render(
        <Tooltip title="Description" open describeChild slots={{ popper: FloatingPopup }}>
          <button aria-label="Action">Trigger</button>
        </Tooltip>,
      );
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-describedby')).not.to.equal(null);
    });

    it('should not set aria-describedby when closed', () => {
      render(
        <Tooltip title="Hidden tooltip" open={false} slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-describedby')).to.equal(null);
    });

    it('should connect trigger aria-describedby to tooltip id', async () => {
      render(
        <Tooltip title="Connected" open describeChild slots={{ popper: FloatingPopup }}>
          <button aria-label="Action">Trigger</button>
        </Tooltip>,
      );
      await flushMicrotasks();
      const button = screen.getByRole('button');
      const describedById = button.getAttribute('aria-describedby');
      const tooltip = document.getElementById(describedById!);
      expect(tooltip).not.to.equal(null);
      expect(tooltip!.textContent).to.include('Connected');
    });
  });

  // ──────────────────────────────────────────────
  // Placement
  // ──────────────────────────────────────────────

  describe('placement', () => {
    const placements = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ] as const;

    placements.forEach((placement) => {
      it(`should render with placement="${placement}"`, () => {
        render(
          <Tooltip
            title={`Placement ${placement}`}
            open
            placement={placement}
            slots={{ popper: FloatingPopup }}
          >
            <button>Trigger</button>
          </Tooltip>,
        );
        expect(screen.getByText(`Placement ${placement}`)).not.to.equal(null);
      });
    });
  });

  // ──────────────────────────────────────────────
  // Arrow
  // ──────────────────────────────────────────────

  describe('arrow', () => {
    it('should render the arrow element', () => {
      render(
        <Tooltip title="Arrow tooltip" open arrow slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByText('Arrow tooltip')).not.to.equal(null);
      const arrowEl = document.querySelector('.MuiTooltip-arrow');
      expect(arrowEl).not.to.equal(null);
    });

    it('should apply position:absolute to the arrow element', async () => {
      render(
        <Tooltip title="Arrow styles" open arrow slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      // Flush async computePosition so middlewareData.arrow is populated
      await flushMicrotasks();
      const arrowEl = document.querySelector('.MuiTooltip-arrow') as HTMLElement;
      expect(arrowEl).not.to.equal(null);
      expect(arrowEl!.style.position).to.equal('absolute');
    });
  });

  // ──────────────────────────────────────────────
  // Transition
  // ──────────────────────────────────────────────

  describe('transition', () => {
    clock.withFakeTimers();

    it('should unmount after exit transition', async () => {
      const transitionTimeout = 10;
      render(
        <Tooltip
          title="Animated"
          slots={{ popper: FloatingPopup }}
          slotProps={{ transition: { timeout: transitionTimeout } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(screen.getByRole('button'));
      await clock.tickAsync(0);
      await clock.tickAsync(transitionTimeout);
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // followCursor
  // ──────────────────────────────────────────────

  describe('followCursor', () => {
    clock.withFakeTimers();

    it('should open and track cursor', async () => {
      render(
        <Tooltip title="Follow me" followCursor slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'), {
        clientX: 100,
        clientY: 200,
      });
      await clock.tickAsync(100); // default enterDelay

      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should stay visible after mouse move within trigger', async () => {
      render(
        <Tooltip title="Follow cursor" followCursor slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );

      const button = screen.getByRole('button');
      fireEvent.mouseOver(button, { clientX: 50, clientY: 50 });
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseMove(button, { clientX: 100, clientY: 100 });
      await flushMicrotasks();
      expect(screen.getByRole('tooltip')).toBeVisible();
    });
  });

  // ──────────────────────────────────────────────
  // keepMounted
  // ──────────────────────────────────────────────

  describe('keepMounted', () => {
    it('should keep the tooltip in the DOM when closed', () => {
      render(
        <Tooltip
          title="Persistent"
          open={false}
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { keepMounted: true } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByText('Persistent')).not.to.equal(null);
    });

    it('should hide with display:none when closed and keepMounted', () => {
      render(
        <Tooltip
          title="Hidden persistent"
          open={false}
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { keepMounted: true } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      expect(floating!.style.display).to.equal('none');
    });
  });

  // ──────────────────────────────────────────────
  // slotProps passthrough
  // ──────────────────────────────────────────────

  describe('slotProps.popper', () => {
    it('should forward data attributes to the floating element', () => {
      render(
        <Tooltip
          title="Data attr"
          open
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { 'data-testid': 'my-popper' } as Record<string, unknown> }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByTestId('my-popper')).not.to.equal(null);
    });

    it('should forward strategy=fixed to FloatingPopup', () => {
      render(
        <Tooltip
          title="Fixed strategy"
          open
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { strategy: 'fixed' } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      expect(floating!.style.position).to.equal('fixed');
    });
  });

  // ──────────────────────────────────────────────
  // CSS variables
  // ──────────────────────────────────────────────

  describe('CSS variables', () => {
    it.skipIf(isJsdom())(
      'should set --anchor-width and --anchor-height on the floating element',
      async () => {
        render(
          <Tooltip title="CSS vars" open slots={{ popper: FloatingPopup }}>
            <button>Trigger</button>
          </Tooltip>,
        );
        // Flush async computePosition so anchorMetrics middleware populates data
        await flushMicrotasks();
        const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
        expect(floating).not.to.equal(null);
        const anchorWidth = floating!.style.getPropertyValue('--anchor-width');
        const anchorHeight = floating!.style.getPropertyValue('--anchor-height');
        expect(anchorWidth).to.match(/^\d+(\.\d+)?px$/);
        expect(anchorHeight).to.match(/^\d+(\.\d+)?px$/);
      },
    );
  });

  // ──────────────────────────────────────────────
  // Callbacks
  // ──────────────────────────────────────────────

  describe('callbacks', () => {
    clock.withFakeTimers();

    it('should call onOpen when tooltip opens', async () => {
      const handleOpen = spy();
      render(
        <Tooltip title="Callback" onOpen={handleOpen} slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100); // default enterDelay
      expect(handleOpen.callCount).to.equal(1);
    });

    it('should call onClose when tooltip closes', async () => {
      const handleClose = spy();
      const transitionTimeout = 10;
      render(
        <Tooltip
          title="Callback"
          onClose={handleClose}
          slots={{ popper: FloatingPopup }}
          slotProps={{ transition: { timeout: transitionTimeout } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      await clock.tickAsync(100); // default enterDelay

      fireEvent.mouseLeave(screen.getByRole('button'));
      await clock.tickAsync(0);
      expect(handleClose.callCount).to.equal(1);
    });
  });

  // ──────────────────────────────────────────────
  // Dynamic title
  // ──────────────────────────────────────────────

  describe('dynamic title', () => {
    it('should update content when title changes', () => {
      const { setProps } = render(
        <Tooltip title="First" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByText('First')).not.to.equal(null);

      setProps({ title: 'Second' });
      expect(screen.getByText('Second')).not.to.equal(null);
    });

    it('should close when title becomes empty string', () => {
      const { setProps } = render(
        <Tooltip title="Hello" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByText('Hello')).not.to.equal(null);

      setProps({ title: '' });
      expect(screen.queryByText('Hello')).to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // disablePortal
  // ──────────────────────────────────────────────

  describe('disablePortal', () => {
    it('should render inline when disablePortal is true', () => {
      const { container } = render(
        <Tooltip
          title="Inline"
          open
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { disablePortal: true } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(container.querySelector('[data-popper-placement]')).not.to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Multiple tooltips
  // ──────────────────────────────────────────────

  describe('multiple tooltips', () => {
    clock.withFakeTimers();

    it('should switch between tooltips', async () => {
      const transitionTimeout = 10;
      render(
        <React.Fragment>
          <Tooltip
            title="Tooltip A"
            slots={{ popper: FloatingPopup }}
            slotProps={{ transition: { timeout: transitionTimeout } }}
          >
            <button>Button A</button>
          </Tooltip>
          <Tooltip
            title="Tooltip B"
            slots={{ popper: FloatingPopup }}
            slotProps={{ transition: { timeout: transitionTimeout } }}
          >
            <button>Button B</button>
          </Tooltip>
        </React.Fragment>,
      );

      fireEvent.mouseOver(screen.getByText('Button A'));
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByText('Tooltip A')).not.to.equal(null);

      fireEvent.mouseLeave(screen.getByText('Button A'));
      await clock.tickAsync(0);
      await clock.tickAsync(transitionTimeout);
      fireEvent.mouseOver(screen.getByText('Button B'));
      await clock.tickAsync(100); // default enterDelay
      expect(screen.getByText('Tooltip B')).not.to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Custom middleware
  // ──────────────────────────────────────────────

  describe('custom middleware', () => {
    it('should accept custom middleware via slotProps.popper', () => {
      render(
        <Tooltip
          title="With middleware"
          open
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { middleware: [offset(20)] } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByText('With middleware')).not.to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Arrow + custom middleware
  // ──────────────────────────────────────────────

  describe('arrow with custom middleware', () => {
    it('should position arrow even with custom middleware', async () => {
      render(
        <Tooltip
          title="Arrow + middleware"
          open
          arrow
          slots={{ popper: FloatingPopup }}
          slotProps={{ popper: { middleware: [offset(12)] } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      await flushMicrotasks();
      const arrowEl = document.querySelector('.MuiTooltip-arrow') as HTMLElement;
      expect(arrowEl).not.to.equal(null);
      expect(arrowEl!.style.position).to.equal('absolute');
    });
  });

  // ──────────────────────────────────────────────
  // Rapid interactions
  // ──────────────────────────────────────────────

  describe('rapid interactions', () => {
    clock.withFakeTimers();

    it('should not crash during rapid hover in/out', async () => {
      const transitionTimeout = 10;
      render(
        <Tooltip
          title="Rapid"
          enterDelay={50}
          leaveDelay={50}
          slots={{ popper: FloatingPopup }}
          slotProps={{ transition: { timeout: transitionTimeout } }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      const button = screen.getByRole('button');

      for (let i = 0; i < 10; i += 1) {
        fireEvent.mouseOver(button);
        // eslint-disable-next-line no-await-in-loop
        await clock.tickAsync(10);
        fireEvent.mouseLeave(button);
        // eslint-disable-next-line no-await-in-loop
        await clock.tickAsync(10);
      }

      await clock.tickAsync(transitionTimeout + 50);
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Ref forwarding on trigger
  // ──────────────────────────────────────────────

  describe('ref forwarding', () => {
    it('should forward ref on the trigger element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Tooltip title="Ref test" slots={{ popper: FloatingPopup }}>
          <button ref={ref}>Trigger</button>
        </Tooltip>,
      );
      expect(ref.current).not.to.equal(null);
      expect(ref.current).to.be.instanceof(window.HTMLButtonElement);
    });
  });

  // ──────────────────────────────────────────────
  // Disabled trigger
  // ──────────────────────────────────────────────

  describe('disabled trigger', () => {
    clock.withFakeTimers();

    it('should open on hover for disabled button (via internal span wrapper)', async () => {
      expect(() => {
        render(
          <Tooltip title="Disabled tooltip" slots={{ popper: FloatingPopup }}>
            <button disabled type="button">
              Disabled
            </button>
          </Tooltip>,
        );
      }).toWarnDev('MUI: You are providing a disabled `button` child to the Tooltip component.');

      const wrapper = screen.getByText('Disabled').closest('span');
      if (wrapper) {
        fireEvent.mouseOver(wrapper);
        await clock.tickAsync(100); // default enterDelay
        expect(screen.getByRole('tooltip')).toBeVisible();
      }
    });
  });

  // ──────────────────────────────────────────────
  // Controlled open
  // ──────────────────────────────────────────────

  describe('controlled open', () => {
    it('should stay open when open=true regardless of interactions', async () => {
      render(
        <Tooltip title="Controlled" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      await flushMicrotasks();
      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should stay closed when open=false regardless of interactions', () => {
      render(
        <Tooltip title="Controlled closed" open={false} slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // JSX title
  // ──────────────────────────────────────────────

  describe('JSX title', () => {
    it('should render JSX content as tooltip title', () => {
      render(
        <Tooltip
          title={
            <span>
              <strong>Bold</strong> text
            </span>
          }
          open
          slots={{ popper: FloatingPopup }}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByText('Bold')).not.to.equal(null);
      expect(screen.getByText('Bold').tagName).to.equal('STRONG');
    });
  });

  // ──────────────────────────────────────────────
  // FOUC prevention
  // ──────────────────────────────────────────────

  describe('FOUC prevention', () => {
    it('should have visibility:hidden before positioning completes', () => {
      render(
        <Tooltip title="FOUC test" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      expect(floating).not.to.equal(null);
      expect(floating!.style.visibility).to.equal('hidden');
    });

    it('should remove visibility:hidden after positioning completes', async () => {
      render(
        <Tooltip title="FOUC test" open slots={{ popper: FloatingPopup }}>
          <button>Trigger</button>
        </Tooltip>,
      );
      await flushMicrotasks();
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      expect(floating!.style.visibility).not.to.equal('hidden');
    });
  });
});
