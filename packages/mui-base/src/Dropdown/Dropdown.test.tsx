import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer } from 'test/utils';
import { Dropdown } from '@mui/base/Dropdown';
import { DropdownContext } from '@mui/base/useDropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Menu } from '@mui/base/Menu';

describe('<Dropdown />', () => {
  const { render } = createRenderer();

  it('registers a popup id correctly', () => {
    function TestComponent() {
      const { registerPopup, popupId } = React.useContext(DropdownContext)!;
      expect(context).not.to.equal(null);

      React.useEffect(() => {
        registerPopup('test-popup');
      }, [registerPopup]);

      return <p>{popupId}</p>;
    }

    const { container } = render(
      <Dropdown>
        <TestComponent />
      </Dropdown>,
    );

    expect(container.innerHTML).to.equal('<p>test-popup</p>');
  });

  it('registers a trigger element correctly', () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('data-testid', 'test-button');

    function TestComponent() {
      const { registerTrigger, triggerElement } = React.useContext(DropdownContext)!;
      expect(context).not.to.equal(null);

      React.useEffect(() => {
        registerTrigger(trigger);
      }, [registerTrigger]);

      return <p>{triggerElement?.getAttribute('data-testid')}</p>;
    }

    const { container } = render(
      <Dropdown>
        <TestComponent />
      </Dropdown>,
    );

    expect(container.innerHTML).to.equal('<p>test-button</p>');
  });

  it('focuses the first item after the menu is opened', () => {
    const { getByRole, getAllByRole } = render(
      <div>
        <Dropdown>
          <MenuButton>Toggle</MenuButton>
          <Menu>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </Dropdown>
      </div>,
    );

    const button = getByRole('button');
    act(() => {
      button.click();
    });

    const menuItems = getAllByRole('menuitem');

    expect(menuItems[0]).toHaveFocus();
  });

  it('focuses the trigger after the menu is closed', () => {
    const { getByRole } = render(
      <div>
        <input type="text" />
        <Dropdown>
          <MenuButton>Toggle</MenuButton>
          <Menu>
            <MenuItem>Close</MenuItem>
          </Menu>
        </Dropdown>
        <input type="text" />
      </div>,
    );

    const button = getByRole('button');
    act(() => {
      button.click();
    });

    const menuItem = getByRole('menuitem');
    act(() => {
      menuItem.click();
    });

    expect(button).toHaveFocus();
  });
});
