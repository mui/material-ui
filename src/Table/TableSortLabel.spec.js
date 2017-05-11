// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import TableSortLabel, { styleSheet } from './TableSortLabel';

describe('<TableSortLabel />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render TableSortLabel', () => {
    const wrapper = shallow(<TableSortLabel />);
    assert.strictEqual(wrapper.hasClass(classes.sortLabel), true, 'should have sort label class');
  });

  it('should set the active class when active', () => {
    const activeFlag = true;
    const wrapper = shallow(<TableSortLabel active={activeFlag} />);
    assert.strictEqual(wrapper.hasClass(classes.active), true);
  });

  it('should not set the active class when not active', () => {
    const activeFlag = false;
    const wrapper = shallow(<TableSortLabel active={activeFlag} />);
    assert.strictEqual(wrapper.hasClass(classes.active), false);
  });

  describe('has an icon', () => {
    it('should have one child with the icon class', () => {
      const wrapper = shallow(<TableSortLabel />);
      const iconChildren = wrapper.find(`.${classes.icon}`);
      assert.strictEqual(iconChildren.length, 1);
    });

    it('by default should have desc direction class', () => {
      const wrapper = shallow(<TableSortLabel />);
      const icon = wrapper.find(`.${classes.icon}`).first();
      assert.strictEqual(icon.hasClass(classes.asc), false);
      assert.strictEqual(icon.hasClass(classes.desc), true);
    });

    it('when given direction desc should have desc direction class', () => {
      const wrapper = shallow(<TableSortLabel direction={'desc'} />);
      const icon = wrapper.find(`.${classes.icon}`).first();
      assert.strictEqual(icon.hasClass(classes.asc), false);
      assert.strictEqual(icon.hasClass(classes.desc), true);
    });

    it('when given direction asc should have asc direction class', () => {
      const wrapper = shallow(<TableSortLabel direction={'asc'} />);
      const icon = wrapper.find(`.${classes.icon}`).first();
      assert.strictEqual(icon.hasClass(classes.asc), true);
      assert.strictEqual(icon.hasClass(classes.desc), false);
    });
  });
});
