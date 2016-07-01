/* eslint-env mocha */
import React from 'react';
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
        assert.strictEqual(wrapper.find({'data-test-content': 0}).length, 1, 'step 1 content should be visible');
        assert.strictEqual(wrapper.find({'data-test-content': 1}).length, 0, 'step 2 content should not be visible');
        assert.strictEqual(wrapper.find({'data-test-content': 2}).length, 0, 'step 3 content should not be visible');
      });
    });
  });

  describe('navigating steps', () => {
    it('should navigate to the second step', (done) => {
      wrapper.setState({stepIndex: 1});

      setTimeout(() => {
        assert.strictEqual(wrapper.find({'data-test-content': 0}).length, 0, 'step 1 content should not be visible');
        assert.strictEqual(wrapper.find({'data-test-content': 1}).length, 1, 'step 2 content should be visible');
        assert.strictEqual(wrapper.find({'data-test-content': 2}).length, 0, 'step 3 content should not be visible');
        done();
      }, 30);
    });

    it('should navigate to the third step', (done) => {
      wrapper.setState({stepIndex: 2});

      setTimeout(() => {
        assert.strictEqual(wrapper.find({'data-test-content': 0}).length, 0, 'step 1 content should not be visible');
        assert.strictEqual(wrapper.find({'data-test-content': 1}).length, 0, 'step 2 content should not be visible');
        assert.strictEqual(wrapper.find({'data-test-content': 2}).length, 1, 'step 3 content should be visible');
        done();
      }, 30);
    });
  });
});
