import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
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

  it('should set the flexItem class', () => {
    const wrapper = shallow(<Divider flexItem />);
    assert.strictEqual(wrapper.hasClass(classes.flexItem), true);
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

  describe('role', () => {
    it('avoids adding implicit aria semantics', () => {
      const wrapper = mount(<Divider />);
      assert.strictEqual(wrapper.find('hr').props().role, undefined);
    });

    it('adds a proper role if none is specified', () => {
      const wrapper = mount(<Divider component="div" />);
      assert.strictEqual(wrapper.find('div').props().role, 'separator');
    });

    it('overrides the computed role with the provided one', () => {
      // presentation is the only valid aria role
      const wrapper = mount(<Divider role="presentation" />);
      assert.strictEqual(wrapper.find('hr').props().role, 'presentation');
    });
  });
});
