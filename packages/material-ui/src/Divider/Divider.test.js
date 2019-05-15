import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Divider from './Divider';

describe('<Divider />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Divider />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Divider />, () => ({
    classes,
    inheritComponent: 'hr',
    mount,
    refInstanceof: window.HTMLHRElement,
    testComponentPropWith: 'div',
  }));

  it('should set the absolute class', () => {
    const wrapper = shallow(<Divider absolute />);
    assert.strictEqual(wrapper.hasClass(classes.absolute), true);
  });

  it('should set the light class', () => {
    const wrapper = shallow(<Divider light />);
    assert.strictEqual(wrapper.hasClass(classes.light), true);
  });

  describe('prop: variant', () => {
    it('should default to variant="fullWidth"', () => {
      const wrapper = shallow(<Divider />);
      assert.strictEqual(wrapper.hasClass(classes.inset), false);
      assert.strictEqual(wrapper.hasClass(classes.middle), false);
    });

    describe('prop: variant="fullWidth" ', () => {
      it('should render with the root and default class', () => {
        const wrapper = shallow(<Divider />);
        assert.strictEqual(wrapper.hasClass(classes.root), true);
      });
    });

    describe('prop: variant="inset" ', () => {
      it('should set the inset class', () => {
        const wrapper = shallow(<Divider variant="inset" />);
        assert.strictEqual(wrapper.hasClass(classes.inset), true);
      });
    });

    describe('prop: variant="middle"', () => {
      it('should set the middle class', () => {
        const wrapper = shallow(<Divider variant="middle" />);
        assert.strictEqual(wrapper.hasClass(classes.middle), true);
      });
    });
  });
});
