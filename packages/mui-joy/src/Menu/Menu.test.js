import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { act, createRenderer, describeConformance, screen, fireEvent } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Menu, { menuClasses as classes } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import PopperUnstyled from '@mui/base/PopperUnstyled';

describe('Joy <Menu />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  describeConformance(<Menu anchorEl={() => document.createElement('div')} open />, () => ({
    classes,
    inheritComponent: PopperUnstyled,
    render,
    ThemeProvider,
    muiName: 'JoyMenu',
    refInstanceof: window.HTMLDivElement,
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testDeepOverrides: { slotName: 'listbox', slotClassName: classes.listbox },
    skip: [
      'rootClass', // portal, can't determin the root
      'classesRoot',
      'componentProp',
      'componentsProp',
      'reactTestRenderer', // react-transition-group issue
      'themeDefaultProps', // portal, can't determine the root
    ],
  }));

  it('should pass to the Listbox', () => {
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        componentsProps={{
          listbox: {
            'data-testid': 'listbox',
          },
        }}
      />,
    );

    expect(screen.getByTestId('listbox')).to.have.class(classes.listbox);
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

  describe('list node', () => {
    it('should render a menu inside the Popover', () => {
      render(<Menu anchorEl={document.createElement('div')} open data-testid="popover" />);

      expect(screen.getByTestId('popover').querySelector('[role="menu"]')).not.to.equal(null);
    });
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
});
