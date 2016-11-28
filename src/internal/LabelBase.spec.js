// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import LabelBase, { styleSheet } from './LabelBase';

describe('<LabelBase />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <label />', () => {
    const wrapper = shallow(<LabelBase className="woof" />);
    assert.strictEqual(wrapper.is('label'), true, 'should be a <label>');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
  });

  describe('required', () => {
    it('should show an asterisk if required is set', () => {
      const wrapper = shallow(<LabelBase required />);
      const text = wrapper.text();
      assert.strictEqual(text.indexOf('*'), text.length - 1, 'should show an asterisk at the end');
      assert.strictEqual(wrapper.find('span').hasClass(classes.asterisk), true,
        'should have the asterisk class');
    });

    it('should show an asterisk class if dirty is true', () => {
      const wrapper = shallow(<LabelBase required focused />);
      const text = wrapper.text();
      assert.strictEqual(text.indexOf('*'), text.length - 1, 'should show an asterisk at the end');
      assert.strictEqual(wrapper.find('span').hasClass(classes.asterisk), true,
        'should have the asterisk class');
    });

    it('should not show an asterisk by default', () => {
      const wrapper = shallow(<LabelBase />);
      assert.strictEqual(wrapper.text().includes('*'), false, 'should not show an asterisk');
    });

    it('should show an asterisk with an error class if focused', () => {
      const wrapper = shallow(<LabelBase required focused />);
      assert.strictEqual(wrapper.find('span').hasClass(classes.asterisk), true,
        'should have the asterisk class');
      assert.strictEqual(wrapper.find('span').hasClass(classes.error), true,
        'should have the asterisk class');
    });

    describe('error', () => {
      it('should show an error class', () => {
        const wrapper = shallow(<LabelBase required error />);
        assert.strictEqual(wrapper.find('span').hasClass(classes.asterisk), true,
          'asterisk should have the asterisk class');
        assert.strictEqual(wrapper.find('span').hasClass(classes.error), true,
          'asterisk should have the error class');
        assert.strictEqual(wrapper.hasClass(classes.error), true,
          'should have the error class');
      });
    });
  });
});
