import * as React from 'react';
import { expect } from 'chai';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Paper from '../Paper';
import Step from '../Step';
import StepLabel from '../StepLabel';
import StepConnector from '../StepConnector';
import StepContent from '../StepContent';
import Stepper from './Stepper';

describe('<Stepper />', () => {
  let classes;
  let shallow;
  // StrictModeViolation: test uses StepContent
  const mount = createMount({ strict: false });

  before(() => {
    classes = getClasses(<Stepper />);
    shallow = createShallow({ dive: true });
  });

  describeConformance(
    <Stepper>
      <Step />
    </Stepper>,
    () => ({
      classes,
      inheritComponent: Paper,
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );

  it('has no elevation by default', () => {
    const wrapper = mount(
      <Stepper>
        <Step />
      </Stepper>,
    );
    expect(wrapper.find(Paper).props().elevation).to.equal(0);
  });

  describe('rendering children', () => {
    it('renders 3 children with connectors as separators', () => {
      const wrapper = shallow(
        <Stepper>
          <div />
          <div />
          <div />
        </Stepper>,
      );

      const children = wrapper.children();

      expect(children.length).to.equal(5);
      expect(wrapper.childAt(1).find(StepConnector).length).to.equal(1);
      expect(wrapper.childAt(3).find(StepConnector).length).to.equal(1);
    });
  });

  describe('controlling child props', () => {
    it('controls children linearly based on the activeStep prop', () => {
      const wrapper = shallow(
        <Stepper activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>,
      );
      expect(wrapper.find('.child-0').props().active).to.equal(true);
      expect(wrapper.find('.child-1').props().active).to.equal(false);
      expect(wrapper.find('.child-2').props().active).to.equal(false);
      expect(wrapper.find('.child-1').props().disabled).to.equal(true);
      expect(wrapper.find('.child-2').props().disabled).to.equal(true);
      wrapper.setProps({ activeStep: 1 });
      expect(wrapper.find('.child-0').props().completed).to.equal(true);
      expect(wrapper.find('.child-0').props().active).to.equal(false);
      expect(wrapper.find('.child-1').props().active).to.equal(true);
      expect(wrapper.find('.child-2').props().active).to.equal(false);
      expect(wrapper.find('.child-2').props().disabled).to.equal(true);
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const wrapper = shallow(
        <Stepper linear={false} activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>,
      );
      expect(wrapper.find('.child-0').props().active).to.equal(true);
      expect(wrapper.find('.child-1').props().active).to.equal(false);
      expect(wrapper.find('.child-2').props().active).to.equal(false);
      wrapper.setProps({ activeStep: 1 });
      expect(wrapper.find('.child-0').props().active).to.equal(false);
      expect(wrapper.find('.child-1').props().active).to.equal(true);
      expect(wrapper.find('.child-2').props().active).to.equal(false);
      wrapper.setProps({ activeStep: 2 });
      expect(wrapper.find('.child-0').props().active).to.equal(false);
      expect(wrapper.find('.child-1').props().active).to.equal(false);
      expect(wrapper.find('.child-2').props().active).to.equal(true);
    });

    it('passes index down correctly when rendering children containing arrays', () => {
      const wrapper = shallow(
        <Stepper linear={false}>
          <div />
          {[<div key={1} />, <div key={2} />]}
        </Stepper>,
      );

      const steps = wrapper.children().find('div');
      expect(steps.at(0).props().index).to.equal(0);
      expect(steps.at(1).props().index).to.equal(1);
      expect(steps.at(2).props().index).to.equal(2);
    });
  });

  describe('step connector', () => {
    it('should have a default step connector', () => {
      const wrapper = shallow(
        <Stepper>
          <Step />
          <Step />
        </Stepper>,
      );

      expect(wrapper.find(StepConnector).length).to.equal(1);
    });

    it('should allow the developer to specify a custom step connector', () => {
      const wrapper = shallow(
        <Stepper connector={<CheckCircle />}>
          <Step />
          <Step />
        </Stepper>,
      );

      expect(wrapper.find(CheckCircle).length).to.equal(1);
      expect(wrapper.find(StepConnector).length).to.equal(0);
    });

    it('should allow the step connector to be removed', () => {
      const wrapper = shallow(
        <Stepper connector={null}>
          <Step />
          <Step />
        </Stepper>,
      );

      expect(wrapper.find(StepConnector).length).to.equal(0);
    });

    it('should pass active prop to connector when second step is active', () => {
      const wrapper = shallow(
        <Stepper activeStep={1}>
          <Step />
          <Step />
        </Stepper>,
      );
      const connectors = wrapper.find(StepConnector);
      expect(connectors.first().props().active).to.equal(true);
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const wrapper = shallow(
        <Stepper activeStep={2}>
          <Step />
          <Step />
        </Stepper>,
      );
      const connectors = wrapper.find(StepConnector);
      expect(connectors.first().props().completed).to.equal(true);
    });
  });

  it('renders with a null child', () => {
    const wrapper = shallow(
      <Stepper>
        <Step />
        {null}
      </Stepper>,
    );
    expect(wrapper.find(Step).length).to.equal(1);
  });

  it('should be able to force a state', () => {
    const wrapper = shallow(
      <Stepper>
        <Step className="child-0" />
        <Step className="child-1" active />
        <Step className="child-2" />
      </Stepper>,
    );
    expect(wrapper.find('.child-0').props().active).to.equal(true);
    expect(wrapper.find('.child-1').props().active).to.equal(true);
    expect(wrapper.find('.child-2').props().active).to.equal(false);
  });

  it('should hide the last connector', () => {
    const wrapper = mount(
      <Stepper orientation="vertical">
        <Step>
          <StepLabel>one</StepLabel>
          <StepContent />
        </Step>
        <Step>
          <StepLabel>two</StepLabel>
          <StepContent />
        </Step>
      </Stepper>,
    );
    expect(wrapper.find(StepContent).at(0).props().last).to.equal(false);
    expect(wrapper.find(StepContent).at(1).props().last).to.equal(true);
  });
});
