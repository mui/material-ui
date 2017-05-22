// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import CircularProgress, { styleSheet } from './CircularProgress';

describe('<CircularProgress />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(<CircularProgress />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<CircularProgress className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const wrapper = shallow(<CircularProgress />);
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.is('svg'), true, 'should be a svg');
    assert.strictEqual(svg.hasClass(classes.svg), true, 'should have the svg class');
    assert.strictEqual(svg.childAt(0).is('circle'), true, 'should be a circle');
    assert.strictEqual(svg.childAt(0).hasClass(classes.circle), true,
      'should have the circle class');
  });
});
