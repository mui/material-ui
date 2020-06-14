import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import { createClientRender, fireEvent, screen } from 'test/utils/createClientRender';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ListItem from '../ListItem';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import MenuItem from './MenuItem';

describe('<MenuItem />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<MenuItem />);
  });

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: ListItem,
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
  }));

  it('should render a focusable menuitem', () => {
    render(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.property('tabIndex', -1);
  });

  it('has a ripple when clicked', () => {
    render(<MenuItem TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }} />);
    const menuitem = screen.getByRole('menuitem');

    // ripple starts on mousedown
    fireEvent.mouseDown(menuitem);

    expect(menuitem.querySelectorAll('.ripple-visible')).to.have.length(1);
  });

  it('should render with the selected class but not aria-selected when `selected`', () => {
    render(<MenuItem selected />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
    expect(menuitem).not.to.have.attribute('aria-selected');
  });

  it('can have a role of option', () => {
    render(<MenuItem role="option" aria-selected={false} />);

    expect(screen.queryByRole('option')).not.to.equal(null);
  });

  describe('event callbacks', () => {
    const events = ['click', 'mouseDown', 'mouseEnter', 'mouseLeave', 'mouseUp', 'touchEnd'];

    events.forEach((eventName) => {
      it(`should fire ${eventName}`, () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        render(<MenuItem {...{ [handlerName]: handler }} />);

        fireEvent[eventName](screen.getByRole('menuitem'));

        expect(handler.callCount).to.equal(1);
      });
    });

    it(`should fire focus, keydown, keyup and blur`, () => {
      const handleFocus = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const handleBlur = spy();
      render(
        <MenuItem
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />,
      );
      const menuitem = screen.getByRole('menuitem');

      menuitem.focus();

      expect(handleFocus.callCount).to.equal(1);

      fireEvent.keyDown(menuitem);

      expect(handleKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(menuitem);

      expect(handleKeyUp.callCount).to.equal(1);

      menuitem.blur();

      expect(handleKeyDown.callCount).to.equal(1);
    });

    it('should fire onTouchStart', function touchStartTest() {
      // only run in supported browsers
      if (typeof Touch === 'undefined') {
        this.skip();
      }

      const handleTouchStart = spy();
      render(<MenuItem onTouchStart={handleTouchStart} />);
      const menuitem = screen.getByRole('menuitem');

      const touch = new Touch({ identifier: 0, target: menuitem, clientX: 0, clientY: 0 });
      fireEvent.touchStart(menuitem, { touches: [touch] });

      expect(handleTouchStart.callCount).to.equal(1);
    });
  });

  // Regression test for #10452.
  // Kept for backwards compatibility.
  // In the future we should have a better pattern for this UI.
  it('should not fail with a li > li error message', () => {
    const { rerender } = render(
      <MenuItem>
        <ListItemSecondaryAction>
          <div />
        </ListItemSecondaryAction>
      </MenuItem>,
    );

    expect(document.querySelectorAll('li')).to.have.length(1);

    rerender(
      <MenuItem button={false}>
        <ListItemSecondaryAction>
          <div />
        </ListItemSecondaryAction>
      </MenuItem>,
    );

    expect(document.querySelectorAll('li')).to.have.length(1);
  });

  it('can be disabled', () => {
    render(<MenuItem disabled />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.attribute('aria-disabled', 'true');
  });

  describe('prop: ListItemClasses', () => {
    it('should be able to change the style of ListItem', () => {
      render(<MenuItem ListItemClasses={{ disabled: 'bar' }} disabled />);
      const menuitem = screen.getByRole('menuitem');

      expect(menuitem).to.have.class('bar');
    });
  });
});
