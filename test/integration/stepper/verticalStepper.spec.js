/* eslint-env mocha */
import React from 'react';
// import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from 'src/styles/getMuiTheme';
import VerticalLinearStepper from '../fixtures/VerticalLinearStepper';

describe('Vertical Stepper', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  const wrapper = mountWithContext(
    <VerticalLinearStepper />
  );
  const steps = wrapper.find('Step');

  describe('initial rendering', () => {
    it('should render a vertical stepper', () => {
      const stepper = wrapper.find('Stepper');
      assert.strictEqual(stepper.length, 1, 'there should be a stepper');
      assert.strictEqual(stepper.prop('orientation'), 'vertical', 'it should be vertical');
    });

    describe('steps', () => {
      it('should render 3 steps', () => {
        assert.strictEqual(steps.length, 3, 'there should be 3 steps');
      });

      it('should have an active 1st step', () => {
        assert.ok(steps.at(0).prop('active'), 'should be active');
        assert.notOk(steps.at(1).prop('active'), 'should not be active');
        assert.notOk(steps.at(2).prop('active'), 'should not be active');
      });
    });
  });

  describe('navigating steps', () => {
    it('should navigate to the second step', () => {
      wrapper.setState({stepIndex: 1});
      assert.notOk(steps.at(0).prop('active'), 'should not be active');
      assert.ok(steps.at(1).prop('active'), 'should be active');
      assert.notOk(steps.at(2).prop('active'), 'should not be active');
    });

    it('should navigate to the third step', () => {
      wrapper.setState({stepIndex: 1});
      assert.notOk(steps.at(0).prop('active'), 'should not be active');
      assert.ok(steps.at(1).prop('active'), 'should be active');
      assert.notOk(steps.at(2).prop('active'), 'should not be active');
    });
  });
});
