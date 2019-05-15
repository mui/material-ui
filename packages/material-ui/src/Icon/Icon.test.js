import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Icon from './Icon';

describe('<Icon />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Icon />);
  });

  after(() => {
    mount.cleanUp();
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
    assert.strictEqual(wrapper.contains('account_circle'), true);
  });

  describe('optional classes', () => {
    it('should render with the secondary color', () => {
      const wrapper = shallow(<Icon color="secondary">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<Icon color="action">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorAction), true);
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<Icon color="error">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorError), true);
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<Icon color="primary">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const wrapper = shallow(<Icon fontSize="inherit">account_circle</Icon>);
      assert.strictEqual(wrapper.hasClass(classes.fontSizeInherit), true);
    });
  });
});
