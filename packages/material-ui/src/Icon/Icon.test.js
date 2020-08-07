import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Icon from './Icon';

describe('<Icon />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Icon />);
  });

  describeConformance(<Icon>account_circle</Icon>, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'div',
  }));

  it('renders children by default', () => {
    const wrapper = shallow(<Icon>account_circle</Icon>);
    expect(wrapper.contains('account_circle')).to.equal(true);
  });

  describe('optional classes', () => {
    it('should render with the secondary color', () => {
      const wrapper = shallow(<Icon color="secondary">account_circle</Icon>);
      expect(wrapper.hasClass(classes.colorSecondary)).to.equal(true);
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<Icon color="action">account_circle</Icon>);
      expect(wrapper.hasClass(classes.colorAction)).to.equal(true);
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<Icon color="error">account_circle</Icon>);
      expect(wrapper.hasClass(classes.colorError)).to.equal(true);
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<Icon color="primary">account_circle</Icon>);
      expect(wrapper.hasClass(classes.colorPrimary)).to.equal(true);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const wrapper = shallow(<Icon fontSize="inherit">account_circle</Icon>);
      expect(wrapper.hasClass(classes.fontSizeInherit)).to.equal(true);
    });
  });
});
