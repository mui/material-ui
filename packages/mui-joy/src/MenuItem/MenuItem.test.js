import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  describeConformance,
  createRenderer,
  fireEvent,
  screen,
  describeJoyColorInversion,
} from 'test/utils';
import { MenuProvider } from '@mui/base/useMenu';
import { ThemeProvider } from '@mui/joy/styles';
import MenuItem, { menuItemClasses as classes } from '@mui/joy/MenuItem';
import ListItemButton from '@mui/joy/ListItemButton';

const testContext = {
  registerItem: () => ({ id: 0, deregister: () => {} }),
  getItemIndex: () => 0,
  totalSubitemCount: 1,
  dispatch: () => {},
  getItemState: () => ({
    disabled: false,
    highlighted: false,
    selected: false,
    index: 0,
  }),
  registerHighlightChangeHandler: () => () => {},
  registerSelectionChangeHandler: () => () => {},
};

function Wrapper({ children }) {
  return <MenuProvider value={testContext}>{children}</MenuProvider>;
}

describe('Joy <MenuItem />', () => {
  const { render: baseRender } = createRenderer();
  const render = (element, options = {}) => baseRender(element, { wrapper: Wrapper, ...options });

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: ListItemButton,
    render: (node) => render(<MenuProvider value={testContext}>{node}</MenuProvider>),
    wrapMount: (mount) => (node) => {
      const wrapper = mount(<MenuProvider value={testContext}>{node}</MenuProvider>);
      return wrapper.childAt(0);
    },
    ThemeProvider,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
    muiName: 'JoyMenuItem',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['propsSpread', 'componentsProp', 'classesRoot', 'reactTestRenderer'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<MenuItem />, {
    muiName: 'JoyMenuItem',
    classes,
    wrapper: (node) => <MenuProvider value={testContext}>{node}</MenuProvider>,
  });

  it('should render with the variant class', () => {
    const { getByRole } = render(<MenuItem variant="outlined" />);
    expect(getByRole('menuitem')).to.have.class(classes.variantOutlined);
  });

  it('should render with primary color class', () => {
    const { getByRole } = render(<MenuItem color="primary" />);
    expect(getByRole('menuitem')).to.have.class(classes.colorPrimary);
  });

  it('should render a focusable menuitem', () => {
    render(<MenuItem />);
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.property('tabIndex', -1);
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
          tabIndex={0}
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

      act(() => {
        menuitem.blur();
      });

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
});
