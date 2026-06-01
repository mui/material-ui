import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import {
  act,
  createRenderer,
  fireEvent,
  isJsdom,
  reactMajor,
  screen,
  within,
} from '@mui/internal-test-utils';
import FocusTrap from '@mui/material/Unstable_TrapFocus';
import Portal from '@mui/material/Portal';
import getActiveElement from '../utils/getActiveElement';
import { FOCUSABLE_ATTRIBUTE } from '../utils/focusable';

interface GenericProps {
  [index: string]: any;
}

/**
 * This file runs in both node and browser projects, so `vitest/browser` must be
 * imported lazily from browser-only tests.
 *
 * Use the Vitest Browser userEvent provider for shadow-root keyboard interactions.
 * The `user` returned by `render()` comes from @testing-library/user-event.
 * Its Tab implementation computes the tab order from `document.querySelectorAll()`,
 * which doesn't include focusable elements inside shadow roots.
 *
 * Keep the import specifier widened to `string` so package TypeScript checks
 * don't load Vitest Browser's ambient matcher types.
 */
async function setupBrowser() {
  const { page, userEvent: user } = await import('vitest/browser' as string);

  return {
    page,
    user,
  };
}

describe('<FocusTrap />', () => {
  const { clock, render } = createRenderer();

  let initialFocus: HTMLElement | null = null;

  beforeEach(async () => {
    initialFocus = document.createElement('button');
    initialFocus.tabIndex = 0;
    document.body.appendChild(initialFocus);
    initialFocus!.focus();
  });

  afterEach(async () => {
    document.body.removeChild(initialFocus!);
  });

  it('should return focus to the root', async () => {
    render(
      <FocusTrap open>
        <div tabIndex={-1} data-testid="root">
          <input autoFocus data-testid="auto-focus" />
        </div>
      </FocusTrap>,
      // TODO: https://github.com/reactwg/react-18/discussions/18#discussioncomment-893076
      { strictEffects: false },
    );

    expect(screen.getByTestId('auto-focus')).toHaveFocus();

    await act(async () => {
      initialFocus!.focus();
    });
    expect(screen.getByTestId('root')).toHaveFocus();
  });

  it('should not return focus to the children when disableEnforceFocus is true', async () => {
    render(
      <FocusTrap open disableEnforceFocus>
        <div tabIndex={-1}>
          <input autoFocus data-testid="auto-focus" />
        </div>
      </FocusTrap>,
      // TODO: https://github.com/reactwg/react-18/discussions/18#discussioncomment-893076s
      { strictEffects: false },
    );

    expect(screen.getByTestId('auto-focus')).toHaveFocus();

    await act(async () => {
      initialFocus!.focus();
    });

    expect(initialFocus).toHaveFocus();
  });

  it('should focus first focusable child in portal', async () => {
    render(
      <FocusTrap open>
        <div tabIndex={-1}>
          <Portal>
            <input autoFocus data-testid="auto-focus" />
          </Portal>
        </div>
      </FocusTrap>,
    );

    expect(screen.getByTestId('auto-focus')).toHaveFocus();
  });

  it('should warn if the root content is not focusable', () => {
    const UnfocusableDialog = React.forwardRef<HTMLDivElement>((_, ref) => <div ref={ref} />);

    expect(() => {
      render(
        <FocusTrap open>
          <UnfocusableDialog />
        </FocusTrap>,
      );
    }).toErrorDev('MUI: The modal content node does not accept focus');
  });

  it('should not attempt to focus nonexistent children', () => {
    const EmptyDialog = React.forwardRef(() => null);

    render(
      <FocusTrap open>
        <EmptyDialog />
      </FocusTrap>,
    );
  });

  it('should focus rootRef if no tabbable children are rendered', () => {
    render(
      <FocusTrap open>
        <div tabIndex={-1} data-testid="root">
          <div>Title</div>
        </div>
      </FocusTrap>,
    );
    expect(screen.getByTestId('root')).toHaveFocus();
  });

  it('does not trap shadow DOM focusables back to the root', async () => {
    const ShadowContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      function ShadowContent(props, ref) {
        const hostRef = React.useRef<HTMLDivElement>(null);

        React.useLayoutEffect(() => {
          const host = hostRef.current!;
          const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
          const shadowButton = document.createElement('button');

          shadowRoot.replaceChildren(shadowButton);
        }, []);

        return (
          <div {...props} ref={ref} tabIndex={-1} data-testid="root">
            <div data-testid="shadow-host" ref={hostRef} />
          </div>
        );
      },
    );

    render(
      <FocusTrap open>
        <ShadowContent />
      </FocusTrap>,
    );

    const host = screen.getByTestId('shadow-host');
    const root = screen.getByTestId('root');
    const shadowButton = host.shadowRoot!.querySelector('button')!;

    expect(root).toHaveFocus();

    await act(async () => {
      (shadowButton as HTMLButtonElement).focus();
    });

    expect(getActiveElement(document)).to.equal(shadowButton);

    // user.tab() simulates focus movement; keyDown tests whether FocusTrap
    // cancels Tab. fireEvent returns true when the event was not canceled.
    expect(fireEvent.keyDown(host, { key: 'Tab' })).to.equal(true);
    expect(root).not.toHaveFocus();
  });

  it('should focus a marked descendant instead of the root', () => {
    render(
      <FocusTrap open>
        <div data-testid="root">
          <div {...{ [FOCUSABLE_ATTRIBUTE]: '' }} tabIndex={-1} data-testid="focusable">
            <button>Click me</button>
          </div>
        </div>
      </FocusTrap>,
    );
    expect(screen.getByTestId('focusable')).toHaveFocus();
  });

  it('should use positive tabIndex order from a marked descendant', async () => {
    render(
      <FocusTrap open>
        <div data-testid="root">
          <div {...{ [FOCUSABLE_ATTRIBUTE]: '' }} tabIndex={-1} data-testid="focusable">
            <button type="button" data-testid="normal-tab">
              Normal
            </button>
            <button type="button" tabIndex={1} data-testid="indexed-tab">
              Indexed
            </button>
          </div>
        </div>
      </FocusTrap>,
    );

    const focusable = screen.getByTestId('focusable');
    expect(focusable).toHaveFocus();

    // user.tab() simulates focus movement; keyDown tests whether FocusTrap
    // cancels Tab. fireEvent returns false when the event was canceled.
    expect(fireEvent.keyDown(focusable, { key: 'Tab' })).to.equal(false);

    expect(screen.getByTestId('indexed-tab')).toHaveFocus();
  });

  it('should prefer the marked descendant over unmarked descendants', () => {
    render(
      <FocusTrap open>
        <div data-testid="root">
          <div tabIndex={-1} data-testid="other">
            <button>Other</button>
          </div>
          <div {...{ [FOCUSABLE_ATTRIBUTE]: '' }} tabIndex={-1} data-testid="focusable">
            <button>Focusable</button>
          </div>
        </div>
      </FocusTrap>,
    );
    expect(screen.getByTestId('focusable')).toHaveFocus();
  });

  it('should fall back to rootRef when no descendant is marked focusable', () => {
    render(
      <FocusTrap open>
        <div tabIndex={-1} data-testid="root">
          <button>Click me</button>
        </div>
      </FocusTrap>,
    );
    expect(screen.getByTestId('root')).toHaveFocus();
  });

  it('keeps focus trapped after the React 18 Strict Mode remount', async () => {
    render(
      <div>
        <input data-testid="outside-input" />
        <FocusTrap open>
          <div tabIndex={-1} data-testid="root" />
        </FocusTrap>
      </div>,
      { strict: reactMajor <= 18 },
    );

    expect(screen.getByTestId('root')).toHaveFocus();

    await act(async () => {
      screen.getByTestId('outside-input').focus();
    });

    expect(screen.getByTestId('root')).toHaveFocus();
  });

  it('does not steal focus from a portaled element if any prop but open changes', async () => {
    function Test(props: GenericProps) {
      return (
        <FocusTrap disableAutoFocus open {...props}>
          <div data-testid="focus-root" tabIndex={-1}>
            {ReactDOM.createPortal(<input data-testid="portal-input" />, document.body)}
          </div>
        </FocusTrap>
      );
    }
    const { setProps } = render(<Test />);
    const portaledTextbox = screen.getByTestId('portal-input');
    await act(async () => {
      portaledTextbox.focus();
    });

    // sanity check
    expect(portaledTextbox).toHaveFocus();

    setProps({ disableAutoFocus: false });

    expect(portaledTextbox).toHaveFocus();

    setProps({ disableEnforceFocus: true });

    expect(portaledTextbox).toHaveFocus();

    setProps({ disableRestoreFocus: true });

    expect(portaledTextbox).toHaveFocus();

    // same behavior, just referential equality changes
    setProps({ isEnabled: () => true });

    expect(portaledTextbox).toHaveFocus();
  });

  it('undesired: lazy root does not get autofocus', async () => {
    let mountDeferredComponent: React.DispatchWithoutAction;
    const DeferredComponent = React.forwardRef<HTMLDivElement>(
      function DeferredComponent(props, ref) {
        const [mounted, setMounted] = React.useReducer(() => true, false);

        mountDeferredComponent = setMounted;

        if (mounted) {
          return <div ref={ref} {...props} />;
        }
        return null;
      },
    );
    render(
      <FocusTrap open>
        <DeferredComponent data-testid="deferred-component" />
      </FocusTrap>,
    );

    expect(initialFocus).toHaveFocus();

    await act(async () => {
      mountDeferredComponent();
    });

    // desired
    // expect(screen.getByTestId('deferred-component')).toHaveFocus();
    // undesired
    expect(initialFocus).toHaveFocus();
  });

  it('does not bounce focus around due to sync focus-restore + focus-contain', () => {
    const eventLog: string[] = [];
    function Test(props: GenericProps) {
      return (
        <div onBlur={() => eventLog.push('blur')}>
          <FocusTrap open {...props}>
            <div data-testid="root" tabIndex={-1}>
              <input data-testid="focus-input" />
            </div>
          </FocusTrap>
        </div>
      );
    }
    const { setProps } = render(<Test />, {
      // Strict Effects interferes with the premise of the test.
      // It would trigger a focus restore (i.e. a blur event)
      strictEffects: false,
    });

    // same behavior, just referential equality changes
    setProps({ isEnabled: () => true });

    expect(screen.getByTestId('root')).toHaveFocus();
    expect(eventLog).to.deep.equal([]);
  });

  it('does not focus if isEnabled returns false', async () => {
    function Test(props: GenericProps) {
      return (
        <div>
          <input />
          <FocusTrap open {...props}>
            <div tabIndex={-1} data-testid="root" />
          </FocusTrap>
        </div>
      );
    }
    const { setProps } = render(<Test />, { strict: reactMajor <= 18 });
    expect(screen.getByTestId('root')).toHaveFocus();

    await act(async () => {
      screen.getByRole('textbox').focus();
    });
    expect(screen.getByRole('textbox')).not.toHaveFocus();

    setProps({ isEnabled: () => false });

    await act(async () => {
      screen.getByRole('textbox').focus();
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  describe.skipIf(isJsdom())('shadow DOM', () => {
    it('loops focus when rendered in a shadow root', async () => {
      const shadowHost = document.createElement('div');
      document.body.appendChild(shadowHost);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
      const shadowContainer = document.createElement('div');
      shadowRoot.appendChild(shadowContainer);

      let unmount: (() => void) | undefined;

      try {
        ({ unmount } = render(
          <FocusTrap open>
            <div tabIndex={-1}>
              <button type="button">first</button>
              <button type="button">last</button>
            </div>
          </FocusTrap>,
          { container: shadowContainer },
        ));

        const { user } = await setupBrowser();
        const firstButton = within(shadowContainer).getByRole('button', { name: 'first' });
        const lastButton = within(shadowContainer).getByRole('button', { name: 'last' });

        await user.click(lastButton);
        expect(shadowRoot.activeElement).to.equal(lastButton);

        await user.tab();
        expect(shadowRoot.activeElement).to.equal(firstButton);

        await user.tab({ shift: true });
        expect(shadowRoot.activeElement).to.equal(lastButton);
      } finally {
        unmount?.();
        document.body.removeChild(shadowHost);
      }
    });

    it('loops backward when Shift+Tab starts from the shadow-root trap container', async () => {
      const shadowHost = document.createElement('div');
      document.body.appendChild(shadowHost);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
      const shadowContainer = document.createElement('div');
      shadowRoot.appendChild(shadowContainer);

      let unmount: (() => void) | undefined;

      try {
        ({ unmount } = render(
          <FocusTrap open>
            <div tabIndex={-1} data-testid="root">
              <button type="button">first</button>
              <button type="button">last</button>
            </div>
          </FocusTrap>,
          { container: shadowContainer },
        ));

        const { user } = await setupBrowser();
        const root = within(shadowContainer).getByTestId('root');
        const lastButton = within(shadowContainer).getByRole('button', { name: 'last' });

        expect(shadowRoot.activeElement).to.equal(root);

        await user.tab({ shift: true });
        expect(shadowRoot.activeElement).to.equal(lastButton);
      } finally {
        unmount?.();
        document.body.removeChild(shadowHost);
      }
    });

    it('loops backward when Shift+Tab enters a lazy shadow-root trap from the document', async () => {
      const shadowHost = document.createElement('div');
      const outsideAfter = document.createElement('input');
      outsideAfter.setAttribute('aria-label', 'after');
      document.body.appendChild(shadowHost);
      document.body.appendChild(outsideAfter);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
      const shadowContainer = document.createElement('div');
      shadowRoot.appendChild(shadowContainer);

      let unmount: (() => void) | undefined;

      try {
        ({ unmount } = render(
          <FocusTrap open disableAutoFocus>
            <div tabIndex={-1}>
              <button type="button">first</button>
              <button type="button">last</button>
            </div>
          </FocusTrap>,
          { container: shadowContainer },
        ));

        const { page, user } = await setupBrowser();
        const lastButton = within(shadowContainer).getByRole('button', { name: 'last' });

        // In Firefox, filling through a provider locator is the reliable way
        // to move focus to this dynamically appended input before pressing Shift+Tab.
        // eslint-disable-next-line testing-library/prefer-screen-queries -- `page` is a Vitest Browser locator provider, not a render result.
        await user.fill(page.getByRole('textbox', { name: 'after' }), 'focused');
        expect(document.activeElement).to.equal(outsideAfter);

        await user.tab({ shift: true });
        expect(shadowRoot.activeElement).to.equal(lastButton);
      } finally {
        unmount?.();
        document.body.removeChild(shadowHost);
        document.body.removeChild(outsideAfter);
      }
    });

    it('loops backward when Shift+Tab enters a shadow-root trap from an iframe document', async () => {
      const frame = document.createElement('iframe');
      frame.setAttribute('data-testid', 'focus-trap-shadow-root-iframe');
      // Firefox in the full no-isolate browser run needs the iframe to load
      // a real same-origin document before Vitest Browser can query inside it reliably.
      frame.srcdoc = '<!doctype html><html><body></body></html>';
      const frameLoaded = new Promise<void>((resolve) => {
        frame.addEventListener('load', () => resolve(), { once: true });
      });
      document.body.appendChild(frame);
      await frameLoaded;
      const frameDocument = frame.contentDocument!;
      const shadowHost = frameDocument.createElement('div');
      const outsideAfter = frameDocument.createElement('input');
      outsideAfter.setAttribute('aria-label', 'after');
      frameDocument.body.appendChild(shadowHost);
      frameDocument.body.appendChild(outsideAfter);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
      const shadowContainer = frameDocument.createElement('div');
      shadowRoot.appendChild(shadowContainer);

      let unmount: (() => void) | undefined;

      try {
        ({ unmount } = render(
          <FocusTrap open disableAutoFocus>
            <div tabIndex={-1}>
              <button type="button">first</button>
              <button type="button">last</button>
            </div>
          </FocusTrap>,
          { container: shadowContainer },
        ));

        const { page, user } = await setupBrowser();
        // Use a unique page locator instead of `page.elementLocator(frame)`.
        // Vitest Browser serializes element locators for iframes to a broad `iframe`
        // selector, which can bind to a stale iframe in the full no-isolate Firefox run.
        // eslint-disable-next-line testing-library/prefer-screen-queries -- `page` is a Vitest Browser locator provider, not a render result.
        const frameLocator = page.frameLocator(page.getByTestId('focus-trap-shadow-root-iframe'));
        const lastButton = within(shadowContainer).getByRole('button', { name: 'last' });

        // Passing the iframe-owned DOM element directly to `user.fill()` does
        // not focus it reliably in Firefox.
        // eslint-disable-next-line testing-library/prefer-screen-queries -- `frameLocator` is a Vitest Browser locator, not a render result.
        await user.fill(frameLocator.getByLabelText('after'), 'focused');
        expect(frameDocument.activeElement).to.equal(outsideAfter);

        await user.tab({ shift: true });
        expect(shadowRoot.activeElement).to.equal(lastButton);
      } finally {
        unmount?.();
        document.body.removeChild(frame);
      }
    });
  });

  it('restores focus when closed', () => {
    function Test(props: GenericProps) {
      return (
        <FocusTrap open {...props}>
          <div data-testid="focus-root" tabIndex={-1}>
            <input />
          </div>
        </FocusTrap>
      );
    }
    const { setProps } = render(<Test />);

    setProps({ open: false });

    expect(initialFocus).toHaveFocus();
  });

  it('undesired: enabling restore-focus logic when closing has no effect', () => {
    function Test(props: GenericProps) {
      return (
        <FocusTrap open disableRestoreFocus {...props}>
          <div data-testid="root" tabIndex={-1}>
            <input data-testid="focus-input" />
          </div>
        </FocusTrap>
      );
    }
    const { setProps } = render(<Test />);

    setProps({ open: false, disableRestoreFocus: false });

    // undesired: should be expect(initialFocus).toHaveFocus();
    expect(screen.getByTestId('root')).toHaveFocus();
  });

  it('undesired: setting `disableRestoreFocus` to false before closing has no effect', () => {
    function Test(props: GenericProps) {
      return (
        <FocusTrap open disableRestoreFocus {...props}>
          <div data-testid="root" tabIndex={-1}>
            <input data-testid="focus-input" />
          </div>
        </FocusTrap>
      );
    }
    const { setProps } = render(<Test />);

    setProps({ disableRestoreFocus: false });
    setProps({ open: false });

    // undesired: should be expect(initialFocus).toHaveFocus();
    expect(screen.getByTestId('root')).toHaveFocus();
  });

  describe('interval', () => {
    clock.withFakeTimers();

    it('contains the focus if the active element is removed', async () => {
      function WithRemovableElement({ hideButton = false }) {
        return (
          <FocusTrap open>
            <div tabIndex={-1} data-testid="root">
              {!hideButton && (
                <button type="button" data-testid="hide-button">
                  I am going to disappear
                </button>
              )}
            </div>
          </FocusTrap>
        );
      }

      const { setProps } = render(<WithRemovableElement />);

      expect(screen.getByTestId('root')).toHaveFocus();
      await act(async () => {
        screen.getByTestId('hide-button').focus();
      });
      expect(screen.getByTestId('hide-button')).toHaveFocus();

      setProps({ hideButton: true });
      expect(screen.getByTestId('root')).not.toHaveFocus();
      clock.tick(500); // wait for the interval check to kick in.
      expect(screen.getByTestId('root')).toHaveFocus();
    });

    describe('prop: disableAutoFocus', () => {
      it('should not trap', async () => {
        render(
          <div>
            <input />
            <FocusTrap open disableAutoFocus>
              <div tabIndex={-1} data-testid="root" />
            </FocusTrap>
          </div>,
        );

        clock.tick(500); // trigger an interval call

        expect(initialFocus).toHaveFocus();

        await act(async () => {
          screen.getByRole('textbox').focus();
        });
        expect(screen.getByRole('textbox')).toHaveFocus();
      });

      it('should trap once the focus moves inside', async () => {
        render(
          <div>
            <input data-testid="outside-input" />
            <FocusTrap open disableAutoFocus>
              <div tabIndex={-1} data-testid="root">
                <button type="button" data-testid="focus-input" />
              </div>
            </FocusTrap>
          </div>,
        );

        expect(initialFocus).toHaveFocus();

        await act(async () => {
          screen.getByTestId('outside-input').focus();
        });
        expect(screen.getByTestId('outside-input')).toHaveFocus();

        // the trap activates
        await act(async () => {
          screen.getByTestId('focus-input').focus();
        });
        expect(screen.getByTestId('focus-input')).toHaveFocus();

        // the trap prevent to escape
        await act(async () => {
          screen.getByTestId('outside-input').focus();
        });
        expect(screen.getByTestId('root')).toHaveFocus();
      });

      it('should restore the focus', async () => {
        function Test(props: GenericProps) {
          return (
            <div>
              <input data-testid="outside-input" />
              <FocusTrap open disableAutoFocus {...props}>
                <div tabIndex={-1} data-testid="root">
                  <input data-testid="focus-input" />
                </div>
              </FocusTrap>
            </div>
          );
        }

        const { setProps } = render(<Test />);

        // set the expected focus restore location
        await act(async () => {
          screen.getByTestId('outside-input').focus();
        });
        expect(screen.getByTestId('outside-input')).toHaveFocus();

        // the trap activates
        await act(async () => {
          screen.getByTestId('root').focus();
        });
        expect(screen.getByTestId('root')).toHaveFocus();

        // restore the focus to the first element before triggering the trap
        setProps({ open: false });
        expect(screen.getByTestId('outside-input')).toHaveFocus();
      });
    });
  });
});
