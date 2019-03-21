import React from 'react';
import { assert } from 'chai';
import { createMount } from 'packages/material-ui/src/test-utils';
import Portal from 'packages/material-ui/src/Portal';
import NestedMenu from './fixtures/menus/NestedMenu';

describe('<NestedMenu> integration', () => {
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
      wrapper = mount(<NestedMenu />);
    });

    it('should not be open', () => {
      const firstMenu = document.getElementById('first-menu');
      const secondMenu = document.getElementById('second-menu');
      assert.strictEqual(firstMenu, null);
      assert.strictEqual(secondMenu, null);
    });

    it('should focus the first item as nothing has been selected', () => {
      wrapper.setProps({ firstMenuOpen: true });

      portalLayer = wrapper
        .find(Portal)
        .instance()
        .getMountNode();
      assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('li')[0]);
    });

    it('should focus the first item of second menu', () => {
      wrapper.setProps({ firstMenuOpen: false, secondMenuOpen: true });
      const secondMenu = document.getElementById('second-menu');
      assert.strictEqual(document.activeElement, secondMenu.querySelectorAll('li')[0]);
    });

    it('should open the first menu again', () => {
      wrapper.setProps({ firstMenuOpen: true, secondMenuOpen: false });
      const firstMenu = document.getElementById('first-menu');
      assert.strictEqual(document.activeElement, firstMenu.querySelectorAll('li')[0]);
    });

    it('should be able to open second menu again', () => {
      wrapper.setProps({ firstMenuOpen: false, secondMenuOpen: true });
      const secondMenu = document.getElementById('second-menu');
      assert.strictEqual(document.activeElement, secondMenu.querySelectorAll('li')[0]);
    });
  });
});
