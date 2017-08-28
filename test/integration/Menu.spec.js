// @flow weak

import React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { ReactWrapper } from 'enzyme';
import { createMount } from 'src/test-utils';
import Popover from 'src/Popover';
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
    let list;

    before(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
    });

    it('should not be open', () => {
      const popover = wrapper.find(Popover);
      assert.strictEqual(popover.prop('open'), false, 'should have passed open=false to Popover');
      const menuEl = document.getElementById('simple-menu');
      assert.strictEqual(menuEl, null, 'should not render the menu to the DOM');
    });

    it('should open', done => {
      wrapper.setProps({
        onEntered() {
          assert.ok(true, 'should have fired the onEntered callback');
          const portal = wrapper.find('Modal').node.mountNode.firstChild;
          const portalWrapper = new ReactWrapper(portal, portal);
          list = portalWrapper.find('List');
          done();
        },
      });
      wrapper.setState({ open: true });
    });

    it('should focus the first item as nothing has been selected', () => {
      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.firstChild,
        'should be the first menu item',
      );
    });

    it('should change focus to the 2nd item when down arrow is pressed', () => {
      list.simulate('keyDown', {
        which: keycode('down'),
      });

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[1],
        'should be the 2nd menu item',
      );
    });

    it('should change focus to the 3rd item when down arrow is pressed', () => {
      list.simulate('keyDown', {
        which: keycode('down'),
      });

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[2],
        'should be the 3rd menu item',
      );
    });

    it('should keep focus on the 3rd item (last item) when down arrow is pressed', () => {
      list.simulate('keyDown', {
        which: keycode('down'),
      });

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[2],
        'should be the 3rd menu item',
      );
    });

    it('should keep focus on the last item when a key with no associated action is pressed', () => {
      list.simulate('keyDown', {
        which: keycode('right'),
      });

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[2],
        'should be the 3rd menu item',
      );
    });

    it('should change focus to the 2nd item when up arrow is pressed', () => {
      list.simulate('keyDown', {
        which: keycode('up'),
      });

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[1],
        'should be the 2nd menu item',
      );
    });

    it('should select the 2nd item and close the menu', () => {
      const item = list.childAt(1);
      item.simulate('click');
      assert.strictEqual(wrapper.state().selectedIndex, 1, 'should be index 1');
      assert.strictEqual(wrapper.state().open, false, 'should have closed');
    });
  });

  describe('opening with a selected item', () => {
    let wrapper;
    let list;

    before(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
      wrapper.setState({ selectedIndex: 2 });
    });

    it('should not be open', () => {
      const popover = wrapper.find(Popover);
      assert.strictEqual(popover.prop('open'), false, 'should have passed open=false to Popover');
      const menuEl = document.getElementById('simple-menu');
      assert.strictEqual(menuEl, null, 'should not render the menu to the DOM');
    });

    it('should open', done => {
      wrapper.setProps({
        onEntering() {
          assert.ok(true, 'should have fired the onEntering callback');
          const portal = wrapper.find('Modal').node.mountNode.firstChild;
          const portalWrapper = new ReactWrapper(portal, portal);
          list = portalWrapper.find('List');
          done();
        },
      });
      wrapper.setState({ open: true });
    });

    it('should focus the selected item', () => {
      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[2],
        'should be the 3rd menu item',
      );
    });

    it('should select the 2nd item and close the menu', () => {
      const item = list.childAt(1);
      item.simulate('click');
      assert.strictEqual(wrapper.state().selectedIndex, 1, 'should be index 1');
      assert.strictEqual(wrapper.state().open, false, 'should have closed');
    });

    it('should open', done => {
      wrapper.setProps({
        onEntering() {
          assert.ok(true, 'should have fired the onEntering callback');
          const portal = wrapper.find('Modal').node.mountNode.firstChild;
          const portalWrapper = new ReactWrapper(portal, portal);
          list = portalWrapper.find('List');
          done();
        },
      });
      wrapper.setState({ open: true });
    });

    it('should focus the selected item', () => {
      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[1],
        'should be the 2nd menu item',
      );
    });
  });

  describe('closing', () => {
    let wrapper;
    let list;
    let backdrop;

    beforeEach(() => {
      wrapper = mount(<SimpleMenu transitionDuration={0} />);
      wrapper.setState({ open: true });
      const portal = wrapper.find('Modal').node.mountNode.firstChild;
      const portalWrapper = new ReactWrapper(portal, portal);
      list = portalWrapper.find('List');
      backdrop = portalWrapper.find('Backdrop');
    });

    it('should close the menu with tab', done => {
      wrapper.setProps({
        onExited() {
          assert.strictEqual(document.getElementById('[data-mui-test="Menu"]'), null);
          done();
        },
      });
      assert.strictEqual(wrapper.state().open, true, 'should start open');
      list.simulate('keyDown', {
        which: keycode('tab'),
      });
      assert.strictEqual(wrapper.state().open, false, 'should be closed');
    });

    it('should close the menu using the backdrop', done => {
      wrapper.setProps({
        onExited() {
          assert.strictEqual(document.getElementById('[data-mui-test="Menu"]'), null);
          done();
        },
      });
      assert.strictEqual(wrapper.state().open, true, 'should start open');
      backdrop.simulate('click');
      assert.strictEqual(wrapper.state().open, false, 'should be closed');
    });
  });
});
