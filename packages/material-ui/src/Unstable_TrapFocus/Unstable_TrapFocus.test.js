import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFakeTimers } from 'sinon';
import { expect } from 'chai';
import { act, createClientRender, fireEvent, screen } from 'test/utils';
import TrapFocus from './Unstable_TrapFocus';
import Portal from '../Portal';

describe('<TrapFocus />', () => {
  const render = createClientRender();

  const defaultProps = {
    getDoc: () => document,
    isEnabled: () => true,
  };
  let initialFocus = null;

  beforeEach(() => {
    initialFocus = document.createElement('button');
    initialFocus.tabIndex = 0;
    document.body.appendChild(initialFocus);
    initialFocus.focus();
  });

  afterEach(() => {
    document.body.removeChild(initialFocus);
  });

  it('should return focus to the children', () => {
    const { getByTestId } = render(
      <TrapFocus {...defaultProps} open>
        <div tabIndex={-1} data-testid="modal">
          <input autoFocus data-testid="auto-focus" />
        </div>
      </TrapFocus>,
    );

    expect(getByTestId('auto-focus')).toHaveFocus();

    initialFocus.focus();
    expect(getByTestId('modal')).toHaveFocus();
  });

  it('should not return focus to the children when disableEnforceFocus is true', () => {
    const { getByTestId } = render(
      <TrapFocus {...defaultProps} open disableEnforceFocus>
        <div tabIndex={-1}>
          <input autoFocus data-testid="auto-focus" />
        </div>
      </TrapFocus>,
    );

    expect(getByTestId('auto-focus')).toHaveFocus();

    initialFocus.focus();

    expect(initialFocus).toHaveFocus();
  });

  it('should focus first focusable child in portal', () => {
    const { getByTestId } = render(
      <TrapFocus {...defaultProps} open>
        <div tabIndex={-1}>
          <Portal>
            <input autoFocus data-testid="auto-focus" />
          </Portal>
        </div>
      </TrapFocus>,
    );

    expect(getByTestId('auto-focus')).toHaveFocus();
  });

  it('should warn if the modal content is not focusable', () => {
    const UnfocusableDialog = React.forwardRef((_, ref) => <div ref={ref} />);

    expect(() => {
      render(
        <TrapFocus {...defaultProps} open>
          <UnfocusableDialog />
        </TrapFocus>,
      );
    }).toErrorDev('Material-UI: The modal content node does not accept focus');
  });

  it('should not attempt to focus nonexistent children', () => {
    const EmptyDialog = React.forwardRef(() => null);

    render(
      <TrapFocus {...defaultProps} open>
        <EmptyDialog />
      </TrapFocus>,
    );
  });

  it('should loop the tab key', () => {
    render(
      <TrapFocus {...defaultProps} open>
        <div tabIndex={-1} data-testid="modal">
          <div>Title</div>
          <button type="button">x</button>
          <button type="button">cancel</button>
          <button type="button">ok</button>
        </div>
      </TrapFocus>,
    );

    fireEvent.keyDown(screen.getByTestId('modal'), {
      keyCode: 13, // Enter
    });
    fireEvent.keyDown(screen.getByTestId('modal'), {
      keyCode: 9, // Tab
    });

    expect(document.querySelector('[data-test="sentinelStart"]')).toHaveFocus();

    initialFocus.focus();
    fireEvent.keyDown(screen.getByTestId('modal'), {
      keyCode: 9, // Tab
      shiftKey: true,
    });

    expect(document.querySelector('[data-test="sentinelEnd"]')).toHaveFocus();
  });

  it('does not steal focus from a portaled element if any prop but open changes', () => {
    function getDoc() {
      return document;
    }
    function isEnabled() {
      return true;
    }
    function Test(props) {
      return (
        <TrapFocus getDoc={getDoc} isEnabled={isEnabled} disableAutoFocus open {...props}>
          <div data-testid="focus-root" tabIndex={-1}>
            {ReactDOM.createPortal(<input />, document.body)}
          </div>
        </TrapFocus>
      );
    }
    const { setProps } = render(<Test />);
    const portaledTextbox = screen.getByRole('textbox');
    portaledTextbox.focus();
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
    let mountDeferredComponent;
    const DeferredComponent = React.forwardRef(function DeferredComponent(props, ref) {
      const [mounted, setMounted] = React.useReducer(() => true, false);

      mountDeferredComponent = setMounted;

      if (mounted) {
        return <div ref={ref} {...props} />;
      }
      return null;
    });
    render(
      <TrapFocus getDoc={() => document} isEnabled={() => true} open>
        <DeferredComponent data-testid="deferred-component" />
      </TrapFocus>,
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
    const eventLog = [];
    function Test(props) {
      return (
        <div onBlur={() => eventLog.push('blur')}>
          <TrapFocus getDoc={() => document} isEnabled={() => true} open {...props}>
            <div data-testid="focus-root" tabIndex={-1}>
              <input />
            </div>
          </TrapFocus>
        </div>
      );
    }
    const { setProps } = render(<Test />);

    // same behavior, just referential equality changes
    setProps({ isEnabled: () => true });

    expect(screen.getByTestId('focus-root')).toHaveFocus();
    expect(eventLog).to.deep.equal([]);
  });

  it('restores focus when closed', () => {
    function Test(props) {
      return (
        <TrapFocus getDoc={() => document} isEnabled={() => true} open {...props}>
          <div data-testid="focus-root" tabIndex={-1}>
            <input />
          </div>
        </TrapFocus>
      );
    }
    const { setProps } = render(<Test />);

    setProps({ open: false });

    expect(initialFocus).toHaveFocus();
  });

  it('undesired: enabling restore-focus logic when closing has no effect', () => {
    function Test(props) {
      return (
        <TrapFocus
          getDoc={() => document}
          isEnabled={() => true}
          open
          disableRestoreFocus
          {...props}
        >
          <div data-testid="focus-root" tabIndex={-1}>
            <input />
          </div>
        </TrapFocus>
      );
    }
    const { setProps } = render(<Test />);

    setProps({ open: false, disableRestoreFocus: false });

    // undesired: should be expect(initialFocus).toHaveFocus();
    expect(screen.getByTestId('focus-root')).toHaveFocus();
  });

  it('undesired: setting `disableRestoreFocus` to false before closing has no effect', () => {
    function Test(props) {
      return (
        <TrapFocus
          getDoc={() => document}
          isEnabled={() => true}
          open
          disableRestoreFocus
          {...props}
        >
          <div data-testid="focus-root" tabIndex={-1}>
            <input />
          </div>
        </TrapFocus>
      );
    }
    const { setProps } = render(<Test />);

    setProps({ disableRestoreFocus: false });
    setProps({ open: false });

    // undesired: should be expect(initialFocus).toHaveFocus();
    expect(screen.getByTestId('focus-root')).toHaveFocus();
  });

  describe('interval', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('contains the focus if the active element is removed', () => {
      function WithRemovableElement({ hideButton = false }) {
        return (
          <TrapFocus {...defaultProps} open>
            <div tabIndex={-1} role="dialog">
              {!hideButton && <button type="button">I am going to disappear</button>}
            </div>
          </TrapFocus>
        );
      }

      const { getByRole, setProps } = render(<WithRemovableElement />);
      const dialog = getByRole('dialog');
      const toggleButton = getByRole('button', { name: 'I am going to disappear' });
      expect(dialog).toHaveFocus();

      toggleButton.focus();
      expect(toggleButton).toHaveFocus();

      setProps({ hideButton: true });
      expect(dialog).not.toHaveFocus();
      clock.tick(500); // wait for the interval check to kick in.
      expect(dialog).toHaveFocus();
    });

    describe('prop: disableAutoFocus', () => {
      it('should not trap', () => {
        const { getByRole } = render(
          <div>
            <input />
            <TrapFocus {...defaultProps} open disableAutoFocus>
              <div tabIndex={-1} data-testid="modal" />
            </TrapFocus>
          </div>,
        );

        clock.tick(500); // trigger an interval call
        expect(initialFocus).toHaveFocus();

        getByRole('textbox').focus(); // trigger a focus event
        expect(getByRole('textbox')).toHaveFocus();
      });

      it('should trap once the focus moves inside', () => {
        const { getByRole, getByTestId } = render(
          <div>
            <input />
            <TrapFocus {...defaultProps} open disableAutoFocus>
              <div tabIndex={-1} data-testid="modal" />
            </TrapFocus>
          </div>,
        );

        expect(initialFocus).toHaveFocus();

        // the trap activates
        getByTestId('modal').focus();
        expect(getByTestId('modal')).toHaveFocus();

        // the trap prevent to escape
        getByRole('textbox').focus();
        expect(getByTestId('modal')).toHaveFocus();
      });

      it('should restore the focus', () => {
        const Test = (props) => (
          <div>
            <input />
            <TrapFocus {...defaultProps} open disableAutoFocus {...props}>
              <div tabIndex={-1} data-testid="modal" />
            </TrapFocus>
          </div>
        );

        const { getByRole, getByTestId, setProps } = render(<Test />);

        // set the expected focus restore location
        getByRole('textbox').focus();

        // the trap activates
        getByTestId('modal').focus();
        expect(getByTestId('modal')).toHaveFocus();

        // restore the focus to the first element before triggering the trap
        setProps({ open: false });
        expect(getByRole('textbox')).toHaveFocus();
      });
    });
  });
});
