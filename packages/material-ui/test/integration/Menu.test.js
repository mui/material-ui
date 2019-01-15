import React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import TestUtils from 'react-dom/test-utils';
import { createMount } from 'packages/material-ui/src/test-utils';
import Popover from 'packages/material-ui/src/Popover';
import Portal from 'packages/material-ui/src/Portal';
import SimpleMenu from './fixtures/menus/SimpleMenu';

describe('<Menu> integration', () => {
  let mount;

  before(() => {
    mount = createMount();
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

    it('should focus the first item as nothing has been selected', () => {
      wrapper.setState({ open: true });
      portalLayer = wrapper
        .find(Portal)
        .instance()
        .getMountNode();
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[0]);
    });

    it('should change focus to the 2nd item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), { which: keycode('down') });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[1]);
    });

    it('should change focus to the 3rd item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), { which: keycode('down') });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should switch focus from the 3rd item to the 1st item when down arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), { which: keycode('down') });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[0]);
    });

    it('should switch focus from the 1st item to the 3rd item when up arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), { which: keycode('up') });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should keep focus on the last item when a key with no associated action is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), { which: keycode('right') });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should change focus to the 2nd item when up arrow is pressed', () => {
      TestUtils.Simulate.keyDown(portalLayer.querySelector('ul'), { which: keycode('up') });
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[1]);
    });

    it('should select the 2nd item and close the menu', () => {
      portalLayer.querySelectorAll('li')[1].click();
      assert.strictEqual(wrapper.state().selectedIndex, 1);
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('opening with a selected item', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
      wrapper.setState({ selectedIndex: 2 });
    });

    it('should not be open', () => {
      const popover = wrapper.find(Popover);
      assert.strictEqual(popover.props().open, false);
      const menuEl = document.getElementById('simple-menu');
      assert.strictEqual(menuEl, null);
    });

    it('should focus the 3rd selected item', () => {
      wrapper.setState({ open: true });
      const portalLayer = wrapper
        .find(Portal)
        .instance()
        .getMountNode();
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[2]);
    });

    it('should select the 2nd item and close the menu', () => {
      const portalLayer = wrapper
        .find(Portal)
        .instance()
        .getMountNode();
      const item = portalLayer.querySelector('ul').children[1];
      item.click();
      assert.strictEqual(wrapper.state().selectedIndex, 1);
      assert.strictEqual(wrapper.state().open, false);
    });

    it('should focus the 2nd selected item', () => {
      wrapper.setState({ open: true });
      const portalLayer = wrapper
        .find(Portal)
        .instance()
        .getMountNode();
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[1]);
    });
  });

  describe('closing', () => {
    let wrapper;
    let portalLayer;

    beforeEach(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
      wrapper.setState({ open: true });
      portalLayer = wrapper
        .find(Portal)
        .instance()
        .getMountNode();
    });

    it('should close the menu with tab', done => {
      wrapper.setProps({
        onExited() {
          assert.strictEqual(document.getElementById('[data-mui-test="Menu"]'), null);
          done();
        },
      });
      assert.strictEqual(wrapper.state().open, true);
      const list = portalLayer.querySelector('ul');
      TestUtils.Simulate.keyDown(list, {
        which: keycode('tab'),
      });
      assert.strictEqual(wrapper.state().open, false);
    });

    it('should close the menu using the backdrop', done => {
      wrapper.setProps({
        onExited() {
          assert.strictEqual(document.getElementById('[data-mui-test="Menu"]'), null);
          done();
        },
      });
      assert.strictEqual(wrapper.state().open, true);
      const backdrop = portalLayer.querySelector('[data-mui-test="Backdrop"]');
      assert.strictEqual(typeof backdrop !== 'undefined', true);
      backdrop.click();
      assert.strictEqual(wrapper.state().open, false);
    });
  });
});
