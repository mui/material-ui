import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';

describe('<MenuList> integration', () => {
  const render = createClientRender();

  if (/Chrome\/49\.0/.test(window.navigator.userAgent)) {
    // fails repeatedly on chrome 49 in karma but works when manually testing
    // the same component tree (-TrackCommitCountMenuItem) in isolation in browserstack
    return;
  }

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

      expect(getAllByRole('menuitem')[0]).to.have.focus;
    });

    it('should select the last item when pressing up if the first item is focused', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[2]).to.have.focus;
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should select the secont item when pressing down if the first item is selected', () => {
      const { getAllByRole } = render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[1]).to.have.focus;
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

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[0]).to.have.focus;
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

      expect(document.activeElement).to.be.ok;
      document.activeElement.blur();
      const menuitems = getAllByRole('menuitem');

      expect(handleBlur.callCount).to.equal(1);
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
      expect(menuitems[0]).not.to.have.focus;
      expect(menuitems[1]).not.to.have.focus;
      expect(menuitems[2]).not.to.have.focus;
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

      menuitems[0].focus();

      expect(menuitems[0]).to.have.focus;
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

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(menuitems[1]).to.have.focus;
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(menuitems[2]).to.have.focus;
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

      expect(menuitems[1]).to.have.focus;
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

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(menuitems[2]).to.have.focus;
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item, no item autoFocus', () => {
    it('should focus the first item if no item is focused when pressing ArrowDown', () => {
      const { getAllByRole } = render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(menuitems[0]).to.have.focus;
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should focus the third item if no item is focused when pressing ArrowUp', () => {
      const { getAllByRole } = render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = getAllByRole('menuitem');

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

      expect(menuitems[2]).to.have.focus;
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

      expect(menuitems[2]).to.have.focus;
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

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

      expect(menuitems[0]).to.have.focus;
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

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(menuitems[1]).to.have.focus;
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
    });
  });

  it('should skip divider and disabled menu item', () => {
    const { getAllByRole } = render(
      <MenuList autoFocus>
        <MenuItem>Menu Item 1</MenuItem>
        <Divider component="li" />
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menuitems = getAllByRole('menuitem');

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[0]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[1]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[3]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[0]).to.have.focus;

    // and ArrowUp again

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menuitems[3]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menuitems[1]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menuitems[0]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menuitems[3]).to.have.focus;
  });

  it('should stay on a single item if it is the only focusable one', () => {
    const { getAllByRole } = render(
      <MenuList autoFocus>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menuitems = getAllByRole('menuitem');

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[1]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[1]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menuitems[1]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menuitems[1]).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menuitems[1]).to.have.focus;
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

    fireEvent.keyDown(document.activeElement, { key: 'Home' });

    expect(menu).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menu).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

    expect(menu).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'End' });

    expect(menu).to.have.focus;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

    expect(menu).to.have.focus;
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
      getByRole('menu').focus();

      fireEvent.keyDown(document.activeElement, { key: 'a' });

      expect(getByText('Arizona')).to.have.focus;
    });

    it('selects the next item starting with the typed character', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>Arcansas</MenuItem>
        </MenuList>,
      );
      getByText('Arizona').focus();

      fireEvent.keyDown(document.activeElement, { key: 'a' });

      expect(getByText('Arcansas')).to.have.focus;
    });

    it('should not get focusVisible class on click', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem focusVisibleClassName="focus-visible">Arizona</MenuItem>
        </MenuList>,
      );

      const menuitem = getByText('Arizona');
      // user click
      fireEvent.mouseDown(menuitem);
      menuitem.focus();
      fireEvent.click(menuitem);

      expect(menuitem).to.have.focus;
      expect(menuitem).not.to.have.class('focus-visible');
    });

    it('should not move focus when no match', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem autoFocus>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'c' });

      expect(getByText('Arizona')).to.have.focus;
    });

    it('should not move focus when keys match current focus', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem autoFocus>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'A' });

      expect(getByText('Arizona')).to.have.focus;

      fireEvent.keyDown(document.activeElement, { key: 'r' });

      expect(getByText('Arizona')).to.have.focus;
    });

    it('should not move focus if focus starts on descendant and the key doesnt match', () => {
      const { getByText } = render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>
            <button type="button">Focusable Descendant</button>
          </MenuItem>
        </MenuList>,
      );
      const button = getByText('Focusable Descendant');
      button.focus();

      fireEvent.keyDown(document.activeElement, { key: 'z' });

      expect(button).to.have.focus;
    });

    it('matches rapidly typed text', () => {
      const { getByText } = render(
        <MenuList autoFocus>
          <MenuItem>Worm</MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'W' });
      fireEvent.keyDown(document.activeElement, { key: 'o' });

      expect(getByText('Worm')).to.have.focus;
    });

    it('should reset the character buffer after 500ms', done => {
      const { getByText } = render(
        <MenuList autoFocus>
          <MenuItem>Worm</MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'W' });
      setTimeout(() => {
        fireEvent.keyDown(document.activeElement, { key: 'o' });

        expect(getByText('Ordinary')).to.have.focus;
        done();
      }, 500);
    });

    it('should match ignoring hidden text', function testHiddenText() {
      if (!innerTextSupported) {
        // Will only be executed in Karma tests, since jsdom doesn't support innerText
        this.skip();
      }

      const { getByText } = render(
        <MenuList autoFocus>
          <MenuItem>
            W<span style={{ display: 'none' }}>Should not block type focus</span>orm
          </MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(document.activeElement, { key: 'W' });
      fireEvent.keyDown(document.activeElement, { key: 'o' });

      expect(getByText('Worm')).to.have.focus;
    });
  });
});
