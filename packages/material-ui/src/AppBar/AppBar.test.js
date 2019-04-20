import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import AppBar from './AppBar';
import Paper from '../Paper';

describe('<AppBar />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<AppBar>Hello World</AppBar>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<AppBar>Conformance?</AppBar>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLElement,
    skip: ['componentProp'],
  }));

  it('should render with the root class and primary', () => {
    const wrapper = shallow(<AppBar>Hello World</AppBar>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
  });

  it('should render a primary app bar', () => {
    const wrapper = shallow(<AppBar color="primary">Hello World</AppBar>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
  });

  it('should render an secondary app bar', () => {
    const wrapper = shallow(<AppBar color="secondary">Hello World</AppBar>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), false);
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
  });

  describe('Dialog', () => {
    it('should add a .mui-fixed class', () => {
      const wrapper = shallow(<AppBar position="fixed">Hello World</AppBar>);
      assert.strictEqual(wrapper.hasClass('mui-fixed'), true);
    });
  });
});
