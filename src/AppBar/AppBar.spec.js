// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import AppBar, { styleSheet } from './AppBar';

describe('<AppBar />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a Paper component', () => {
    const wrapper = shallow(<AppBar>Hello World</AppBar>);
    assert.strictEqual(wrapper.name(), 'withStyles(Paper)');
    assert.strictEqual(wrapper.props().elevation, 4, 'should render with a 4dp shadow');
  });

  it('should render with the root class and primary', () => {
    const wrapper = shallow(<AppBar>Hello World</AppBar>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.colorPrimary),
      true,
      'should not have the primary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.colorAccent),
      false,
      'should not have the accent class',
    );
  });

  it('should render the custom className and the appBar class', () => {
    const wrapper = shallow(<AppBar className="test-class-name" />);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.colorPrimary),
      true,
      'should not have the primary class',
    );
  });

  it('should render a primary app bar', () => {
    const wrapper = shallow(<AppBar color="primary">Hello World</AppBar>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.colorPrimary),
      true,
      'should not have the primary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.colorAccent),
      false,
      'should not have the accent class',
    );
  });

  it('should render an accent app bar', () => {
    const wrapper = shallow(<AppBar color="accent">Hello World</AppBar>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.colorPrimary),
      false,
      'should not have the primary class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.colorAccent),
      true,
      'should not have the accent class',
    );
  });

  describe('Dialog', () => {
    it('should add a .mui-fixed class', () => {
      const wrapper = shallow(<AppBar position="fixed">Hello World</AppBar>);
      assert.strictEqual(wrapper.hasClass('mui-fixed'), true);
    });
  });
});
