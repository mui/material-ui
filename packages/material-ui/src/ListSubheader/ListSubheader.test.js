import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ListSubheader from './ListSubheader';

describe('<ListSubheader />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<ListSubheader />);
  });

  describeConformance(<ListSubheader />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
  }));

  it('should display primary color', () => {
    const wrapper = shallow(<ListSubheader color="primary" />);
    expect(wrapper.hasClass(classes.colorPrimary)).to.equal(true);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
  });

  it('should display inset class', () => {
    const wrapper = shallow(<ListSubheader inset />);
    expect(wrapper.hasClass(classes.inset)).to.equal(true);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
  });

  describe('prop: disableSticky', () => {
    it('should display sticky class', () => {
      const wrapper = shallow(<ListSubheader />);
      expect(wrapper.hasClass(classes.sticky)).to.equal(true);
    });

    it('should not display sticky class', () => {
      const wrapper = shallow(<ListSubheader disableSticky />);
      expect(wrapper.hasClass(classes.sticky)).to.equal(false);
    });
  });

  describe('prop: disableGutters', () => {
    it('should not display gutters class', () => {
      const wrapper = shallow(<ListSubheader disableGutters />);
      expect(wrapper.hasClass(classes.gutters)).to.equal(false);
    });

    it('should display gutters class', () => {
      const wrapper = shallow(<ListSubheader />);
      expect(wrapper.hasClass(classes.gutters)).to.equal(true);
    });
  });
});
