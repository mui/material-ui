// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import FormLabel, { styleSheet } from './FormLabel';

describe('<FormLabel />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <label />', () => {
    const wrapper = shallow(<FormLabel className="woof" />);
    assert.strictEqual(wrapper.is('label'), true, 'should be a <label>');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
  });

  describe('prop: required', () => {
    it('should show an asterisk if required is set', () => {
      const wrapper = shallow(<FormLabel required />);
      const text = wrapper.text();
      assert.strictEqual(text.slice(-1), '*', 'should show an asterisk at the end');
      assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
    });

    it('should not show an asterisk by default', () => {
      const wrapper = shallow(<FormLabel />);
      assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 0);
      assert.strictEqual(wrapper.text().includes('*'), false, 'should not show an asterisk');
    });
  });

  describe('prop: error', () => {
    it('should show an error class', () => {
      const wrapper = shallow(<FormLabel required error />);
      const asteriskWrapper = wrapper.find('[data-mui-test="FormLabelAsterisk"]');
      assert.strictEqual(asteriskWrapper.length, 1);
      assert.strictEqual(
        asteriskWrapper.hasClass(classes.error),
        true,
        'asterisk should have the error class',
      );
      assert.strictEqual(
        wrapper.hasClass(classes.error),
        true,
        'should have the error class',
      );
    });
  });
});
