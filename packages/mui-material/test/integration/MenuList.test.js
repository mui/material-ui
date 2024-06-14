import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  programmaticFocusTriggersFocusVisible,
} from '@mui/internal-test-utils';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

describe('<MenuList> integration', () => {
  const { clock, render } = createRenderer();

  specify('the MenuItems have the `menuitem` role', () => {
    const { getAllByRole } = render(
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>,
    );

    expect(getAllByRole('menuitem')).to.have.length(3);
  });

  describe('keyboard controls and tabIndex manipulation', () => {
    specify('the specified item should be in tab order while the rest is focusable', () => {
      const { getAllByRole } = render(
        <MenuList>
          <MenuItem tabIndex={0}>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('focuses the specified item on mount', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      expect(getAllByRole('menuitem')[0]).toHaveFocus();
    });

    it('should select the last item when pressing up if the first item is focused', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = getAllByRole('menuitem');
      fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should select the second item when pressing down if the first item is selected', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = getAllByRole('menuitem');
      fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should still be focused and focusable when going back and forth', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = getAllByRole('menuitem');
      fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
      fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should leave tabIndex on the first item after blur', () => {
      const handleBlur = spy();
      const { getAllByRole } = render(
        <MenuList autoFocusItem onBlur={handleBlur}>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      expect(document.activeElement).not.to.equal(null);

      act(() => {
        document.activeElement.blur();
      });

      const menuitems = getAllByRole('menuitem');
      expect(handleBlur.callCount).to.equal(1);
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
      expect(menuitems[0]).not.toHaveFocus();
      expect(menuitems[1]).not.toHaveFocus();
      expect(menuitems[2]).not.toHaveFocus();
    });

    it('can imperatively focus the first item', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      act(() => {
        menuitems[0].focus();
      });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('down arrow can go to all items while not changing tabIndex', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);

      fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item', () => {
    it('should auto focus the second item', () => {
      const { getAllByRole } = render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem autoFocus selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should focus next item on ArrowDown', () => {
      const { getAllByRole } = render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem autoFocus selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item, no item autoFocus', () => {
    it('should focus the first item if no item is focused when pressing ArrowDown', () => {
      render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should focus the third item if no item is focused when pressing ArrowUp', () => {
      render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowUp' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });
  });

  specify(
    'initial focus is controlled by setting the selected prop when `autoFocusItem` is enabled',
    () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem selected>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', 0);
      expect(menuitems[3]).to.have.property('tabIndex', -1);
    },
  );

  describe('MenuList with disableListWrap', () => {
    it('should not wrap focus with ArrowUp from first', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem disableListWrap>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
    });

    it('should not wrap focus with ArrowDown from last', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem disableListWrap>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
    });
  });

  it('should skip divider and disabled menu item', () => {
    render(
      <MenuList autoFocus>
        <MenuItem>Menu Item 1</MenuItem>
        <Divider component="li" />
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(menuitems[0]).toHaveFocus();
    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[3]).toHaveFocus();
    fireEvent.keyDown(menuitems[3], { key: 'ArrowDown' });
    expect(menuitems[0]).toHaveFocus();

    // and ArrowUp again
    fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });
    expect(menuitems[3]).toHaveFocus();
    fireEvent.keyDown(menuitems[3], { key: 'ArrowUp' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[0]).toHaveFocus();
    fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });
    expect(menuitems[3]).toHaveFocus();
  });

  it('should stay on a single item if it is the only focusable one', () => {
    render(
      <MenuList autoFocus>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[1]).toHaveFocus();
  });

  it('should keep focus on the menu if all items are disabled', () => {
    const { getByRole } = render(
      <MenuList autoFocus>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem disabled>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menu = getByRole('menu');

    fireEvent.keyDown(menu, { key: 'Home' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'End' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(menu).toHaveFocus();
  });

  it('should allow focus on disabled items when disabledItemsFocusable=true', () => {
    render(
      <MenuList autoFocus disabledItemsFocusable>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem disabled>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );

    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Home' });
    expect(menuitems[0]).toHaveFocus();
    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[2]).toHaveFocus();
    fireEvent.keyDown(menuitems[2], { key: 'End' });
    expect(menuitems[3]).toHaveFocus();
    fireEvent.keyDown(menuitems[3], { key: 'ArrowUp' });
    expect(menuitems[2]).toHaveFocus();
  });

  describe('MenuList text-based keyboard controls', () => {
    let innerTextSupported;

    before(() => {
      const element = document.createElement('div');
      element.appendChild(document.createTextNode('Hello, Dave!'));
      innerTextSupported = element.innerText !== undefined;
    });

    it('selects the first item starting with the character', () => {
      const { getByRole, getByText } = render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );
      const menu = getByRole('menu');
      act(() => {
        menu.focus();
      });

      fireEvent.keyDown(menu, { key: 'a' });

      expect(getByText('Arizona')).toHaveFocus();
    });

    it('should cycle through items when repeating initial character', () => {
      const { getAllByRole, getByText } = render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>aardvark</MenuItem>
          <MenuItem>Colorado</MenuItem>
          <MenuItem>Argentina</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');
      act(() => {
        menuitems[0].focus();
      });

      fireEvent.keyDown(getByText('Arizona'), { key: 'a' });
      expect(getByText('aardvark')).toHaveFocus();

      fireEvent.keyDown(getByText('aardvark'), { key: 'a' });
      expect(getByText('Argentina')).toHaveFocus();

      fireEvent.keyDown(getByText('Argentina'), { key: 'r' });
      expect(getByText('aardvark')).toHaveFocus();
    });

    it('selects the next item starting with the typed character', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>Arcansas</MenuItem>
        </MenuList>,
      );
      act(() => {
        getByText('Arizona').focus();
      });

      fireEvent.keyDown(getByText('Arizona'), { key: 'a' });

      expect(getByText('Arcansas')).toHaveFocus();
    });

    it('should not get focusVisible class on click', async () => {
      const { user, getByText } = render(
        <MenuList>
          <MenuItem focusVisibleClassName="focus-visible">Arizona</MenuItem>
        </MenuList>,
      );

      const menuitem = getByText('Arizona');

      await user.click(menuitem);

      expect(menuitem).toHaveFocus();
      if (programmaticFocusTriggersFocusVisible()) {
        expect(menuitem).to.have.class('focus-visible');
      } else {
        expect(menuitem).not.to.have.class('focus-visible');
      }
    });

    it('should not move focus when no match', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem autoFocus>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(getByText('Arizona'), { key: 'c' });

      expect(getByText('Arizona')).toHaveFocus();
    });

    it('should not move focus when keys match current focus', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem autoFocus>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(getByText('Arizona'), { key: 'A' });

      expect(getByText('Arizona')).toHaveFocus();

      fireEvent.keyDown(getByText('Arizona'), { key: 'r' });

      expect(getByText('Arizona')).toHaveFocus();
    });

    it("should not move focus if focus starts on descendant and the key doesn't match", () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>
            <button type="button">Focusable Descendant</button>
          </MenuItem>
        </MenuList>,
      );
      const button = getByText('Focusable Descendant');
      act(() => {
        button.focus();
      });

      fireEvent.keyDown(button, { key: 'z' });

      expect(button).toHaveFocus();
    });

    it('matches rapidly typed text', () => {
      render(
        <MenuList autoFocus>
          <MenuItem>War</MenuItem>
          <MenuItem>Worm</MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'W' });
      fireEvent.keyDown(screen.getByText('War'), { key: 'o' });

      expect(screen.getByText('Worm')).toHaveFocus();
    });

    describe('time', () => {
      clock.withFakeTimers();

      it('should reset the character buffer after 500ms', () => {
        render(
          <MenuList autoFocus>
            <MenuItem>Worm</MenuItem>
            <MenuItem>Ordinary</MenuItem>
          </MenuList>,
        );

        fireEvent.keyDown(screen.getByRole('menu'), { key: 'W' });
        clock.tick(501);
        fireEvent.keyDown(screen.getByText('Worm'), { key: 'o' });
        expect(screen.getByText('Ordinary')).toHaveFocus();
      });
    });

    it('should match ignoring hidden text', function testHiddenText() {
      if (!innerTextSupported) {
        // Will only be executed in Karma tests, since jsdom doesn't support innerText
        this.skip();
      }

      render(
        <MenuList autoFocus>
          <MenuItem>
            W<span style={{ display: 'none' }}>Should not block type focus</span>orm
          </MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'W' });
      fireEvent.keyDown(screen.getByText('Worm'), { key: 'o' });

      expect(screen.getByText('Worm')).toHaveFocus();
    });
  });
});
