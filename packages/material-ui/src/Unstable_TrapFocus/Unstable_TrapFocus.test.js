import * as React from 'react';
import { useFakeTimers } from 'sinon';
import { expect } from 'chai';
import TrapFocus from './Unstable_TrapFocus';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender, fireEvent, screen } from 'test/utils/createClientRender';

describe('<TrapFocus />', () => {
  const render = createClientRender({ strict: false });

  const sharedProps = {
    getDoc: () => document,
    isEnabled: () => true,
  };

  let initialFocus = null;
  beforeEach(() => {
    consoleErrorMock.spy();

    initialFocus = document.createElement('button');
    initialFocus.tabIndex = 0;
    document.body.appendChild(initialFocus);
    initialFocus.focus();
  });

  afterEach(() => {
    consoleErrorMock.reset();
    document.body.removeChild(initialFocus);
  });

  it('should return focus to the children', () => {
    const { getByTestId } = render(
      <TrapFocus open {...sharedProps}>
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
      <TrapFocus open disableEnforceFocus {...sharedProps}>
        <div tabIndex={-1}>
          <input autoFocus data-testid="auto-focus" />
        </div>
      </TrapFocus>,
    );

    expect(getByTestId('auto-focus')).toHaveFocus();

    initialFocus.focus();

    expect(initialFocus).toHaveFocus();
  });

  it('should warn if the modal content is not focusable', () => {
    const UnfocusableDialog = React.forwardRef((_, ref) => <div ref={ref} />);

    render(
      <TrapFocus open {...sharedProps}>
        <UnfocusableDialog />
      </TrapFocus>,
    );

    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.messages()[0]).to.include(
      'Material-UI: The modal content node does not accept focus',
    );
  });

  it('should not attempt to focus nonexistent children', () => {
    const EmptyDialog = () => null;

    render(
      <TrapFocus open {...sharedProps}>
        <EmptyDialog />
      </TrapFocus>,
    );
  });

  it('should loop the tab key', () => {
    render(
      <TrapFocus open {...sharedProps}>
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

  describe('', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('contains the focus if the active element is removed', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }

      function WithRemovableElement({ hideButton = false }) {
        return (
          <TrapFocus open {...sharedProps}>
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
  });
});
