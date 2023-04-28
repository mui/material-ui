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
import { ThemeProvider } from '@mui/joy/styles';
import Menu, { menuClasses as classes } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import PopperUnstyled from '@mui/base/Popper';

describe('Joy <Menu />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  describeConformance(<Menu anchorEl={() => document.createElement('div')} open />, () => ({
    classes,
    inheritComponent: PopperUnstyled, // `Unstyled` suffix must exist for parser to recognise that this component inherits Base UI component
    render,
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

  describeJoyColorInversion(
    <Menu
      open
      disablePortal
      anchorEl={() => document.createElement('div')}
      data-testid="test-element"
    />,
    {
      muiName: 'JoyMenu',
      classes,
      portalSlot: 'root',
    },
  );

  it('should render with `ul` by default', () => {
    render(<Menu anchorEl={document.createElement('div')} open data-testid="popover" />);
    expect(screen.getByTestId('popover')).to.have.tagName('ul');
  });

  it('should pass onClose prop to Popover', () => {
    const handleClose = spy();
    render(
      <Menu anchorEl={document.createElement('div')} open onClose={handleClose}>
        <MenuItem />
      </Menu>,
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
      <Menu anchorEl={document.createElement('div')} open={false}>
        <div data-testid="children" />
      </Menu>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ open: true });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  it('should have role="menu"', () => {
    render(<Menu anchorEl={document.createElement('div')} open data-testid="popover" />);

    expect(screen.getByTestId('popover')).to.have.attribute('role', 'menu');
  });

  it('ignores invalid children', () => {
    render(
      <Menu anchorEl={document.createElement('div')} open>
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
      render(<Menu anchorEl={document.createElement('div')} data-testid="menu" open size="sm" />);

      expect(screen.getByTestId('menu')).to.have.class(classes.sizeSm);
    });

    it('variant prop', () => {
      render(
        <Menu anchorEl={document.createElement('div')} data-testid="menu" open variant="soft" />,
      );

      expect(screen.getByTestId('menu')).to.have.class(classes.variantSoft);
    });

    it('color prop', () => {
      render(
        <Menu anchorEl={document.createElement('div')} data-testid="menu" open color="primary" />,
      );

      expect(screen.getByTestId('menu')).to.have.class(classes.colorPrimary);
    });
  });
});
