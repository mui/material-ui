import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListSubheader from './ListSubheader';

describe('<ListSubheader />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<ListSubheader />);
  });

  it('should render a li', () => {
    const wrapper = shallow(<ListSubheader />);
    assert.strictEqual(wrapper.name(), 'li');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ListSubheader className="woofListSubheader" />);
    assert.strictEqual(wrapper.hasClass('woofListSubheader'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

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
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the primary class');
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
});
