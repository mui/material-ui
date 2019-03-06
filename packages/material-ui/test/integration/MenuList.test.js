import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import MenuList from 'packages/material-ui/src/MenuList';
import MenuItem from 'packages/material-ui/src/MenuItem';
import RootRef from 'packages/material-ui/src/RootRef';
import { createMount } from 'packages/material-ui/src/test-utils';

function FocusOnMountMenuItem(props) {
  const listItemRef = React.useRef();
  React.useLayoutEffect(() => {
    listItemRef.current.focus();
  }, []);
  return (
    <RootRef rootRef={listItemRef}>
      <MenuItem {...props} tabIndex={0} />
    </RootRef>
  );
}

function assertMenuItemTabIndexed(wrapper, tabIndexed) {
  const items = wrapper.find('li[role="menuitem"]');
  assert.strictEqual(items.length, 4);

  items.forEach((item, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(item.props().tabIndex, 0);
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
  const items = wrapper.find('li[role="menuitem"]');
  assert.strictEqual(items.length, 4);

  items.forEach((item, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(item.find('li').instance(), document.activeElement);
    }
  });
}

function initializeFocus(wrapper) {
  wrapper
    .find('[tabIndex=0]')
    .first()
    .getDOMNode()
    .focus();
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
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should have the first item tabIndexed', () => {
      assertMenuItemTabIndexed(wrapper, 0);
    });

    it('should select/focus the first item 1', () => {
      initializeFocus(wrapper);
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
      initializeFocus(wrapper);
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

    it('should select/focus the first item 2', () => {
      initializeFocus(wrapper);
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
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should have the 2nd item tabIndexed', () => {
      assertMenuItemTabIndexed(wrapper, 1);
    });

    it('should select/focus the second item', () => {
      initializeFocus(wrapper);
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should focus the third item', () => {
      initializeFocus(wrapper);
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

  describe('MenuItem with focus on mount', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <FocusOnMountMenuItem>Menu Item 3</FocusOnMountMenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should have the 3nd item tabIndexed and focused', () => {
      assertMenuItemTabIndexed(wrapper, 2);
      assertMenuItemFocused(wrapper, 2);
    });
  });

  describe('MenuList with disableListWrap', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList disableListWrap>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should not wrap focus with ArrowUp from first', () => {
      initializeFocus(wrapper);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should not wrap focus with ArrowDown from last', () => {
      initializeFocus(wrapper);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 3);
      assertMenuItemFocused(wrapper, 3);

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 3);
      assertMenuItemFocused(wrapper, 3);
    });
  });
});
