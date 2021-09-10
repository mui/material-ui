import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { describeConformance, createClientRender, within, fireEvent, act } from 'test/utils';
import BottomNavigationAction, {
  bottomNavigationActionClasses as classes,
} from '@mui/material/BottomNavigationAction';
import ButtonBase from '@mui/material/ButtonBase';

describe('<BottomNavigationAction />', () => {
  const render = createClientRender();

  describeConformance(<BottomNavigationAction />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiBottomNavigationAction',
    refInstanceof: window.HTMLButtonElement,
    testVariantProps: { showLabel: true },
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('adds a `selected` class when selected', () => {
    const { getByRole } = render(<BottomNavigationAction selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should render label with the selected class when selected', () => {
    const { container } = render(<BottomNavigationAction selected />);

    expect(container.querySelector(`.${classes.label}`)).to.have.class(classes.selected);
  });

  it('adds a `iconOnly` class by default', () => {
    const { getByRole } = render(<BottomNavigationAction />);

    expect(getByRole('button')).to.have.class(classes.iconOnly);
  });

  it('should render label with the `iconOnly` class', () => {
    const { container } = render(<BottomNavigationAction />);

    expect(container.querySelector(`.${classes.label}`)).to.have.class(classes.iconOnly);
  });

  it('removes the `iconOnly` class when `selected`', () => {
    const { getByRole } = render(<BottomNavigationAction selected />);

    expect(getByRole('button')).not.to.have.class(classes.iconOnly);
  });

  it('removes the `iconOnly` class when `showLabel`', () => {
    const { getByRole } = render(<BottomNavigationAction showLabel />);

    expect(getByRole('button')).not.to.have.class(classes.iconOnly);
  });

  it('should render the passed `icon`', () => {
    const { getByRole } = render(<BottomNavigationAction icon={<div data-testid="icon" />} />);

    expect(within(getByRole('button')).getByTestId('icon')).not.to.equal(null);
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const { getByRole } = render(<BottomNavigationAction onClick={handleClick} />);

      getByRole('button').click();

      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('touch functionality', () => {
    before(function test() {
      // Only run in supported browsers
      if (typeof Touch === 'undefined') {
        this.skip();
      }
    });

    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should fire onClick on touch tap', () => {
      const clickSpy = spy();
      const handleClick = () => act(clickSpy);

      const { container } = render(<BottomNavigationAction onClick={handleClick} />);

      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 42,
            clientY: 42,
          }),
        ],
      });

      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 42,
            clientY: 42,
          }),
        ],
      });

      act(() => {
        clock.tick(100);
      });

      expect(clickSpy.callCount).to.equal(1);
    });

    it('should not fire onClick twice on touch tap', () => {
      const clickSpy = spy();
      const handleClick = () => act(clickSpy);

      const { getByRole, container } = render(<BottomNavigationAction onClick={handleClick} />);

      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 42,
            clientY: 42,
          }),
        ],
      });

      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 42,
            clientY: 42,
          }),
        ],
      });

      getByRole('button').click();

      act(() => {
        clock.tick(100);
      });

      expect(clickSpy.callCount).to.equal(1);
    });

    it('should not fire onClick if swiping', () => {
      const clickSpy = spy();
      const handleClick = () => act(clickSpy);

      const { container } = render(<BottomNavigationAction onClick={handleClick} />);

      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 42,
            clientY: 42,
          }),
        ],
      });

      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 84,
            clientY: 84,
          }),
        ],
      });

      act(() => {
        clock.tick(100);
      });

      expect(clickSpy.callCount).to.equal(0);
    });

    it('should forward onTouchStart and onTouchEnd events', () => {
      const touchStartSpy = spy();
      const touchEndSpy = spy();
      const handleTouchStart = () => act(touchStartSpy);
      const handleTouchEnd = () => act(touchEndSpy);

      const { container } = render(
        <BottomNavigationAction onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} />,
      );

      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 42,
            clientY: 42,
          }),
        ],
      });

      expect(touchStartSpy.callCount).to.be.equals(1);

      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            identifier: 1,
            target: container,
            clientX: 84,
            clientY: 84,
          }),
        ],
      });

      expect(touchEndSpy.callCount).to.be.equals(1);
    });
  });
});
