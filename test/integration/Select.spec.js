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

    before(() => {
      wrapper = mount(<SelectAndDialog />);
    });

    it('should focus the first item as nothing has been selected', () => {
      const portal = wrapper.find('Modal').node.mountNode.firstChild;
      const portalWrapper = new ReactWrapper(portal, portal);

      const selectDisplay = portalWrapper.find('[data-mui-test="SelectDisplay"]');
      selectDisplay.simulate('click');
      const menuEl = document.querySelector('[data-mui-test="Menu"]');
      assert.strictEqual(
        document.activeElement,
        menuEl && menuEl.children[1],
        'should be the 2nd menu item',
      );
    });
  });
});
