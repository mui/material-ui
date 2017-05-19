// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import Typography, { styleSheet } from './Typography';

describe('<Typography />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render the text', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should spread props', () => {
    const wrapper = shallow(
      <Typography data-test="hello">Hello</Typography>,
    );
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');
  });

  it('should render body1 text by default', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true, 'should be body1 text');
    assert.strictEqual(wrapper.hasClass(classes.text), true, 'should be text');
  });

  it('should merge user classes', () => {
    const wrapper = shallow(<Typography className="woof">Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true, 'should be body1 text');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the woof class');
  });

  it('should center text', () => {
    const wrapper = shallow(<Typography align="center" className="woof">Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes['align-center']), true, 'should be center text');
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
    'button',
  ].forEach((type) => {
    it(`should render ${type} text`, () => {
      const wrapper = shallow(<Typography type={type}>Hello</Typography>);
      assert.ok(classes[type] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[type]), true, `should be ${type} text`);
    });
  });

  describe('prop: colorInherit', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(<Typography colorInherit>Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(<Typography type="button">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(<Typography paragraph>Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'p');
    });

    it('should render the mapped headline', () => {
      const wrapper = shallow(<Typography type="title">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h2');
    });

    it('should render a h1', () => {
      const wrapper = shallow(<Typography component="h1">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h1');
    });
  });
});
