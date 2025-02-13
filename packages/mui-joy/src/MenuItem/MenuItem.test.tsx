import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { MenuProvider, MenuProviderValue } from '@mui/base/useMenu';
import { ThemeProvider } from '@mui/joy/styles';
import MenuItem, { menuItemClasses as classes } from '@mui/joy/MenuItem';
import ListItemButton from '@mui/joy/ListItemButton';
import describeConformance from '../../test/describeConformance';

const testContext: MenuProviderValue = {
  registerItem: () => ({ id: '0', deregister: () => {} }),
  getItemIndex: () => 0,
  totalSubitemCount: 1,
  dispatch: () => {},
  getItemState: () => ({
    highlighted: false,
    selected: false,
    focusable: false,
  }),
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MenuProvider value={testContext}>{children}</MenuProvider>;
}

describe('Joy <MenuItem />', () => {
  const { render: baseRender } = createRenderer();
  const render = (element: React.JSX.Element, options = {}) =>
    baseRender(element, {
      wrapper: Wrapper as React.JSXElementConstructor<{ children?: React.ReactNode }>,
      ...options,
    });

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: ListItemButton,
    render: (node) => render(<MenuProvider value={testContext}>{node}</MenuProvider>),
    ThemeProvider,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
    muiName: 'JoyMenuItem',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

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
    const events: Array<keyof typeof fireEvent> = [
      'click',
      'mouseDown',
      'mouseEnter',
      'mouseLeave',
      'mouseUp',
      'touchEnd',
    ];

    events.forEach((eventName) => {
      it(`should fire ${eventName}`, async () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        render(<MenuItem {...{ [handlerName]: handler }} />);

        fireEvent[eventName](screen.getByRole('menuitem'));

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
          tabIndex={0}
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

      await act(async () => {
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
