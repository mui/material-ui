import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui-internal/test-utils';
import { MenuProvider } from '@mui/base/useMenu';
import MenuItem, { menuItemClasses as classes } from '@mui/material-next/MenuItem';
import Menu from '@mui/material-next/Menu';
import ButtonBase from '@mui/material-next/ButtonBase';
import describeConformance from '../../test/describeConformance';

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
  const { render } = createRenderer({ clock: 'fake' });

  // afterEach(() => {
  //   document.getElementsByTagName('html')[0].innerHTML = '';
  // });

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

  const renderWithMenu = (node: React.ReactNode) => {
    function Test() {
      return (
        <Menu anchorEl={document.createElement('div')} open>
          {node}
        </Menu>
      );
    }

    return render(<Test />);
  };

  it('should render a focusable menuitem', () => {
    renderWithMenu(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.property('tabIndex', 0);
  });

  it('has a ripple when clicked', () => {
    renderWithMenu(
      <MenuItem TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }} />,
    );
    const menuitem = screen.getByRole('menuitem');

    // ripple starts on mousedown
    fireEvent.mouseDown(menuitem);

    expect(menuitem.querySelectorAll('.ripple-visible')).to.have.length(1);
  });

  it('should render with the selected class but not aria-selected when `selected`', () => {
    renderWithMenu(<MenuItem selected />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
    expect(menuitem).not.to.have.attribute('aria-selected');
  });

  it('can have a role of option', () => {
    renderWithMenu(<MenuItem role="option" aria-selected={false} />);

    expect(screen.queryByRole('option')).not.to.equal(null);
  });

  describe('event callbacks', () => {
    const events: Array<keyof typeof fireEvent> = [
      'click',
      'mouseDown',
      'mouseEnter',
      'mouseLeave',
      'mouseUp',
      'touchEnd',
    ];

    events.forEach((eventName) => {
      it(`should fire ${eventName}`, () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        renderWithMenu(<MenuItem {...{ [handlerName]: handler }} />);

        fireEvent[eventName](screen.getByRole('menuitem'));

        expect(handler.callCount).to.equal(1);
      });
    });

    it(`should fire focus, keydown, keyup and blur`, () => {
      const handleFocus = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const handleBlur = spy();
      renderWithMenu(
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

      expect(handleKeyDown.callCount).to.equal(1);
    });

    it('should fire onTouchStart', function touchStartTest() {
      // only run in supported browsers
      if (typeof Touch === 'undefined') {
        this.skip();
      }

      const handleTouchStart = spy();
      renderWithMenu(<MenuItem onTouchStart={handleTouchStart} />);
      const menuitem = screen.getByRole('menuitem');

      const touch = new Touch({ identifier: 0, target: menuitem, clientX: 0, clientY: 0 });
      fireEvent.touchStart(menuitem, { touches: [touch] });

      expect(handleTouchStart.callCount).to.equal(1);
    });
  });

  it('can be disabled', () => {
    renderWithMenu(<MenuItem disabled />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.attribute('aria-disabled', 'true');
  });

  it('can be selected', () => {
    renderWithMenu(<MenuItem selected />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
  });

  it('prop: disableGutters', () => {
    const { rerender } = render(
      <Menu anchorEl={document.createElement('div')} open>
        <MenuItem />
      </Menu>,
    );
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.gutters);

    rerender(
      <Menu anchorEl={document.createElement('div')} open>
        <MenuItem disableGutters />
      </Menu>,
    );

    expect(menuitem).not.to.have.class(classes.gutters);
  });

  // TODO v6: Need to be re-structured now that we don't use the List component internally
  // describe('context: dense', () => {
  //   it.skip('should forward the context', () => {
  //     let context = null;
  //     const { setProps } = render(
  //       <MenuItem>
  //         <ListContext.Consumer>
  //           {(options) => {
  //             context = options;
  //           }}
  //         </ListContext.Consumer>
  //       </MenuItem>,
  //     );
  //     expect(context).to.have.property('dense', false);
  //     setProps({ dense: true });
  //     expect(context).to.have.property('dense', true);
  //   });
  // });
});
