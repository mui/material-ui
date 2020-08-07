import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, fireEvent, screen } from 'test/utils/createClientRender';
import Portal from '../Portal';
import ClickAwayListener from './ClickAwayListener';

describe('<ClickAwayListener />', () => {
  const render = createClientRender();

  it('should render the children', () => {
    const children = <span />;
    const { container } = render(
      <ClickAwayListener onClickAway={() => {}}>{children}</ClickAwayListener>,
    );
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  describe('prop: onClickAway', () => {
    it('should be called when clicking away', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>,
      );

      fireEvent.click(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });

    it('should not be called when clicking inside', () => {
      const handleClickAway = spy();
      const { container } = render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>,
      );

      fireEvent.click(container.querySelector('span'));
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should be called when preventDefault is `true`', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>,
      );
      const preventDefault = (event) => event.preventDefault();
      document.body.addEventListener('click', preventDefault);

      fireEvent.click(document.body);
      expect(handleClickAway.callCount).to.equal(1);

      document.body.removeEventListener('click', preventDefault);
    });

    it('should not be called when clicking inside a portaled element', () => {
      const handleClickAway = spy();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </ClickAwayListener>,
      );

      fireEvent.click(getByText('Inside a portal'));
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should be called when clicking inside a portaled element and `disableReactTree` is `true`', () => {
      const handleClickAway = spy();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway} disableReactTree>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </ClickAwayListener>,
      );

      fireEvent.click(getByText('Inside a portal'));
      expect(handleClickAway.callCount).to.equal(1);
    });

    it('should not be called even if the event propagation is stopped', () => {
      const handleClickAway = spy();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway} disableReactTree>
          <div>
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              Outside a portal
            </div>
            <Portal>
              <span
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Stop inside a portal
              </span>
            </Portal>
            <Portal>
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  event.nativeEvent.stopImmediatePropagation();
                }}
              >
                Stop all inside a portal
              </span>
            </Portal>
          </div>
        </ClickAwayListener>,
      );

      fireEvent.click(getByText('Outside a portal'));
      expect(handleClickAway.callCount).to.equal(0);

      fireEvent.click(getByText('Stop all inside a portal'));
      expect(handleClickAway.callCount).to.equal(0);

      fireEvent.click(getByText('Stop inside a portal'));
      // True-negative, we don't have enough information to do otherwise.
      expect(handleClickAway.callCount).to.equal(1);
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent={false}>
          <span />
        </ClickAwayListener>,
      );
      fireEvent.click(document.body);
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
          <span />
        </ClickAwayListener>,
      );
      fireEvent.mouseUp(document.body);
      expect(handleClickAway.callCount).to.equal(0);
      fireEvent.mouseDown(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });
  });

  describe('prop: touchEvent', () => {
    it('should not call `props.onClickAway` when `props.touchEvent` is `false`', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent={false}>
          <span />
        </ClickAwayListener>,
      );
      fireEvent.touchEnd(document.body);
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should call `props.onClickAway` when the appropriate touch event is triggered', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchStart">
          <span />
        </ClickAwayListener>,
      );
      fireEvent.touchEnd(document.body);
      expect(handleClickAway.callCount).to.equal(0);
      fireEvent.touchStart(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });

    it('should ignore `touchend` when preceded by `touchmove` event', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchEnd">
          <span />
        </ClickAwayListener>,
      );
      fireEvent.touchStart(document.body);
      fireEvent.touchMove(document.body);
      fireEvent.touchEnd(document.body);
      expect(handleClickAway.callCount).to.equal(0);

      fireEvent.touchEnd(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });
  });

  it('should handle null child', () => {
    const Child = React.forwardRef(() => null);
    const handleClickAway = spy();
    render(
      <ClickAwayListener onClickAway={handleClickAway}>
        <Child />
      </ClickAwayListener>,
    );
    fireEvent.click(document.body);
    expect(handleClickAway.callCount).to.equal(0);
  });

  [
    ['onClick', false],
    ['onClick', true],
    ['onClickCapture', false],
    ['onClickCapture', true],
  ].forEach(([eventName, disableReactTree]) => {
    it(`when 'disableRectTree=${disableReactTree}' ${eventName} triggers onClickAway if an outside target is removed`, function test() {
      if (!new Event('click').composedPath) {
        this.skip();
      }

      const handleClickAway = spy();
      function Test() {
        const [buttonShown, hideButton] = React.useReducer(() => false, true);

        return (
          <React.Fragment>
            {buttonShown && <button {...{ [eventName]: hideButton }} type="button" />}
            <ClickAwayListener onClickAway={handleClickAway} disableReactTree={disableReactTree}>
              <div />
            </ClickAwayListener>
          </React.Fragment>
        );
      }
      render(<Test />);

      screen.getByRole('button').click();

      expect(handleClickAway.callCount).to.equal(1);
    });

    it(`when 'disableRectTree=${disableReactTree}' ${eventName} does not trigger onClickAway if an inside target is removed`, function test() {
      if (!new Event('click').composedPath) {
        this.skip();
      }

      const handleClickAway = spy();

      function Test() {
        const [buttonShown, hideButton] = React.useReducer(() => false, true);

        return (
          <ClickAwayListener onClickAway={handleClickAway} disableReactTree={disableReactTree}>
            <div>{buttonShown && <button {...{ [eventName]: hideButton }} type="button" />}</div>
          </ClickAwayListener>
        );
      }
      render(<Test />);

      screen.getByRole('button').click();

      expect(handleClickAway.callCount).to.equal(0);
    });
  });
});
