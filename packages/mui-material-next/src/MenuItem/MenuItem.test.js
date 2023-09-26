import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  describeConformance,
  createRenderer,
  fireEvent,
  screen,
} from '@mui-internal/test-utils';
import { MenuProvider } from '@mui/base/useMenu';
import MenuItem, { menuItemClasses as classes } from '@mui/material-next/MenuItem';
// import Menu from '@mui/material-next/Menu';
import ButtonBase from '@mui/material/ButtonBase';

const dummyGetItemState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
  index: 0,
  focusable: true,
});

const testContext = {
  dispatch: () => {},
  getItemIndex: () => 0,
  getItemProps: () => ({}),
  getItemState: dummyGetItemState,
  open: false,
  registerHighlightChangeHandler: () => () => {},
  registerItem: () => ({ id: '', deregister: () => {} }),
  registerSelectionChangeHandler: () => () => {},
  totalSubitemCount: 0,
};

describe('<MenuItem />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuItem data-testid="menuitem">1</MenuItem>, () => ({
    render: (node) => {
      return render(<MenuProvider value={testContext}>{node}</MenuProvider>);
    },
    wrapMount: (mount) => (node) => mount(<MenuProvider value={testContext}>{node}</MenuProvider>),
    classes,
    inheritComponent: ButtonBase,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
    muiName: 'MuiMenuItem',
    testVariantProps: { dense: true },
    skip: ['componentsProp', 'reactTestRenderer'],
  }));

  // const renderWithWrapper = (node) => {
  //   function Test() {
  //     const anchorEl = React.useRef();
  //     return (
  //       <React.Fragment>
  //         <button ref={anchorEl}></button>
  //         <Menu open anchorEl={anchorEl}>{node}</Menu>
  //       </React.Fragment>
  //     )
  //   }

  //   return render(<Test />)
  // }

  it.skip('should render a focusable menuitem', () => {
    render(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.property('tabIndex', -1);
  });

  it.skip('has a ripple when clicked', () => {
    render(<MenuItem TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }} />);
    const menuitem = screen.getByRole('menuitem');

    // ripple starts on mousedown
    fireEvent.mouseDown(menuitem);

    expect(menuitem.querySelectorAll('.ripple-visible')).to.have.length(1);
  });

  it.skip('should render with the selected class but not aria-selected when `selected`', () => {
    render(<MenuItem selected />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
    expect(menuitem).not.to.have.attribute('aria-selected');
  });

  it.skip('can have a role of option', () => {
    render(<MenuItem role="option" aria-selected={false} />);

    expect(screen.queryByRole('option')).not.to.equal(null);
  });

  describe('event callbacks', () => {
    /**
     * @type {Array<keyof typeof fireEvent>}
     */
    const events = ['click', 'mouseDown', 'mouseEnter', 'mouseLeave', 'mouseUp', 'touchEnd'];

    events.forEach((eventName) => {
      it.skip(`should fire ${eventName}`, () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        render(<MenuItem {...{ [handlerName]: handler }} />);

        fireEvent[eventName](screen.getByRole('menuitem'));

        expect(handler.callCount).to.equal(1);
      });
    });

    it.skip(`should fire focus, keydown, keyup and blur`, () => {
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

      act(() => {
        menuitem.focus();
      });

      expect(handleFocus.callCount).to.equal(1);

      fireEvent.keyDown(menuitem);

      expect(handleKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(menuitem);

      expect(handleKeyUp.callCount).to.equal(1);

      menuitem.blur();

      expect(handleKeyDown.callCount).to.equal(1);
    });

    it.skip('should fire onTouchStart', function touchStartTest() {
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

  it.skip('can be disabled', () => {
    render(<MenuItem disabled />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.attribute('aria-disabled', 'true');
  });

  it.skip('can be selected', () => {
    render(<MenuItem selected />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
  });

  it.skip('prop: disableGutters', () => {
    const { rerender } = render(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.gutters);

    rerender(<MenuItem disableGutters />);

    expect(menuitem).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it.skip('should forward the context', () => {
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
