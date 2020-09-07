import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  getClasses,
  createMount,
  describeConformance,
  createClientRender,
  within,
  fireEvent,
  act,
} from 'test/utils';
import ButtonBase from '../ButtonBase';
import BottomNavigationAction from './BottomNavigationAction';

describe('<BottomNavigationAction />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<BottomNavigationAction />);
  });

  describeConformance(<BottomNavigationAction />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
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

  it('should fire onClick on touch tap', (done) => {
    const handleClick = spy();

    // If disableTouchRipple is not applied, errors are thrown due to "code that updates TouchRiple is not wrapped in act()"
    const { container } = render(
      <BottomNavigationAction onClick={handleClick} disableTouchRipple />,
    );

    act(() => {
      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            clientX: 42,
            clientY: 42,
          }),
        ],
      });
    });

    act(() => {
      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            clientX: 42,
            clientY: 42,
          }),
        ],
      });
    });

    setTimeout(() => {
      expect(handleClick.callCount).to.equal(1);
      done();
    }, 15);
  });

  it('should not fire onClick twice on touch tap', (done) => {
    const handleClick = spy();

    // If disableTouchRipple is not applied, errors are thrown due to "code that updates TouchRiple is not wrapped in act()"
    const { getByRole, container } = render(
      <BottomNavigationAction onClick={handleClick} disableTouchRipple />,
    );

    act(() => {
      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            clientX: 42,
            clientY: 42,
          }),
        ],
      });
    });

    act(() => {
      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            clientX: 42,
            clientY: 42,
          }),
        ],
      });
    });

    act(() => {
      getByRole('button').click();
    });

    setTimeout(() => {
      expect(handleClick.callCount).to.equal(1);
      done();
    }, 15);
  });

  it('should not fire onClick if swiping', (done) => {
    const handleClick = spy();

    // If disableTouchRipple is not applied, errors are thrown due to "code that updates TouchRiple is not wrapped in act()"
    const { container } = render(
      <BottomNavigationAction onClick={handleClick} disableTouchRipple />,
    );

    act(() => {
      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            clientX: 42,
            clientY: 42,
          }),
        ],
      });
    });

    act(() => {
      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            clientX: 84,
            clientY: 84,
          }),
        ],
      });
    });

    setTimeout(() => {
      expect(handleClick.callCount).to.equal(0);
      done();
    }, 15);
  });

  it('should forward onTouchStart and onTouchEnd events', () => {
    const handleTouchStart = spy();
    const handleTouchEnd = spy();

    // If disableTouchRipple is not applied, errors are thrown due to "code that updates TouchRiple is not wrapped in act()"
    const { container } = render(
      <BottomNavigationAction
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disableTouchRipple
      />,
    );

    act(() => {
      fireEvent.touchStart(container.firstChild, {
        touches: [
          new Touch({
            clientX: 42,
            clientY: 42,
          }),
        ],
      });
    });

    expect(handleTouchStart.callCount).to.be.equals(1);

    act(() => {
      fireEvent.touchEnd(container.firstChild, {
        changedTouches: [
          new Touch({
            clientX: 84,
            clientY: 84,
          }),
        ],
      });
    });

    expect(handleTouchEnd.callCount).to.be.equals(1);
  });
});
