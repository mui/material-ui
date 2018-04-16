// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Typography from './Typography';

describe('<Typography />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Typography>Hello</Typography>);
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
    const wrapper = shallow(<Typography className="woofTypography">Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woofTypography">
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
  ].forEach(variant => {
    it(`should render ${variant} text`, () => {
      const wrapper = shallow(<Typography variant={variant}>Hello</Typography>);
      assert.ok(classes[variant] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[variant]), true, `should be ${variant} text`);
    });
  });

  [
    ['primary', 'colorPrimary'],
    ['textSecondary', 'colorTextSecondary'],
    ['secondary', 'colorSecondary'],
    ['inherit', 'colorInherit'],
    ['error', 'colorError'],
  ].forEach(([color, className]) => {
    it(`should render ${color} color`, () => {
      const wrapper = shallow(<Typography color={(color: any)}>Hello</Typography>);
      assert.ok(classes[className] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[className]), true, `should be ${color} text`);
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
      const wrapper = shallow(<Typography variant="button">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(<Typography paragraph>Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'p');
    });

    it('should render the mapped headline', () => {
      const wrapper = shallow(<Typography variant="title">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h2');
    });

    it('should render a h1', () => {
      const wrapper = shallow(<Typography component="h1">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h1');
    });
  });
});
