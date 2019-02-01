import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import MenuList from 'packages/material-ui/src/MenuList';
import MenuItem from 'packages/material-ui/src/MenuItem';
import { createMount } from 'packages/material-ui/src/test-utils';

function assertMenuItemTabIndexed(wrapper, tabIndexed) {
  const items = wrapper.find('MenuItem');

  items.forEach((item, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(item.props().tabIndex, 0, 'should have the tab index');
    } else {
      assert.strictEqual(
        item.props().tabIndex,
        -1,
        `item at index ${index} should not be tab focusable`,
      );
    }
  });
}

function assertMenuItemFocused(wrapper, tabIndexed) {
  const items = wrapper.find('MenuItem');

  items.forEach((item, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(item.find('li').instance(), document.activeElement, 'should be focused');
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

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should have the first item tabIndexed', () => {
      assertMenuItemTabIndexed(wrapper, 0);
    });

    it('should select/focus the first item 1', () => {
      wrapper.instance().focus();
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should select the last item when pressing up', () => {
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 3);
    });

    it('should select the first item when pressing dowm', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
    });

    it('should still have the first item tabIndexed', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 0);
    });

    it('should focus the second item 1', () => {
      wrapper.instance().focus();
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should reset the tabIndex to the first item after blur', done => {
      const handleBlur = spy();
      wrapper.setProps({ onBlur: handleBlur });

      if (!document.activeElement) {
        throw new Error('missing active element');
      }

      document.activeElement.blur();
      setTimeout(() => {
        assert.strictEqual(handleBlur.callCount, 1);
        wrapper.update();
        assertMenuItemTabIndexed(wrapper, 0);
        done();
      }, 60);
    });

    it('should reset the tabIndex to the focused element when calling resetTabIndex', () => {
      wrapper.instance().focus();
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.instance().setTabIndex(2);
      wrapper.instance().resetTabIndex();

      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);

      resetWrapper();
    });

    it('should select/focus the first item 2', () => {
      wrapper.instance().focus();
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should focus the second item 2', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should focus the third item', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 2);
      assertMenuItemFocused(wrapper, 2);
    });

    it('should focus the first item if not focused', () => {
      resetWrapper();
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);

      resetWrapper();
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

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
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 2);
      assertMenuItemFocused(wrapper, 2);
    });

    it('should focus the preselected item if not focused', () => {
      resetWrapper();
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);

      resetWrapper();
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });
  });

  it('should not crash and burn when calling focus() on an empty MenuList', () => {
    const wrapper = mount(<MenuList />);
    wrapper.instance().focus();
  });

  it('should not crash and burn when calling focus() on an unmounted MenuList', () => {
    const wrapper = mount(<MenuList />);
    delete wrapper.instance().list;
    wrapper.instance().focus();
  });
});
