// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
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
    assert.strictEqual(wrapper.props().role, 'progressbar');
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const wrapper = shallow(<CircularProgress />);
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.is('svg'), true, 'should be a svg');
    assert.strictEqual(svg.hasClass(classes.svg), true, 'should have the svg class');
    assert.strictEqual(svg.childAt(0).is('circle'), true, 'should be a circle');
    assert.strictEqual(
      svg.childAt(0).hasClass(classes.circle),
      true,
      'should have the circle class',
    );
  });

  it('should render intermediate mode by default', () => {
    const wrapper = shallow(<CircularProgress />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.is('svg'), true, 'should be a svg');
    assert.strictEqual(svg.hasClass(classes.svg), true, 'should have the svg class');
    assert.strictEqual(
      svg.hasClass(classes.indeterminateSvg),
      true,
      'should have the indeterminateSvg class',
    );
    assert.strictEqual(svg.childAt(0).is('circle'), true, 'should be a circle');
    assert.strictEqual(
      svg.childAt(0).hasClass(classes.indeterminateCircle),
      true,
      'should have the indeterminateCircle class',
    );
  });

  it('should render with a different size', () => {
    const wrapper = shallow(<CircularProgress size={60} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.props().style.width, 60, 'should have width correctly set');
    assert.strictEqual(wrapper.props().style.height, 60, 'should have width correctly set');
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.is('svg'), true, 'should be a svg');
    assert.strictEqual(svg.childAt(0).is('circle'), true, 'should be a circle');
    assert.strictEqual(svg.childAt(0).props().cx, 30, 'should have cx correctly set');
    assert.strictEqual(svg.childAt(0).props().cy, 30, 'should have cx correctly set');
  });

  it('should render with determinate classes', () => {
    const wrapper = shallow(<CircularProgress mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.is('svg'), true, 'should be a svg');
    assert.strictEqual(svg.hasClass(classes.svg), true, 'should have the svg class');
    assert.strictEqual(
      svg.hasClass(classes.indeterminateSvg),
      false,
      'should not have the indeterminateSvg class',
    );
    assert.strictEqual(svg.childAt(0).is('circle'), true, 'should be a circle');
    assert.strictEqual(
      svg.childAt(0).hasClass(classes.determinateCircle),
      true,
      'should have the determinateCircle class',
    );
  });

  it('should set strokeDasharray of circle on determinate mode', () => {
    const wrapper = shallow(<CircularProgress mode="determinate" value={70} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    const svg = wrapper.childAt(0);
    assert.strictEqual(
      svg.childAt(0).props().style.strokeDasharray,
      'calc(((100% - 3.6px) * 3.1416) * 0.7),calc((100% - 3.6px) * 3.1416)',
      'should have strokeDasharray set',
    );
    assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    assert.strictEqual(wrapper.props()['aria-valuemin'], 0);
    assert.strictEqual(wrapper.props()['aria-valuemax'], 100);
  });

  it('should set strokeDasharray of circle on determinate mode based on min max', () => {
    const wrapper = shallow(<CircularProgress mode="determinate" value={5} min={0} max={10} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    const svg = wrapper.childAt(0);
    assert.strictEqual(
      svg.childAt(0).props().style.strokeDasharray,
      'calc(((100% - 3.6px) * 3.1416) * 0.5),calc((100% - 3.6px) * 3.1416)',
      'should have strokeDasharray set',
    );
    assert.strictEqual(wrapper.props()['aria-valuenow'], 5);
  });
});
