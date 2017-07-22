// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Typography, { styleSheet } from './Typography';

describe('<Typography />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render the text', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should spread props', () => {
    const wrapper = shallow(<Typography data-test="hello">Hello</Typography>);
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });

  it('should render body1 root by default', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should merge user classes', () => {
    const wrapper = shallow(<Typography className="woof">Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass('woof'), true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woof">
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
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
  ].forEach(type => {
    it(`should render ${type} text`, () => {
      const wrapper = shallow(<Typography type={type}>Hello</Typography>);
      assert.ok(classes[type] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[type]), true, `should be ${type} text`);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(<Typography color="inherit">Hello</Typography>);
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
