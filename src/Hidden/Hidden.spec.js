// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Hidden from './Hidden';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

describe('<Hidden />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const wrapper = shallow(<Hidden>{'Hello'}</Hidden>);
      assert.strictEqual(wrapper.find(HiddenJs).length, 1);
    });

    it('should change the implementation', () => {
      const wrapper = shallow(<Hidden implementation="css">{'Hello'}</Hidden>);
      assert.strictEqual(wrapper.find(HiddenCss).length, 1);
    });
  });
});
