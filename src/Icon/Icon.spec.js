// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import Icon, { styleSheet } from './Icon';

describe('<Icon />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('renders children by default', () => {
    const wrapper = shallow(<Icon>account_circle</Icon>);
    assert.strictEqual(wrapper.contains('account_circle'), true, 'should contain the children');
  });

  it('should render an span with root class', () => {
    const wrapper = shallow(<Icon>account_circle</Icon>);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });

  it('should spread props on span', () => {
    const wrapper = shallow(<Icon data-test="hello">account_circle</Icon>);
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the span');
  });

  describe('optional classes', () => {
    it('should render with the user class', () => {
      const wrapper = shallow(<Icon className="meow">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    });

    it('should render with the accent class', () => {
      const wrapper = shallow(<Icon accent>account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.accent), true, 'should have the "accent" class');
    });

    it('should render with the action class', () => {
      const wrapper = shallow(<Icon action>account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.action), true, 'should have the "action" class');
    });

    it('should render with the contrast class', () => {
      const wrapper = shallow(<Icon contrast>account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.contrast), true,
        'should have the "contrast" class');
    });

    it('should render with the error class', () => {
      const wrapper = shallow(<Icon error>account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.error), true, 'should have the "error" class');
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<Icon primary>account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.primary), true,
        'should have the "primary" class');
    });
  });
});
