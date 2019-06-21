import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import PropTypes from 'prop-types';

function FocusOnMountMenuItem(props) {
  const listItemRef = React.useRef(null);
  React.useLayoutEffect(() => {
    listItemRef.current.focus();
  }, []);
  return <MenuItem {...props} ref={listItemRef} tabIndex={0} />;
}

function TrackCommitCountMenuItem({ actions, ...other }) {
  const commitCountRef = React.useRef(0);
  React.useEffect(() => {
    commitCountRef.current += 1;
  });
  React.useImperativeHandle(
    actions,
    () => ({
      getCommitCount: () => {
        return commitCountRef.current;
      },
    }),
    [],
  );
  return <MenuItem {...other} />;
}
TrackCommitCountMenuItem.propTypes = {
  /**
   * @ignore
   */
  actions: PropTypes.shape({ current: PropTypes.object }),
};

/**
 * @param {any} wrapper - return from react-testing-library `render`
 * @param {number} focusableIndex - the index of the menuitem that should be focusable
 */
function expectSingleMenuItemTabFocusable(wrapper, focusableIndex) {
  const items = wrapper.getAllByRole('menuitem');

  items.forEach((item, index) => {
    if (index === focusableIndex) {
      expect(item).to.have.attribute('tabIndex', '0');
    } else {
      expect(item).to.have.attribute('tabIndex', '-1');
    }
  });
}

/**
 * @param {Element} element
 * @param {string} focusVisibleClass - CSS class that is applied by a focus-visible polyfill
 */
function expectFocusVisible(element, focusVisibleClass) {
  expect(element).to.be.focused;
  expect(element).to.have.class(focusVisibleClass);
}

describe('<MenuList> integration', () => {
  let render;

  if (/Chrome\/49\.0/.test(window.navigator.userAgent)) {
    // fails repeatedly on chrome 49 in karma but works when manually testing
    // the same component tree (-TrackCommitCountMenuItem) in isolation in browserstack
    return;
  }

  before(() => {
    render = createClientRender({ strict: true });
  });

  after(() => {
    cleanup();
  });

  describe('keyboard controls and tabIndex manipulation', () => {
    let wrapper;
    let getCommitCount;

    before(function prepare() {
      const actionsRef = React.createRef();
      wrapper = render(
        <MenuList>
          <MenuItem autoFocus tabIndex={0}>
            Menu Item 1
          </MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <TrackCommitCountMenuItem actions={actionsRef}>Menu Item 4</TrackCommitCountMenuItem>
        </MenuList>,
      );
      ({
        current: { getCommitCount },
      } = actionsRef);
    });

    it('has 4 menuitems', () => {
      expect(wrapper.getAllByRole('menuitem')).to.have.length(4);
    });

    it('should have the first item tabIndexed', () => {
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(getCommitCount()).to.equal(1);
    });

    it('should select/focus the first item', () => {
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
    });

    it('should select the last item when pressing up', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;
      expect(getCommitCount()).to.equal(1);
    });

    it('should select the first item when pressing down', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
      expect(getCommitCount()).to.equal(1);
    });

    it('should still be focused and focusable when going back and forth', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(getCommitCount()).to.equal(1);
    });

    it('should focus the second item', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
      expect(getCommitCount()).to.equal(1);
    });

    it('should leave tabIndex on the first item after blur', () => {
      const handleBlur = spy();
      wrapper.setProps({ onBlur: handleBlur });

      expect(document.activeElement).to.be.ok;
      document.activeElement.blur();

      expect(handleBlur.callCount).to.equal(1);
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')).to.satisfy(function noneFocused(items) {
        return items.every(item => item !== document.activeElement);
      });
    });

    it('should reset to first item selected', () => {
      const firstItem = wrapper.getAllByRole('menuitem')[0];
      firstItem.focus();
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(firstItem).to.be.focused;
    });

    it('should focus the second item again', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
    });

    it('should focus the third item', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[2]).to.be.focused;
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem autoFocus selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should select/focus the second item', () => {
      expectSingleMenuItemTabFocusable(wrapper, 1);
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
    });

    it('should focus the third item', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 1);
      expect(wrapper.getAllByRole('menuitem')[2]).to.be.focused;
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item, no item autoFocus', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected tabIndex={0}>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should focus the first item if no item is focused when pressing ArrowDown', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 1);
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
    });

    it('should focus the first item if no item is focused when pressing ArrowUp', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expectSingleMenuItemTabFocusable(wrapper, 1);
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;
    });
  });

  describe('MenuItem with focus on mount', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <FocusOnMountMenuItem>Menu Item 3</FocusOnMountMenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should have the 3rd item tabIndexed and focused', () => {
      expectSingleMenuItemTabFocusable(wrapper, 2);
      expect(wrapper.getAllByRole('menuitem')[2]).to.be.focused;
    });
  });

  // broken
  describe('MenuList with disableListWrap', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <MenuList disableListWrap>
          <MenuItem tabIndex={0}>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should not wrap focus with ArrowUp from first', () => {
      wrapper.getByRole('menu').focus();

      // First ArrowUp moves focus from MenuList to first item
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
    });

    it('should not wrap focus with ArrowDown from last', () => {
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expectSingleMenuItemTabFocusable(wrapper, 0);
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;
    });
  });

  describe('MenuList with divider and disabled item', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <Divider component="li" />
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem disabled>Menu Item 3</MenuItem>
          <MenuItem>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should skip divider and disabled menu item', () => {
      wrapper.getByRole('menu').focus();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[0]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[3]).to.be.focused;
    });
  });

  describe('MenuList with only one focusable menu item', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <MenuList>
          <MenuItem disabled>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem disabled>Menu Item 3</MenuItem>
          <MenuItem disabled>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should go to only focusable item', () => {
      wrapper.getByRole('menu').focus();

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getAllByRole('menuitem')[1]).to.be.focused;
    });
  });

  describe('MenuList with all menu items disabled', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <MenuList>
          <MenuItem disabled>Menu Item 1</MenuItem>
          <MenuItem disabled>Menu Item 2</MenuItem>
          <MenuItem disabled>Menu Item 3</MenuItem>
          <MenuItem disabled>Menu Item 4</MenuItem>
        </MenuList>,
      );
    });

    it('should not get in infinite loop', () => {
      wrapper.getByRole('menu').focus();

      fireEvent.keyDown(document.activeElement, { key: 'Home' });
      expect(wrapper.getByRole('menu')).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getByRole('menu')).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(wrapper.getByRole('menu')).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'End' });
      expect(wrapper.getByRole('menu')).to.be.focused;
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(wrapper.getByRole('menu')).to.be.focused;
    });
  });

  describe('MenuList text-based keyboard controls', () => {
    let wrapper;
    let innerTextSupported;

    const resetWrapper = () => {
      const itemProps = { focusVisibleClassName: 'test-focus-visible' };
      wrapper = render(
        <MenuList disableListWrap>
          <MenuItem {...itemProps}>Arizona</MenuItem>
          <MenuItem {...itemProps}>aardvark</MenuItem>
          <MenuItem {...itemProps}>Colorado</MenuItem>
          <MenuItem {...itemProps}>Argentina</MenuItem>
          <MenuItem {...itemProps}>
            color <a href="/">Focusable Descendant</a>
          </MenuItem>
          <MenuItem {...itemProps} />
          <MenuItem {...itemProps}>Hello Worm</MenuItem>
          <MenuItem {...itemProps}>
            Hello <span style={{ display: 'none' }}>Test innerText</span> World
          </MenuItem>
        </MenuList>,
      );

      // Resets hadKeyboardEvent in focusVisible.js back to true. Simulated events don't
      // propagate to the document.
      fireEvent.keyDown(document.activeElement);

      // jsdom doesn't implement innerText
      innerTextSupported = wrapper.getByRole('menu').innerText !== undefined;
    };

    beforeEach(resetWrapper);

    it('should support repeating initial character', () => {
      wrapper.getAllByRole('menuitem')[0].focus();

      fireEvent.keyDown(document.activeElement, { key: 'a' });
      expect(wrapper.getByText('aardvark')).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'a' });
      expect(wrapper.getByText('Argentina')).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'r' });
      expect(wrapper.getByText('aardvark')).to.be.focused;
    });

    it('should not get focusVisible class on click', () => {
      wrapper.getAllByRole('menuitem')[0].focus();

      fireEvent.keyDown(document.activeElement, { key: 'End' });
      expect(wrapper.getAllByRole('menuitem')[7]).to.be.focused;

      const firstMenuItem = wrapper.getByText('Arizona');
      fireEvent.mouseDown(firstMenuItem);
      firstMenuItem.focus();
      fireEvent.click(firstMenuItem);

      expect(firstMenuItem).to.be.focused;
      expect(firstMenuItem).not.to.have.class('test-focus-visible');
    });

    it('should not move focus when no match', () => {
      wrapper.getAllByRole('menuitem')[0].focus();

      fireEvent.keyDown(document.activeElement, { key: 'c' });
      expectFocusVisible(wrapper.getByText('Colorado'), 'test-focus-visible');

      fireEvent.keyDown(document.activeElement, { key: 'z' });
      expectFocusVisible(wrapper.getByText('Colorado'), 'test-focus-visible');

      fireEvent.keyDown(document.activeElement, { key: 'a' });
      expectFocusVisible(wrapper.getByText('Colorado'), 'test-focus-visible');
    });

    it('should not move focus when additional keys match current focus', () => {
      wrapper.getAllByRole('menuitem')[0].focus();

      fireEvent.keyDown(document.activeElement, { key: 'c' });
      expectFocusVisible(wrapper.getByText('Colorado'), 'test-focus-visible');

      fireEvent.keyDown(document.activeElement, { key: 'o' });
      expectFocusVisible(wrapper.getByText('Colorado'), 'test-focus-visible');

      fireEvent.keyDown(document.activeElement, { key: 'l' });
      expectFocusVisible(wrapper.getByText('Colorado'), 'test-focus-visible');
    });

    it('should avoid infinite loop if focus starts on descendant', () => {
      const link = wrapper.getByText('Focusable Descendant');
      link.focus();
      fireEvent.keyDown(document.activeElement, { key: 'z' });

      expect(link).to.be.focused;
    });

    it('should reset matching after wait', done => {
      wrapper.getAllByRole('menuitem')[0].focus();

      fireEvent.keyDown(document.activeElement, { key: 'c' });
      expect(wrapper.getByText('Colorado')).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'z' });
      expect(wrapper.getByText('Colorado')).to.be.focused;

      setTimeout(() => {
        fireEvent.keyDown(document.activeElement, { key: 'a' });
        expect(wrapper.getByText('Argentina')).to.be.focused;

        done();
      }, 700);
    });

    it('should match ignoring hidden text', function testHiddenText() {
      if (!innerTextSupported) {
        // Will only be executed in Karma tests, since jsdom doesn't support innerText
        this.skip();
      }

      wrapper.getAllByRole('menuitem')[0].focus();

      fireEvent.keyDown(document.activeElement, { key: 'h' });
      fireEvent.keyDown(document.activeElement, { key: 'e' });
      fireEvent.keyDown(document.activeElement, { key: 'l' });
      fireEvent.keyDown(document.activeElement, { key: 'l' });
      fireEvent.keyDown(document.activeElement, { key: 'o' });
      fireEvent.keyDown(document.activeElement, { key: ' ' });
      fireEvent.keyDown(document.activeElement, { key: 'w' });
      fireEvent.keyDown(document.activeElement, { key: 'o' });
      fireEvent.keyDown(document.activeElement, { key: 'r' });
      expect(wrapper.getByText('Hello Worm')).to.be.focused;

      fireEvent.keyDown(document.activeElement, { key: 'l' });
      fireEvent.keyDown(document.activeElement, { key: 'd' });
      expect(wrapper.getByText('Hello World')).to.be.focused;
    });
  });
});
