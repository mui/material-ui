import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import {
  act,
  createRenderer,
  describeConformance,
  screen,
  fireEvent,
  describeJoyColorInversion,
} from 'test/utils';
import { Popper as PopperUnstyled } from '@mui/base/Popper';
import { DropdownContext, DropdownContextValue } from '@mui/base/useDropdown';
import { ThemeProvider } from '@mui/joy/styles';
import Menu, { menuClasses as classes } from '@mui/joy/Menu';
import Dropdown from '@mui/joy/Dropdown';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: document.createElement('div'),
};

describe('Joy <Menu />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  describeConformance(<Menu />, () => ({
    classes,
    inheritComponent: PopperUnstyled, // `Unstyled` suffix must exist for parser to recognise that this component inherits Base UI component
    render: (node) => {
      return render(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
    },
    wrapMount: (mount) => (node: React.ReactNode) => {
      const wrapper = mount(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    ThemeProvider,
    muiName: 'JoyMenu',
    refInstanceof: window.HTMLUListElement,
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testVariantProps: { variant: 'soft' },
    testCustomVariant: true,
    skip: [
      'rootClass', // portal, can't determine the root
      'classesRoot',
      'componentProp',
      'componentsProp',
      'reactTestRenderer', // react-transition-group issue
      'themeDefaultProps', // portal, can't determine the root
    ],
  }));

  describeJoyColorInversion(<Menu disablePortal data-testid="test-element" />, {
    muiName: 'JoyMenu',
    classes,
    portalSlot: 'root',
    wrapper: (node) => (
      <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>
    ),
  });

  it('should render with `ul` by default', () => {
    render(
      <DropdownContext.Provider value={testContext}>
        <Menu data-testid="popover" />
      </DropdownContext.Provider>,
    );
    expect(screen.getByTestId('popover')).to.have.tagName('ul');
  });

  it('should pass onClose prop to Popover', () => {
    const handleClose = spy();
    render(
      <Dropdown open onOpenChange={handleClose}>
        <MenuButton />
        <Menu>
          <MenuItem />
        </Menu>
      </Dropdown>,
    );

    const item = screen.getByRole('menuitem');

    act(() => {
      item.focus();
    });

    fireEvent.keyDown(item, { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
  });

  it('renders its children only when open', () => {
    const { setProps } = render(
      <DropdownContext.Provider value={{ ...testContext, state: { open: false } }}>
        <Menu>
          <div data-testid="children" />
        </Menu>
      </DropdownContext.Provider>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ value: testContext });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  it('should have role="menu"', () => {
    render(
      <DropdownContext.Provider value={testContext}>
        <Menu data-testid="popover" />
      </DropdownContext.Provider>,
    );

    expect(screen.getByTestId('popover')).to.have.attribute('role', 'menu');
  });

  it('ignores invalid children', () => {
    render(
      <DropdownContext.Provider value={testContext}>
        <Menu>
          {null}
          <span role="menuitem">hello</span>
          {/* testing conditional rendering */}
          {false && <span role="menuitem">hello</span>}
          {undefined}
          foo
        </Menu>
      </DropdownContext.Provider>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(1);
  });

  describe('classnames', () => {
    it('size prop', () => {
      render(
        <DropdownContext.Provider value={testContext}>
          <Menu data-testid="menu" size="sm" />
        </DropdownContext.Provider>,
      );

      expect(screen.getByTestId('menu')).to.have.class(classes.sizeSm);
    });

    it('variant prop', () => {
      render(
        <DropdownContext.Provider value={testContext}>
          <Menu data-testid="menu" variant="soft" />
        </DropdownContext.Provider>,
      );

      expect(screen.getByTestId('menu')).to.have.class(classes.variantSoft);
    });

    it('color prop', () => {
      render(
        <DropdownContext.Provider value={testContext}>
          <Menu data-testid="menu" color="primary" />
        </DropdownContext.Provider>,
      );

      expect(screen.getByTestId('menu')).to.have.class(classes.colorPrimary);
    });
  });
});
