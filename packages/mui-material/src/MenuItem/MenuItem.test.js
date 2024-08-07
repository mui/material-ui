import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import MenuItem, { menuItemClasses as classes } from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import ListContext from '../List/ListContext';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<MenuItem />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
    muiName: 'MuiMenuItem',
    testVariantProps: { dense: true },
    skip: ['componentsProp'],
  }));

  it('should render a focusable menuitem', () => {
    render(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.property('tabIndex', -1);
  });

  it('has a ripple when clicked', async () => {
    render(<MenuItem TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }} />);
    const menuitem = screen.getByRole('menuitem');

    await ripple.startTouch(menuitem);

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
    /**
     * @type {Array<keyof typeof fireEvent>}
     */
    const events = ['click', 'mouseDown', 'mouseEnter', 'mouseLeave', 'mouseUp', 'touchEnd'];

    events.forEach((eventName) => {
      it(`should fire ${eventName}`, async () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        render(<MenuItem {...{ [handlerName]: handler }} />);

        await act(async () => fireEvent[eventName](screen.getByRole('menuitem')));

        expect(handler.callCount).to.equal(1);
      });
    });

    it(`should fire focus, keydown, keyup and blur`, async () => {
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

      await act(async () => {
        menuitem.focus();
      });

      expect(handleFocus.callCount).to.equal(1);

      fireEvent.keyDown(menuitem);

      expect(handleKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(menuitem);

      expect(handleKeyUp.callCount).to.equal(1);

      await act(async () => menuitem.blur());

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

  it('can be disabled', () => {
    render(<MenuItem disabled />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.attribute('aria-disabled', 'true');
  });

  it('can be selected', () => {
    render(<MenuItem selected />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
  });

  it('prop: disableGutters', () => {
    const { rerender } = render(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.gutters);

    rerender(<MenuItem disableGutters />);

    expect(menuitem).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <MenuItem>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </MenuItem>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });
});
