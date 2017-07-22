// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Hidden from './Hidden';
import HiddenJs from './HiddenJs';

describe('<Hidden />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const wrapper = shallow(
        <Hidden>
          {'Hello'}
        </Hidden>,
      );
      assert.strictEqual(wrapper.find(HiddenJs).length, 1);
    });

    it('should use change the implementation', () => {
      assert.throws(() => {
        shallow(
          <Hidden implementation="css">
            {'Hello'}
          </Hidden>,
        );
      }, 'is not yet implemented');
    });
  });
});
