import React from 'react';
import { assert } from 'chai';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import { createShallow, createMount } from '../test-utils';
import Paper from '../Paper';
import Step from './Step';
import StepConnector from './StepConnector';
import Stepper from './Stepper';

describe('<Stepper />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('merges user className into the root node', () => {
    const wrapper = shallow(
      <Stepper className="foo">
        <Step />
      </Stepper>,
    );

    assert.include(wrapper.props().className, 'foo');
  });

  it('should render a Paper component', () => {
    const wrapper = shallow(
      <Stepper>
        <Step />
      </Stepper>,
    );
    assert.strictEqual(wrapper.type(), Paper);
    assert.strictEqual(wrapper.props().elevation, 0, 'should have no elevation');
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

    it('passes last down correctly when rendering children containing arrays', () => {
      const wrapper = shallow(
        <Stepper linear={false}>
          <div />
          {[<div key={1} />, <div key={2} />]}
        </Stepper>,
      );

      const steps = wrapper.children().find('div');
      assert.strictEqual(steps.at(0).props().last, false);
      assert.strictEqual(steps.at(1).props().last, false);
      assert.strictEqual(steps.at(2).props().last, true);
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
  });
});
