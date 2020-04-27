import * as React from 'react';
import { expect } from 'chai';
import { createShallow, createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import TableSortLabel from './TableSortLabel';
import ButtonBase from '../ButtonBase';
import Sort from '@material-ui/icons/Sort';

describe('<TableSortLabel />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount({ strict: true });
    classes = getClasses(<TableSortLabel />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableSortLabel />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should set the active class when active', () => {
    const activeFlag = true;
    const wrapper = shallow(<TableSortLabel active={activeFlag} />);
    expect(wrapper.hasClass(classes.active)).to.equal(true);
  });

  it('should not set the active class when not active', () => {
    const activeFlag = false;
    const wrapper = shallow(<TableSortLabel active={activeFlag} />);
    expect(wrapper.hasClass(classes.active)).to.equal(false);
  });

  describe('has an icon', () => {
    it('should have one child with the icon class', () => {
      const wrapper = shallow(<TableSortLabel />);
      const iconChildren = wrapper.find(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });

    it('when given direction desc should have desc direction class', () => {
      const wrapper = shallow(<TableSortLabel direction="desc" />);
      const icon = wrapper.find(`.${classes.icon}`).first();
      expect(icon.hasClass(classes.iconDirectionAsc)).to.equal(false);
      expect(icon.hasClass(classes.iconDirectionDesc)).to.equal(true);
    });

    it('when given direction asc should have asc direction class', () => {
      const wrapper = shallow(<TableSortLabel direction="asc" />);
      const icon = wrapper.find(`.${classes.icon}`).first();
      expect(icon.hasClass(classes.iconDirectionAsc)).to.equal(true);
      expect(icon.hasClass(classes.iconDirectionDesc)).to.equal(false);
    });

    it('should accept a custom icon for the sort icon', () => {
      const wrapper = mount(<TableSortLabel IconComponent={Sort} />);
      expect(wrapper.find(`svg.${classes.icon}[data-mui-test="SortIcon"]`).exists()).to.equal(true);
    });
  });

  describe('prop: hideSortIcon', () => {
    it('can hide icon when not active', () => {
      const wrapper = shallow(<TableSortLabel active={false} hideSortIcon />);
      const iconChildren = wrapper.find(`.${classes.icon}`).first();
      expect(iconChildren.length).to.equal(0);
    });

    it('does not hide icon by default when not active', () => {
      const wrapper = shallow(<TableSortLabel active={false} />);
      const iconChildren = wrapper.find(`.${classes.icon}`).first();
      expect(iconChildren.length).to.equal(1);
    });

    it('does not hide icon when active', () => {
      const wrapper = shallow(<TableSortLabel active hideSortIcon />);
      const iconChildren = wrapper.find(`.${classes.icon}`).first();
      expect(iconChildren.length).to.equal(1);
    });
  });
});
