// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Text, { styleSheet } from './Text';

describe('<Text />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a span with the text', () => {
    const wrapper = shallow(<Text>Hello</Text>);
    assert.strictEqual(wrapper.is('span'), true, 'should be a span');
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should render a h1', () => {
    const wrapper = shallow(<Text component="h1">Hello</Text>);
    assert.strictEqual(wrapper.is('h1'), true, 'should be a h1');
  });

  it('should spread props', () => {
    const wrapper = shallow(
      <Text data-test="hello">Hello</Text>,
    );
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');
  });

  it('should render body1 text by default', () => {
    const wrapper = shallow(<Text>Hello</Text>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true, 'should be body1 text');
    assert.strictEqual(wrapper.hasClass(classes.text), true, 'should be text');
  });

  it('should merge user classes', () => {
    const wrapper = shallow(<Text className="woof">Hello</Text>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true, 'should be body1 text');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the woof class');
  });

  it('should center text', () => {
    const wrapper = shallow(<Text align="center" className="woof">Hello</Text>);
    assert.strictEqual(wrapper.hasClass(classes.center), true, 'should be center text');
  });

  [
    'display4',
    'display3',
    'display2',
    'display1',
    'headline',
    'title',
    'subheading',
    'body2',
    'body1',
    'caption',
  ].forEach((type) => {
    it(`should render ${type} text`, () => {
      const wrapper = shallow(<Text type={type}>Hello</Text>);
      assert.ok(classes[type] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[type]), true, `should be ${type} text`);
    });
  });
});
