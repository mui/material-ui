import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { FocusTrap } from '@mui/base/FocusTrap';
import { Portal } from '@mui/base/Portal';

interface GenericProps {
  [index: string]: any;
}

describe('<FocusTrap />', () => {
  const { clock, render } = createRenderer();

  let initialFocus: HTMLElement | null = null;

  beforeEach(() => {
    initialFocus = document.createElement('button');
    initialFocus.tabIndex = 0;
    document.body.appendChild(initialFocus);
    act(() => {
      initialFocus!.focus();
    });
  });

  afterEach(() => {
    document.body.removeChild(initialFocus!);
  });

  it('should return focus to the root', () => {
    const { getByTestId } = render(
      <FocusTrap open>
        <div tabIndex={-1} data-testid="root">
          <input autoFocus data-testid="auto-focus" />
        </div>
      </FocusTrap>,
      // TODO: https://github.com/reactwg/react-18/discussions/18#discussioncomment-893076
      { strictEffects: false },
    );

    expect(getByTestId('auto-focus')).toHaveFocus();

    act(() => {
      initialFocus!.focus();
    });
    expect(getByTestId('root')).toHaveFocus();
  });

  it('should not return focus to the children when disableEnforceFocus is true', () => {
    const { getByTestId } = render(
      <FocusTrap open disableEnforceFocus>
        <div tabIndex={-1}>
          <input autoFocus data-testid="auto-focus" />
        </div>
      </FocusTrap>,
      // TODO: https://github.com/reactwg/react-18/discussions/18#discussioncomment-893076s
      { strictEffects: false },
    );

    expect(getByTestId('auto-focus')).toHaveFocus();

    act(() => {
      initialFocus!.focus();
    });

    expect(initialFocus).toHaveFocus();
  });

  it('should focus first focusable child in portal', () => {
    const { getByTestId } = render(
      <FocusTrap open>
        <div tabIndex={-1}>
          <Portal>
            <input autoFocus data-testid="auto-focus" />
          </Portal>
        </div>
      </FocusTrap>,
    );

    expect(getByTestId('auto-focus')).toHaveFocus();
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

  it('does not steal focus from a portaled element if any prop but open changes', () => {
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
    act(() => {
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

  it('undesired: lazy root does not get autofocus', () => {
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

    act(() => {
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

  it('does not focus if isEnabled returns false', () => {
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
    const { setProps, getByRole } = render(<Test />);
    expect(screen.getByTestId('root')).toHaveFocus();

    act(() => {
      getByRole('textbox').focus();
    });
    expect(getByRole('textbox')).not.toHaveFocus();

    setProps({ isEnabled: () => false });

    act(() => {
      getByRole('textbox').focus();
    });
    expect(getByRole('textbox')).toHaveFocus();
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

    it('contains the focus if the active element is removed', () => {
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
      act(() => {
        screen.getByTestId('hide-button').focus();
      });
      expect(screen.getByTestId('hide-button')).toHaveFocus();

      setProps({ hideButton: true });
      expect(screen.getByTestId('root')).not.toHaveFocus();
      clock.tick(500); // wait for the interval check to kick in.
      expect(screen.getByTestId('root')).toHaveFocus();
    });

    describe('prop: disableAutoFocus', () => {
      it('should not trap', () => {
        const { getByRole } = render(
          <div>
            <input />
            <FocusTrap open disableAutoFocus>
              <div tabIndex={-1} data-testid="root" />
            </FocusTrap>
          </div>,
        );

        clock.tick(500); // trigger an interval call
        expect(initialFocus).toHaveFocus();

        act(() => {
          getByRole('textbox').focus();
        });
        expect(getByRole('textbox')).toHaveFocus();
      });

      it('should trap once the focus moves inside', () => {
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

        act(() => {
          screen.getByTestId('outside-input').focus();
        });
        expect(screen.getByTestId('outside-input')).toHaveFocus();

        // the trap activates
        act(() => {
          screen.getByTestId('focus-input').focus();
        });
        expect(screen.getByTestId('focus-input')).toHaveFocus();

        // the trap prevent to escape
        act(() => {
          screen.getByTestId('outside-input').focus();
        });
        expect(screen.getByTestId('root')).toHaveFocus();
      });

      it('should restore the focus', () => {
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
        act(() => {
          screen.getByTestId('outside-input').focus();
        });
        expect(screen.getByTestId('outside-input')).toHaveFocus();

        // the trap activates
        act(() => {
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
