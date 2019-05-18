import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import ListSubheader from './ListSubheader';

describe('<ListSubheader />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<ListSubheader />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ListSubheader />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
  }));

  it('should display primary color', () => {
    const wrapper = shallow(<ListSubheader color="primary" />);
    assert.strictEqual(
      wrapper.hasClass(classes.colorPrimary),
      true,
      'should have the primary class',
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should display inset class', () => {
    const wrapper = shallow(<ListSubheader inset />);
    assert.strictEqual(wrapper.hasClass(classes.inset), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: disableSticky', () => {
    it('should display sticky class', () => {
      const wrapper = shallow(<ListSubheader />);
      assert.strictEqual(wrapper.hasClass(classes.sticky), true);
    });

    it('should not display sticky class', () => {
      const wrapper = shallow(<ListSubheader disableSticky />);
      assert.strictEqual(wrapper.hasClass(classes.sticky), false);
    });
  });

  describe('prop: disableGutters', () => {
    it('should not display gutters class', () => {
      const wrapper = shallow(<ListSubheader disableGutters />);
      assert.strictEqual(wrapper.hasClass(classes.gutters), false);
    });

    it('should display gutters class', () => {
      const wrapper = shallow(<ListSubheader />);
      assert.strictEqual(wrapper.hasClass(classes.gutters), true);
    });
  });
});
