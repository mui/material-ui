// @flow weak

import * as React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { spy } from 'sinon';
import MenuList from 'src/Menu/MenuList';
import MenuItem from 'src/Menu/MenuItem';
import { createMount } from 'src/test-utils';

function assertMenuItemTabIndexed(wrapper, tabIndexed) {
  const items = wrapper.find('MenuItem');

  items.forEach((item, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(item.prop('tabIndex'), '0', 'should have the tab index');
    } else {
      assert.strictEqual(
        item.prop('tabIndex'),
        '-1',
        `item at index ${index} should not be tab focusable`,
      );
    }
  });
}

function assertMenuItemFocused(wrapper, tabIndexed) {
  const items = wrapper.find('MenuItem');

  items.forEach((item, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(item.find('li').get(0), document.activeElement, 'should be focused');
    }
  });
}

describe('<MenuList> integration', () => {
  let mount;

  before(() => {
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });

  describe('keyboard controls and tabIndex manipulation', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should have the first item tabIndexed', () => {
      assertMenuItemTabIndexed(wrapper, 0);
    });

    it('should select/focus the first item', () => {
      wrapper.instance().focus();
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should focus the second item', () => {
      wrapper.instance().focus();
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should reset the tabIndex to the first item after blur', done => {
      const handleBlur = spy();
      wrapper.setProps({
        onBlur: handleBlur,
      });

      if (!document.activeElement) {
        throw new Error('missing active element');
      }

      document.activeElement.blur();
      setTimeout(() => {
        assert.strictEqual(handleBlur.callCount, 1);
        assertMenuItemTabIndexed(wrapper, 0);
        done();
      }, 60);
    });

    it('should select/focus the first item', () => {
      wrapper.instance().focus();
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should focus the second item', () => {
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should focus the third item', () => {
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertMenuItemTabIndexed(wrapper, 2);
      assertMenuItemFocused(wrapper, 2);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should have the 2nd item tabIndexed', () => {
      assertMenuItemTabIndexed(wrapper, 1);
    });

    it('should select/focus the second item', () => {
      wrapper.instance().focus();
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should focus the third item', () => {
      wrapper.instance().focus();
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertMenuItemTabIndexed(wrapper, 2);
      assertMenuItemFocused(wrapper, 2);
    });
  });
});
