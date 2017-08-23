// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from 'src/test-utils';
import List from 'src/List';

describe('<List> integration', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('prop: rootRef', () => {
    it('should be able to get a ref of the root element', () => {
      const refCallback = spy();
      mount(<List rootRef={refCallback} />);
      assert.strictEqual(refCallback.callCount, 1, 'should call the ref function');
    });
  });
});
