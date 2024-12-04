import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { act, createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { Popper as PopperUnstyled } from '@mui/base/Popper';
import { DropdownContext, DropdownContextValue } from '@mui/base/useDropdown';
import { ThemeProvider } from '@mui/joy/styles';
import Menu, { menuClasses as classes } from '@mui/joy/Menu';
import Dropdown from '@mui/joy/Dropdown';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import describeConformance from '../../test/describeConformance';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true, changeReason: null },
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
      'themeDefaultProps', // portal, can't determine the root
    ],
  }));

  const anchorEl = document.createElement('div');
  anchorEl.setAttribute('aria-controls', 'test');

  it('should render with `ul` by default', () => {
    render(<Menu anchorEl={anchorEl} open data-testid="popover" />);
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
      <Menu anchorEl={anchorEl} open={false}>
        <div data-testid="children" />
      </Menu>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ open: true });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  it('should have role="menu"', () => {
    render(<Menu anchorEl={anchorEl} open data-testid="popover" />);

    expect(screen.getByTestId('popover')).to.have.attribute('role', 'menu');
  });

  it('ignores invalid children', () => {
    render(
      <Menu anchorEl={anchorEl} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(1);
  });

  describe('classnames', () => {
    it('size prop', () => {
      render(<Menu anchorEl={anchorEl} data-testid="menu" open size="sm" />);

      expect(screen.getByTestId('menu')).to.have.class(classes.sizeSm);
    });

    it('variant prop', () => {
      render(<Menu anchorEl={anchorEl} data-testid="menu" open variant="soft" />);

      expect(screen.getByTestId('menu')).to.have.class(classes.variantSoft);
    });

    it('color prop', () => {
      render(<Menu anchorEl={anchorEl} data-testid="menu" open color="primary" />);

      expect(screen.getByTestId('menu')).to.have.class(classes.colorPrimary);
    });
  });
});
