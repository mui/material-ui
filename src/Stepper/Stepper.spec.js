/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Stepper from './Stepper';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Stepper />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node, context = {}) => {
    return shallow(node, {
      context: {
        muiTheme,
        ...context,
      },
    });
  };

  it('merges user styles into the root node', () => {
    const wrapper = shallowWithContext(
      <Stepper
        style={{backgroundColor: 'purple'}}
      />
    );

    assert.strictEqual(wrapper.props().style.backgroundColor, 'purple');
  });

  describe('rendering children', () => {
    const wrapper = shallowWithContext(
      <Stepper>
        <div />
        <div />
        <div />
      </Stepper>
    );

    const children = wrapper.children();

    it('renders 3 children with connectors as separators', () => {
      assert.strictEqual(children.length, 5);
      assert.ok(wrapper.childAt(1).is('pure(StepConnector)'));
      assert.ok(wrapper.childAt(3).is('pure(StepConnector)'));
    });

    assert.ok(true);
  });

  describe('controlling child props', () => {
    it('controls children linearly based on the activeStep prop', () => {
      const wrapper = shallowWithContext(
        <Stepper activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>
      );
      assert.ok(wrapper.find('.child-0').prop('active'));
      assert.notOk(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      assert.ok(wrapper.find('.child-1').prop('disabled'));
      assert.ok(wrapper.find('.child-2').prop('disabled'));
      wrapper.setProps({activeStep: 1});
      assert.ok(wrapper.find('.child-0').prop('completed'));
      assert.notOk(wrapper.find('.child-0').prop('active'));
      assert.ok(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      assert.ok(wrapper.find('.child-2').prop('disabled'));
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const wrapper = shallowWithContext(
        <Stepper linear={false} activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>
      );
      assert.ok(wrapper.find('.child-0').prop('active'));
      assert.notOk(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      wrapper.setProps({activeStep: 1});
      assert.notOk(wrapper.find('.child-0').prop('active'));
      assert.ok(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      wrapper.setProps({activeStep: 2});
      assert.notOk(wrapper.find('.child-0').prop('active'));
      assert.notOk(wrapper.find('.child-1').prop('active'));
      assert.ok(wrapper.find('.child-2').prop('active'));
    });
  });
});
