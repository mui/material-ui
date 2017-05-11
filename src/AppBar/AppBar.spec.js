// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import AppBar, { styleSheet } from './AppBar';

describe('<AppBar />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a Paper component', () => {
    const wrapper = shallow(
      <AppBar>Hello World</AppBar>,
    );
    assert.strictEqual(wrapper.name(), 'Paper');
    assert.strictEqual(wrapper.props().elevation, 4, 'should render with a 4dp shadow');
  });

  it('should render with the appBar class and primary', () => {
    const wrapper = shallow(
      <AppBar>Hello World</AppBar>,
    );
    assert.strictEqual(wrapper.hasClass(classes.appBar), true,
      'should have the appBar class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false,
      'should not have the accent class');
  });

  it('should render the custom className and the appBar class', () => {
    const wrapper = shallow(
      <AppBar className="test-class-name" />,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.appBar), true, 'should have the appBar class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true,
      'should not have the primary class');
  });

  it('should render a primary app bar', () => {
    const wrapper = shallow(
      <AppBar primary>Hello World</AppBar>,
    );
    assert.strictEqual(wrapper.hasClass(classes.appBar), true, 'should have the appBar class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render an accent app bar', () => {
    const wrapper = shallow(
      <AppBar accent>Hello World</AppBar>,
    );
    assert.strictEqual(wrapper.hasClass(classes.appBar), true, 'should have the appBar class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false,
      'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), true, 'should not have the accent class');
  });
});
