// @flow weak

import React from 'react';
import { assert } from 'chai';
import { ReactWrapper } from 'enzyme';
import { createMount } from 'src/test-utils';
import SelectAndDialog from './fixtures/select/SelectAndDialog';

function getPortalWrapper(wrapper) {
  const portalWrapper = new ReactWrapper(
    wrapper
      .find('Modal')
      .getNode()
      .render().props.children,
  );

  return portalWrapper;
}

describe('<Select> integration', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('with Dialog', () => {
    it('should focus the selected item', done => {
      const wrapper = mount(
        <SelectAndDialog
          open
          MenuProps={{
            onExited: () => {
              assert.strictEqual(
                document.activeElement,
                selectDisplay.getDOMNode(),
                'should focus back the select input',
              );
              done();
            },
          }}
        />,
      );
      const portalDialogWrapper = getPortalWrapper(wrapper);

      const selectDisplay = portalDialogWrapper.find('[data-mui-test="SelectDisplay"]');

      // Let's open the select component
      selectDisplay.getDOMNode().focus();
      selectDisplay.simulate('click');

      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[1],
        'should focus the selected menu item',
      );

      const portalSelectWrapper = getPortalWrapper(portalDialogWrapper);

      // Now, let's close the select component
      const backdrop = portalSelectWrapper.find('Backdrop');
      backdrop.simulate('click');
    });
  });
});
