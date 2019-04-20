import React from 'react';
import { assert } from 'chai';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import StepConnector from './StepConnector';

describe('<StepConnector />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<StepConnector />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<StepConnector />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  describe('rendering', () => {
    it('renders a div containing a span', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.find('span').length, 1);
    });

    it('has the class when horizontal', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      assert.include(wrapper.find('span').props().className, classes.lineHorizontal);
    });

    it('has the class when vertical', () => {
      const wrapper = shallow(<StepConnector orientation="vertical" />);
      assert.include(wrapper.find('span').props().className, classes.lineVertical);
    });

    it('has the class when active', () => {
      const wrapper = shallow(<StepConnector active />);
      assert.include(wrapper.props().className, classes.active);
    });

    it('has the class when completed', () => {
      const wrapper = shallow(<StepConnector completed />);
      assert.include(wrapper.props().className, classes.completed);
    });

    it('has the class when disabled', () => {
      const wrapper = shallow(<StepConnector disabled />);
      assert.include(wrapper.props().className, classes.disabled);
    });
  });
});
