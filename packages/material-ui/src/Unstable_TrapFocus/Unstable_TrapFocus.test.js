import * as React from 'react';
// import { useFakeTimers } from 'sinon';
import { expect } from 'chai';
import { createClientRender, screen, userEvent } from '../../../../test/utils';
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

  it('should tab loop from last tabbable element to first tabbable element', () => {
    render(
      <TrapFocus {...defaultProps} open>
        <div tabIndex={-1} data-testid="modal">
          <div>Title</div>
          <button autoFocus type="button">
            x
          </button>
          <button type="button">cancel</button>
          <button type="button">ok</button>
        </div>
      </TrapFocus>,
    );

    [...Array(4)].forEach(() => userEvent.tab());
    expect(screen.getByText('cancel')).toHaveFocus();
  });

  it('should tab shift loop from first tabbable element to last tabbable element', () => {
    render(
      <TrapFocus {...defaultProps} open>
        <div tabIndex={-1} data-testid="modal">
          <div>Title</div>
          <button autoFocus type="button">
            x
          </button>
          <button type="button">cancel</button>
          <button type="button">ok</button>
        </div>
      </TrapFocus>,
    );
    [...Array(1)].forEach(() => userEvent.tab({ shift: true }));
    expect(screen.getByText('ok')).toHaveFocus();
  });

  it('contains the focus if the active element is removed', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // see https://github.com/jsdom/jsdom/issues/2953
      this.skip();
    }

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

      expect(initialFocus).toHaveFocus();

      getByRole('textbox').focus(); // trigger a focus event
      expect(getByRole('textbox')).toHaveFocus();
    });

    it('should trap once the focus moves inside', () => {
      render(
        <div>
          <input aria-label="outside-input" />
          <TrapFocus {...defaultProps} open disableAutoFocus>
            <div tabIndex={-1}>
              <button type="button">x</button>
              <button type="button">cancel</button>
              <button type="button">ok</button>
            </div>
          </TrapFocus>
        </div>,
      );

      const input = screen.getByLabelText('outside-input');
      input.focus();
      expect(input).toHaveFocus();
      [...Array(4)].forEach(() => userEvent.tab());
      expect(screen.getByText('x')).toHaveFocus();
    });

    it('should restore the focus', () => {
      const Test = (props) => {
        const [isOpen, setOpen] = React.useState(false);
        return (
          <div>
            <button type="button" onClick={() => setOpen(true)}>
              open
            </button>
            <TrapFocus {...defaultProps} open={isOpen} disableAutoFocus {...props}>
              <div tabIndex={-1}>
                <button type="button" onClick={() => setOpen(false)}>
                  cancel
                </button>
                <button type="button">ok</button>
              </div>
            </TrapFocus>
          </div>
        );
      };

      render(<Test />);

      userEvent.click(screen.getByText('open'));
      userEvent.click(screen.getByText('cancel'));

      expect(screen.getByText('open')).toHaveFocus();
    });
  });
});
