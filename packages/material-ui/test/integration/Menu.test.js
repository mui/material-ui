import React from 'react';
import { assert } from 'chai';
import TestUtils from 'react-dom/test-utils';
import { createMount } from 'packages/material-ui/src/test-utils';
import Popover from 'packages/material-ui/src/Popover';
import SimpleMenu from './fixtures/menus/SimpleMenu';
import Menu from 'packages/material-ui/src/Menu';
import MenuItem from 'packages/material-ui/src/MenuItem';
import { setRef } from '../../src/utils/reactHelpers';
import { stub } from 'sinon';
import PropTypes from 'prop-types';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

describe('<Menu> integration', () => {
  let mount;

  before(() => {
    // StrictModeViolation: test uses simulate
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('mounted open', () => {
    let wrapper;
    let portalLayer;

    before(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
    });

    it('should not be open', () => {
      const popover = wrapper.find(Popover);
      assert.strictEqual(popover.props().open, false, 'should have passed open=false to Popover');
      const menuEl = document.getElementById('simple-menu');
      assert.strictEqual(menuEl, null);
    });

    it('should focus the list as nothing has been selected', () => {
      wrapper.find('button').simulate('click');
      portalLayer = document.querySelector('[data-mui-test="Modal"]');
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('ul')[0]);
    });

    it('should change focus to the first item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowDown',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[0]);
    });

    it('should change focus to the 2nd item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowDown',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[1]);
    });

    it('should change focus to the 3rd item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowDown',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should switch focus from the 3rd item to the 1st item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowDown',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[0]);
    });

    it('should switch focus from the 1st item to the 3rd item when up arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowUp',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should switch focus from the 3rd item to the 1st item when home key is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'Home',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[0]);
    });

    it('should switch focus from the 1st item to the 3rd item when end key is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'End',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should keep focus on the last item when a key with no associated action is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowRight',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should change focus to the 2nd item when up arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), {
        key: 'ArrowUp',
      });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[1]);
    });

    it('should select the 2nd item and close the menu', () => {
      portalLayer.querySelectorAll('li')[1].click();
      assert.strictEqual(wrapper.text(), 'selectedIndex: 1, open: false');
    });
  });

  describe('opening with a selected item', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} selectedIndex={2} />);
    });

    it('should not be open', () => {
      const popover = wrapper.find(Popover);
      assert.strictEqual(popover.props().open, false);
      const menuEl = document.getElementById('simple-menu');
      assert.strictEqual(menuEl, null);
    });

    it('should focus the 3rd selected item', () => {
      wrapper.find('button').simulate('click');
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should select the 2nd item and close the menu', () => {
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      const item = portalLayer.querySelector('ul').children[1];
      item.click();
      assert.strictEqual(wrapper.text(), 'selectedIndex: 1, open: false');
    });

    it('should focus the 2nd selected item', () => {
      wrapper.find('button').simulate('click');
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[1]);
    });
  });

  describe('Menu variant differences', () => {
    const contentAnchorTracker = [false, false, false];
    const focusTracker = [false, false, false];
    let menuListFocusTracker = false;
    const tabIndexTracker = [false, false, false];
    const TrackingMenuItem = React.forwardRef(({ itemIndex, ...other }, ref) => {
      return (
        <MenuItem
          onFocus={() => {
            focusTracker[itemIndex] = true;
          }}
          ref={instance => {
            setRef(ref, instance);
            if (instance && !instance.stubbed) {
              if (instance.tabIndex === 0) {
                tabIndexTracker[itemIndex] = true;
              } else if (instance.tabIndex > 0) {
                tabIndexTracker[itemIndex] = instance.tabIndex;
              }
              const offsetTop = instance.offsetTop;
              stub(instance, 'offsetTop').get(() => {
                contentAnchorTracker[itemIndex] = true;
                return offsetTop;
              });
              instance.stubbed = true;
            }
          }}
          {...other}
        />
      );
    });
    TrackingMenuItem.propTypes = {
      /**
       * @ignore
       */
      itemIndex: PropTypes.number,
    };
    // Array.fill not supported by Chrome 41
    const fill = (array, value) => {
      for (let i = 0; i < array.length; i += 1) {
        array[i] = value;
      }
    };
    const mountTrackingMenu = (
      variant,
      {
        selectedIndex,
        selectedTabIndex,
        invalidIndex,
        autoFocusIndex,
        disabledIndex,
        autoFocus,
        themeDirection,
      } = {},
    ) => {
      const theme =
        themeDirection !== undefined
          ? createMuiTheme({
              direction: themeDirection,
            })
          : undefined;

      fill(contentAnchorTracker, false);
      fill(focusTracker, false);
      menuListFocusTracker = false;
      fill(tabIndexTracker, false);
      mount(
        <Menu
          variant={variant}
          autoFocus={autoFocus}
          anchorEl={document.body}
          open
          theme={theme}
          MenuListProps={{
            onFocus: () => {
              menuListFocusTracker = true;
            },
          }}
        >
          {[0, 1, 2].map(itemIndex => {
            if (itemIndex === invalidIndex) {
              return null;
            }
            return (
              <TrackingMenuItem
                key={itemIndex}
                disabled={itemIndex === disabledIndex ? true : undefined}
                itemIndex={itemIndex}
                selected={itemIndex === selectedIndex}
                tabIndex={itemIndex === selectedIndex ? selectedTabIndex : undefined}
                autoFocus={itemIndex === autoFocusIndex ? true : undefined}
              >
                Menu Item {itemIndex}
              </TrackingMenuItem>
            );
          })}
        </Menu>,
      );
    };

    it('[variant=menu] adds coverage for rtl and Tab with no onClose', () => {
      // This isn't adding very meaningful coverage apart from verifying it doesn't error, but
      // it was so close to 100% that this has value in avoiding needing to drill into coverage
      // details to see what isn't being tested.
      mountTrackingMenu('menu', { themeDirection: 'rtl' });
      assert.deepEqual(contentAnchorTracker, [true, false, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);

      // Adds coverage for Tab with no onClose
      TestUtils.Simulate.keyDown(document.activeElement, {
        key: 'Tab',
      });
    });

    it('[variant=menu] nothing selected', () => {
      assert.deepEqual(contentAnchorTracker, [true, false, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);
    });

    it('[variant=menu] nothing selected, autoFocus on third', () => {
      mountTrackingMenu('menu', { autoFocusIndex: 2 });
      assert.deepEqual(contentAnchorTracker, [true, false, false]);
      assert.deepEqual(focusTracker, [false, false, true]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);
    });

    it('[variant=selectedMenu] nothing selected', () => {
      mountTrackingMenu('selectedMenu');
      assert.deepEqual(contentAnchorTracker, [true, false, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);
    });

    it('[variant=selectedMenu] nothing selected, first index invalid', () => {
      mountTrackingMenu('selectedMenu', { invalidIndex: 0 });
      assert.deepEqual(contentAnchorTracker, [false, true, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);
    });

    it('[variant=menu] second item selected', () => {
      mountTrackingMenu('menu', { selectedIndex: 1 });
      assert.deepEqual(contentAnchorTracker, [true, false, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);
    });

    it('[variant=selectedMenu] second item selected, explicit tabIndex', () => {
      mountTrackingMenu('selectedMenu', { selectedIndex: 1, selectedTabIndex: 2 });
      assert.deepEqual(contentAnchorTracker, [false, true, false]);
      assert.deepEqual(focusTracker, [false, true, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, 2, false]);
    });

    it('[variant=selectedMenu] second item selected', () => {
      mountTrackingMenu('selectedMenu', { selectedIndex: 1 });
      assert.deepEqual(contentAnchorTracker, [false, true, false]);
      assert.deepEqual(focusTracker, [false, true, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, true, false]);
    });

    it('[variant=selectedMenu] second item selected and disabled', () => {
      mountTrackingMenu('selectedMenu', { selectedIndex: 1, disabledIndex: 1 });
      assert.deepEqual(contentAnchorTracker, [true, false, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, true);
      assert.deepEqual(tabIndexTracker, [false, false, false]);
    });

    it('[variant=selectedMenu] second item selected, no autoFocus', () => {
      mountTrackingMenu('selectedMenu', { selectedIndex: 1, autoFocus: false });
      assert.deepEqual(contentAnchorTracker, [false, true, false]);
      assert.deepEqual(focusTracker, [false, false, false]);
      assert.strictEqual(menuListFocusTracker, false);
      assert.deepEqual(tabIndexTracker, [false, true, false]);
    });
  });

  describe('closing', () => {
    let wrapper;
    let portalLayer;

    beforeEach(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
      wrapper.find('button').simulate('click');
      portalLayer = document.querySelector('[data-mui-test="Modal"]');
    });

    it('should close the menu with tab', done => {
      wrapper.setProps({
        onExited() {
          assert.strictEqual(document.getElementById('[data-mui-test="Menu"]'), null);
          done();
        },
      });
      assert.strictEqual(wrapper.text(), 'selectedIndex: null, open: true');
      const list = portalLayer.querySelector('ul');
      TestUtils.Simulate.keyDown(list, {
        key: 'Tab',
      });
      assert.strictEqual(wrapper.text(), 'selectedIndex: null, open: false');
    });

    it('should close the menu using the backdrop', done => {
      wrapper.setProps({
        onExited() {
          assert.strictEqual(document.getElementById('[data-mui-test="Menu"]'), null);
          done();
        },
      });
      assert.strictEqual(wrapper.text(), 'selectedIndex: null, open: true');
      const backdrop = portalLayer.querySelector('[data-mui-test="Backdrop"]');
      assert.strictEqual(backdrop != null, true);
      backdrop.click();
      assert.strictEqual(wrapper.text(), 'selectedIndex: null, open: false');
    });
  });
});
