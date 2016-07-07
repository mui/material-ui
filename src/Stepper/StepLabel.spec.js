/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import StepLabel from './StepLabel';
import getMuiTheme from '../styles/getMuiTheme';

describe('<StepLabel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node, context = {}) => {
    return shallow(node, {
      context: {
        muiTheme,
        stepper: {
          orientation: 'horizontal',
        },
        ...context,
      },
    });
  };

  it('merges styles and other props into the root node', () => {
    const wrapper = shallowWithContext(
      <StepLabel
        style={{paddingRight: 200, color: 'purple', border: '1px solid tomato'}}
        data-myProp="hello"
      />
    );
    const props = wrapper.props();
    assert.strictEqual(props.style.paddingRight, 200);
    assert.strictEqual(props.style.color, 'purple');
    assert.strictEqual(props.style.border, '1px solid tomato');
    assert.strictEqual(props['data-myProp'], 'hello');
  });

  describe('label content', () => {
    it('renders the label from children', () => {
      const childWrapper = shallowWithContext(
        <StepLabel>Step One</StepLabel>
      );
      assert.ok(childWrapper.contains('Step One'));
    });

    it('renders the icon from a number with the disabled color', () => {
      const wrapper = shallowWithContext(
        <StepLabel disabled={true} icon={1}>Step One</StepLabel>
      );
      const icon = wrapper.find('SvgIcon');
      assert.strictEqual(icon.length, 1, 'should have an <SvgIcon />');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.inactiveIconColor,
        'should pass the inactive icon color'
      );
    });

    it('renders the custom icon', () => {
      const wrapper = shallowWithContext(
        <StepLabel icon={<span className="my-icon" />}>Step One</StepLabel>
      );
      assert.strictEqual(wrapper.find('.my-icon').length, 1, 'should have the custom icon');
    });
  });

  describe('prop: active = false', () => {
    it('renders text with no specific font weight', () => {
      const wrapper = shallowWithContext(
        <StepLabel active={false}>Step One</StepLabel>
      );
      assert.strictEqual(typeof wrapper.props().style.fontWeight, 'undefined');
    });
  });

  describe('prop: active = true', () => {
    it('renders the label text bold', () => {
      const wrapper = shallowWithContext(
        <StepLabel active={true}>Step One</StepLabel>
      );
      assert.strictEqual(wrapper.props().style.fontWeight, 500);
    });

    it('renders with the standard coloring', () => {
      const wrapper = shallowWithContext(
        <StepLabel active={true} icon={1}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.textColor,
        'should have the standard text color'
      );
      const icon = wrapper.find('SvgIcon');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.iconColor,
        'should pass the standard icon color'
      );
    });
  });

  describe('prop: completed = true', () => {
    it('renders the label text with no specific font weight', () => {
      const wrapper = shallowWithContext(
        <StepLabel completed={true}>Step One</StepLabel>
      );
      assert.strictEqual(typeof wrapper.props().style.fontWeight, 'undefined');
    });

    it('renders a check circle with the standard coloring', () => {
      const wrapper = shallowWithContext(
        <StepLabel completed={true} icon={1}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.textColor,
        'should have the standard text color'
      );
    });
  });

  describe('prop combinations', () => {
    it('renders with active styling when active', () => {
      const wrapper = shallowWithContext(
        <StepLabel icon={1} active={true}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.textColor,
        'should have the standard text color'
      );
      const icon = wrapper.find('SvgIcon');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.iconColor,
        'should pass the standard icon color'
      );
    });

    it('renders with inactive styling when inactive and not complete', () => {
      const wrapper = shallowWithContext(
        <StepLabel icon={1}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.textColor,
        'should have the standard text color'
      );
      const icon = wrapper.find('SvgIcon');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.inactiveIconColor,
        'should pass the inactive icon color'
      );
    });

    it('renders with disabled styling when disabled', () => {
      const wrapper = shallowWithContext(
        <StepLabel icon={1} disabled={true}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.disabledTextColor,
        'should have the disabled text color'
      );
      const icon = wrapper.find('SvgIcon');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.inactiveIconColor,
        'should pass the inactive icon color'
      );
    });

    it('renders with a check icon and active styling when completed', () => {
      const wrapper = shallowWithContext(
        <StepLabel icon={1} completed={true}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.textColor,
        'should have the standard text color'
      );
      const icon = wrapper.find('ActionCheckCircle');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.iconColor,
        'should pass the standard icon color'
      );
    });

    it('renders with a check icon and disabled when disabled and completed', () => {
      const wrapper = shallowWithContext(
        <StepLabel icon={1} disabled={true} completed={true}>Step One</StepLabel>
      );
      assert.strictEqual(
        wrapper.props().style.color,
        muiTheme.stepper.disabledTextColor,
        'should have the disabled text color'
      );
      const icon = wrapper.find('ActionCheckCircle');
      assert.strictEqual(
        icon.props().color,
        muiTheme.stepper.inactiveIconColor,
        'should pass the inactive icon color'
      );
    });
  });
});
