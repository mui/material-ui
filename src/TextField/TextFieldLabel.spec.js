// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import TextFieldLabel, { styleSheet } from './TextFieldLabel';

describe('<TextFieldLabel />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <label />', () => {
    const wrapper = shallow(<TextFieldLabel className="woof" />);
    assert.strictEqual(wrapper.is('label'), true, 'should be a <label>');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
  });

  it('should animate by default', () => {
    const wrapper = shallow(<TextFieldLabel />);
    assert.strictEqual(wrapper.hasClass(classes.animated), true, 'should have the animated class');
  });

  it('should not animate', () => {
    const wrapper = shallow(<TextFieldLabel animated={false} />);
    assert.strictEqual(wrapper.hasClass(classes.animated), false, 'should not have the animated class');
  });

  it('should not shrink by default', () => {
    const wrapper = shallow(<TextFieldLabel />);
    assert.strictEqual(wrapper.hasClass(classes.shrink), false, 'should not have the shrink class');
  });

  it('should shrink', () => {
    const wrapper = shallow(<TextFieldLabel shrink />);
    assert.strictEqual(wrapper.hasClass(classes.shrink), true, 'should have the shrink class');
  });

  describe('required', () => {
    it('should show an asterisk if required is set', () => {
      const wrapper = shallow(<TextFieldLabel required />);
      const text = wrapper.text();
      assert.strictEqual(text.indexOf('*'), text.length - 1, 'should show an asterisk at the end');
      assert.strictEqual(wrapper.find('span').hasClass(classes.asterisk), false,
        'should not have the asterisk class');
    });

    it('should not have the asterisk class if dirty is true', () => {
      const wrapper = shallow(<TextFieldLabel required focused />);
      assert.strictEqual(wrapper.find('span').hasClass(classes.asterisk), true,
        'should have the asterisk class');
    });

    it('should not show an asterisk by default', () => {
      const wrapper = shallow(<TextFieldLabel />);
      assert.strictEqual(wrapper.text().includes('*'), false, 'should not show an asterisk');
    });
  });
});
