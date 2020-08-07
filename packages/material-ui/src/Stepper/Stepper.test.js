import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
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
  const render = createClientRender({ strict: false });

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
    it('renders 3 Step and 2 StepConnector components', () => {
      const wrapper = mount(
        <Stepper>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      expect(wrapper.find(StepConnector).length).to.equal(2);
      expect(wrapper.find(Step).length).to.equal(3);
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
      const wrapper = mount(
        <Stepper>
          <Step />
          <Step />
        </Stepper>,
      );

      expect(wrapper.find(StepConnector).length).to.equal(1);
    });

    it('should allow the developer to specify a custom step connector', () => {
      const CustomConnector = () => null;
      const wrapper = mount(
        <Stepper connector={<CustomConnector />}>
          <Step />
          <Step />
        </Stepper>,
      );

      expect(wrapper.find(CustomConnector).length).to.equal(1);
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
      const wrapper = mount(
        <Stepper activeStep={1}>
          <Step />
          <Step />
        </Stepper>,
      );
      const connectors = wrapper.find(StepConnector);
      expect(connectors.first().props().active).to.equal(true);
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const wrapper = mount(
        <Stepper activeStep={2}>
          <Step />
          <Step />
        </Stepper>,
      );
      const connectors = wrapper.find(StepConnector);
      expect(connectors.first().props().completed).to.equal(true);
    });

    it('should pass correct active and completed props to the StepConnector with nonLinear prop', () => {
      const steps = ['Step1', 'Step2', 'Step3'];

      const { container } = render(
        <Stepper orientation="horizontal" nonLinear connector={<StepConnector />}>
          {steps.map((label, index) => (
            <Step key={label} active completed={index === 2}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>,
      );

      const connectors = container.querySelectorAll('.MuiStepConnector-root');

      expect(connectors).to.have.length(2);
      expect(connectors[0]).to.have.class('MuiStepConnector-active');
      expect(connectors[0]).to.not.have.class('MuiStepConnector-completed');

      expect(connectors[1]).to.have.class('MuiStepConnector-active');
      expect(connectors[1]).to.have.class('MuiStepConnector-completed');
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
