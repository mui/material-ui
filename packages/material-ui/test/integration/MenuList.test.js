import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import MenuList from 'packages/material-ui/src/MenuList';
import MenuItem from 'packages/material-ui/src/MenuItem';
import Divider from 'packages/material-ui/src/Divider';
import { createMount } from 'packages/material-ui/src/test-utils';
import PropTypes from 'prop-types';

function FocusOnMountMenuItem(props) {
  const listItemRef = React.useRef();
  React.useLayoutEffect(() => {
    listItemRef.current.focus();
  }, []);
  return <MenuItem {...props} ref={listItemRef} tabIndex={0} />;
}

function TrackRenderCountMenuItem({ actions, ...other }) {
  const renderCountRef = React.useRef(0);
  React.useEffect(() => {
    renderCountRef.current += 1;
  });
  React.useImperativeHandle(actions, () => ({
    getRenderCount: () => {
      return renderCountRef.current;
    },
  }));
  return <MenuItem {...other} />;
}
TrackRenderCountMenuItem.propTypes = {
  /**
   * @ignore
   */
  actions: PropTypes.shape({ current: PropTypes.object }),
};

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

function assertMenuItemFocused(wrapper, focusedIndex) {
  const items = wrapper.find('li[role="menuitem"]');
  assert.strictEqual(items.length, 4);

  items.forEach((item, index) => {
    if (index === focusedIndex) {
      assert.strictEqual(item.find('li').instance(), document.activeElement);
    } else {
      assert.notStrictEqual(item.find('li').instance(), document.activeElement);
    }
  });
}

describe('<MenuList> integration', () => {
  let mount;

  before(() => {
    // StrictModeViolation: uses RootRef
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('keyboard controls and tabIndex manipulation', () => {
    let wrapper;
    let item1Ref;
    let item4ActionsRef;

    const resetWrapper = () => {
      item1Ref = React.createRef();
      item4ActionsRef = React.createRef();
      wrapper = mount(
        <MenuList>
          <MenuItem ref={item1Ref} autoFocus tabIndex={0}>
            Menu Item 1
          </MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <TrackRenderCountMenuItem actions={item4ActionsRef}>Menu Item 4</TrackRenderCountMenuItem>
        </MenuList>,
      );
    };

    const assertItem4RenderCount = expectedRenderCount => {
      assert.strictEqual(item4ActionsRef.current.getRenderCount(), expectedRenderCount);
    };

    before(resetWrapper);

    it('should have the first item tabIndexed', () => {
      assertMenuItemTabIndexed(wrapper, 0);
      assertItem4RenderCount(1);
    });

    it('should select/focus the first item 1', () => {
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
      assertItem4RenderCount(1);
    });

    it('should select the last item when pressing up', () => {
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 3);
      assertItem4RenderCount(1);
    });

    it('should select the first item when pressing dowm', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertItem4RenderCount(1);
    });

    it('should still have the first item tabIndexed', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 0);
      assertItem4RenderCount(1);
    });

    it('should focus the second item 1', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 1);
      assertItem4RenderCount(1);
    });

    it('should leave tabIndex on the first item after blur', done => {
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
        assertMenuItemFocused(wrapper, -1);
        done();
      }, 60);
    });

    it('should select/focus the first item 2', () => {
      item1Ref.current.focus();
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should focus the second item 2', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should focus the third item', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 2);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem autoFocus selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should select/focus the second item', () => {
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 1);
    });

    it('should focus the third item', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 2);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item, no item autoFocus', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should focus the first item if not focused', () => {
      resetWrapper();
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 0);

      resetWrapper();
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 1);
      assertMenuItemFocused(wrapper, 3);
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
          <MenuItem tabIndex={0}>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should not wrap focus with ArrowUp from first', () => {
      // First ArrowUp moves focus from MenuList to first item
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 0);
    });

    it('should not wrap focus with ArrowDown from last', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 3);

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemTabIndexed(wrapper, 0);
      assertMenuItemFocused(wrapper, 3);
    });
  });

  describe('MenuList with divider and disabled item', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <Divider />
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem disabled>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should skip divider and disabled menu item', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 0);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 3);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 0);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 3);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 0);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 3);
    });
  });

  describe('MenuList with focusable divider', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <Divider tabIndex={-1} />
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should include divider with tabIndex specified', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 0);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      // Focus is on divider instead of a menu item
      assertMenuItemFocused(wrapper, -1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 2);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 3);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 0);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 3);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 2);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      // Focus is on divider instead of a menu item
      assertMenuItemFocused(wrapper, -1);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 0);
    });
  });

  describe('MenuList with only one focusable menu item', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem disabled>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem disabled>Menu Item 3</MenuItem>
          <MenuItem disabled>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should go to only focusable item', () => {
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, 1);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 1);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, 1);
    });
  });

  describe('MenuList with all menu items disabled', () => {
    let wrapper;

    const resetWrapper = () => {
      wrapper = mount(
        <MenuList>
          <MenuItem disabled>Menu Item 1</MenuItem>
          <MenuItem disabled>Menu Item 2</MenuItem>
          <MenuItem disabled>Menu Item 3</MenuItem>
          <MenuItem disabled>Menu Item 4</MenuItem>
        </MenuList>,
      );
    };

    before(resetWrapper);

    it('should not get in infinite loop', () => {
      wrapper.simulate('keyDown', { key: 'Home' });
      assertMenuItemFocused(wrapper, -1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, -1);
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      assertMenuItemFocused(wrapper, -1);

      wrapper.simulate('keyDown', { key: 'End' });
      assertMenuItemFocused(wrapper, -1);
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      assertMenuItemFocused(wrapper, -1);
    });
  });
});
