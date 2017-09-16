// @flow weak

import React from 'react';
import { assert } from 'chai';
import { ReactWrapper } from 'enzyme';
import { createMount } from 'src/test-utils';
import SelectAndDialog from './fixtures/select/SelectAndDialog';

describe('<Select> integration', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('with Dialog', () => {
    let wrapper;
    let portalDialogWrapper;

    before(() => {
      wrapper = mount(<SelectAndDialog open />);
      const portalDialog = wrapper.find('Modal').node.mountNode.firstChild;
      portalDialogWrapper = new ReactWrapper(portalDialog, portalDialog);
    });

    it('should focus the selected item', done => {
      const selectDisplay = portalDialogWrapper.find('[data-mui-test="SelectDisplay"]');

      wrapper.setProps({
        MenuProps: {
          onExited: () => {
            assert.strictEqual(
              document.activeElement,
              selectDisplay.getDOMNode(),
              'should focus back the select input',
            );
            done();
          },
        },
      });

      // Let's open the select component
      selectDisplay.getDOMNode().focus();
      selectDisplay.simulate('click');

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[1],
        'should focus the selected menu item',
      );

      const portalSelect = portalDialogWrapper.find('Modal').node.mountNode.firstChild;
      const portalSelectWrapper = new ReactWrapper(portalSelect, portalSelect);

      // Now, let's close the select component
      const backdrop = portalSelectWrapper.find('Backdrop');
      backdrop.simulate('click');
    });
  });
});
