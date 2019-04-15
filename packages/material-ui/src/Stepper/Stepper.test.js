import React from 'react';
import { assert } from 'chai';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Paper from '../Paper';
import Step from '../Step';
import StepLabel from '../StepLabel';
import StepConnector from '../StepConnector';
import StepContent from '../StepContent';
import Stepper from './Stepper';

describe('<Stepper />', () => {
  let classes;
  let shallow;
  let mount;

  before(() => {
    classes = getClasses(<Stepper />);
    shallow = createShallow({ dive: true });
    // StrictModeViolation: test uses StepContent
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
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
    assert.strictEqual(wrapper.find(Paper).props().elevation, 0, 'should have no elevation');
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

      assert.strictEqual(children.length, 5);
      assert.strictEqual(wrapper.childAt(1).find(StepConnector).length, 1);
      assert.strictEqual(wrapper.childAt(3).find(StepConnector).length, 1);
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
      assert.strictEqual(wrapper.find('.child-0').props().active, true);
      assert.strictEqual(wrapper.find('.child-1').props().active, false);
      assert.strictEqual(wrapper.find('.child-2').props().active, false);
      assert.strictEqual(wrapper.find('.child-1').props().disabled, true);
      assert.strictEqual(wrapper.find('.child-2').props().disabled, true);
      wrapper.setProps({ activeStep: 1 });
      assert.strictEqual(wrapper.find('.child-0').props().completed, true);
      assert.strictEqual(wrapper.find('.child-0').props().active, false);
      assert.strictEqual(wrapper.find('.child-1').props().active, true);
      assert.strictEqual(wrapper.find('.child-2').props().active, false);
      assert.strictEqual(wrapper.find('.child-2').props().disabled, true);
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const wrapper = shallow(
        <Stepper linear={false} activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>,
      );
      assert.strictEqual(wrapper.find('.child-0').props().active, true);
      assert.strictEqual(wrapper.find('.child-1').props().active, false);
      assert.strictEqual(wrapper.find('.child-2').props().active, false);
      wrapper.setProps({ activeStep: 1 });
      assert.strictEqual(wrapper.find('.child-0').props().active, false);
      assert.strictEqual(wrapper.find('.child-1').props().active, true);
      assert.strictEqual(wrapper.find('.child-2').props().active, false);
      wrapper.setProps({ activeStep: 2 });
      assert.strictEqual(wrapper.find('.child-0').props().active, false);
      assert.strictEqual(wrapper.find('.child-1').props().active, false);
      assert.strictEqual(wrapper.find('.child-2').props().active, true);
    });

    it('passes index down correctly when rendering children containing arrays', () => {
      const wrapper = shallow(
        <Stepper linear={false}>
          <div />
          {[<div key={1} />, <div key={2} />]}
        </Stepper>,
      );

      const steps = wrapper.children().find('div');
      assert.strictEqual(steps.at(0).props().index, 0);
      assert.strictEqual(steps.at(1).props().index, 1);
      assert.strictEqual(steps.at(2).props().index, 2);
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

      assert.strictEqual(
        wrapper.find(StepConnector).length,
        1,
        'should contain a <StepConnector /> child',
      );
    });

    it('should allow the developer to specify a custom step connector', () => {
      const wrapper = shallow(
        <Stepper connector={<CheckCircle />}>
          <Step />
          <Step />
        </Stepper>,
      );

      assert.strictEqual(
        wrapper.find(CheckCircle).length,
        1,
        'should contain a <CheckCircle /> child',
      );
      assert.strictEqual(
        wrapper.find(StepConnector).length,
        0,
        'should not contain a <StepConnector /> child',
      );
    });

    it('should allow the step connector to be removed', () => {
      const wrapper = shallow(
        <Stepper connector={null}>
          <Step />
          <Step />
        </Stepper>,
      );

      assert.strictEqual(
        wrapper.find(StepConnector).length,
        0,
        'should not contain a <StepConnector /> child',
      );
    });

    it('should pass active prop to connector when second step is active', () => {
      const wrapper = shallow(
        <Stepper activeStep={1}>
          <Step />
          <Step />
        </Stepper>,
      );
      const connectors = wrapper.find(StepConnector);
      assert.strictEqual(connectors.first().props().active, true);
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const wrapper = shallow(
        <Stepper activeStep={2}>
          <Step />
          <Step />
        </Stepper>,
      );
      const connectors = wrapper.find(StepConnector);
      assert.strictEqual(connectors.first().props().completed, true);
    });
  });

  it('renders with a null child', () => {
    const wrapper = shallow(
      <Stepper>
        <Step />
        {null}
      </Stepper>,
    );
    assert.strictEqual(wrapper.find(Step).length, 1);
  });

  it('should be able to force a state', () => {
    const wrapper = shallow(
      <Stepper>
        <Step className="child-0" />
        <Step className="child-1" active />
        <Step className="child-2" />
      </Stepper>,
    );
    assert.strictEqual(wrapper.find('.child-0').props().active, true);
    assert.strictEqual(wrapper.find('.child-1').props().active, true);
    assert.strictEqual(wrapper.find('.child-2').props().active, false);
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
    assert.strictEqual(
      wrapper
        .find(StepContent)
        .at(0)
        .props().last,
      false,
    );
    assert.strictEqual(
      wrapper
        .find(StepContent)
        .at(1)
        .props().last,
      true,
    );
  });
});
