import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import StepConnector from './StepConnector';

describe('<StepConnector />', () => {
  let shallow;
  let classes;
  const mount = createMount();

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<StepConnector />);
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
      expect(wrapper.type()).to.equal('div');
      expect(wrapper.find('span').length).to.equal(1);
    });

    it('has the class when horizontal', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      expect(wrapper.find('span').props().className).to.include(classes.lineHorizontal);
    });

    it('has the class when vertical', () => {
      const wrapper = shallow(<StepConnector orientation="vertical" />);
      expect(wrapper.find('span').props().className).to.include(classes.lineVertical);
    });

    it('has the class when active', () => {
      const wrapper = shallow(<StepConnector active />);
      expect(wrapper.props().className).to.include(classes.active);
    });

    it('has the class when completed', () => {
      const wrapper = shallow(<StepConnector completed />);
      expect(wrapper.props().className).to.include(classes.completed);
    });

    it('has the class when disabled', () => {
      const wrapper = shallow(<StepConnector disabled />);
      expect(wrapper.props().className).to.include(classes.disabled);
    });
  });
});
