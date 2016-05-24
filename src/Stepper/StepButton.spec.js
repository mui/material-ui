/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import StepButton from './StepButton';
import getMuiTheme from '../styles/getMuiTheme';

describe('<StepButton />', () => {
  const muiTheme = getMuiTheme();
  const themedShallow = (node) => {
    const context = {muiTheme, stepper: {orientation: 'horizontal'}};
    return shallow(node, {context});
  };

  it('should merge user styles in', () => {
    const wrapper = themedShallow(
      <StepButton style={{backgroundColor: 'purple'}}>Step One</StepButton>
    );

    assert.strictEqual(wrapper.props().style.backgroundColor, 'purple');
  });

  it('should render an EnhancedButton with a StepLabel', () => {
    const wrapper = themedShallow(
      <StepButton>Step One</StepButton>
    );
    assert.ok(wrapper.is('EnhancedButton'), 'should be an EnhancedButton');
    const stepLabel = wrapper.find('StepLabel');
    assert.strictEqual(stepLabel.length, 1, 'should have a stepLabel');
    assert.strictEqual(stepLabel.props().children, 'Step One');
  });

  it('should pass props to StepLabel', () => {
    const wrapper = themedShallow(
      <StepButton
        active={true}
        completed={true}
        disabled={true}
        label="Step One"
      >
        Step One
      </StepButton>
    );
    const stepLabel = wrapper.find('StepLabel');
    assert.strictEqual(stepLabel.prop('active'), true, 'should be active');
    assert.strictEqual(stepLabel.prop('completed'), true, 'should be completed');
    assert.strictEqual(stepLabel.prop('disabled'), true, 'should be disabled');
  });

  it('should pass props to EnhancedButton', () => {
    const wrapper = themedShallow(
      <StepButton disabled={true}>Step One</StepButton>
    );
    const stepLabel = wrapper.find('EnhancedButton');
    assert.strictEqual(stepLabel.prop('disabled'), true);
  });

  describe('event handlers', () => {
    describe('handleMouseEnter/Leave', () => {
      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const wrapper = themedShallow(
        <StepButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Step One
        </StepButton>
      );

      it('should set the hovered state', () => {
        wrapper.simulate('mouseEnter');
        assert.strictEqual(wrapper.state('hovered'), true, 'should be hovered');
        assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');
        wrapper.simulate('mouseLeave');
        assert.strictEqual(wrapper.state('hovered'), false, 'should not be hovered');
        assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');
        assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');
      });

      it('should set the EnhancedButton backgroundColor on hover', () => {
        wrapper.setState({hovered: false});
        assert.strictEqual(wrapper.prop('style').backgroundColor, muiTheme.stepper.backgroundColor);
        wrapper.setState({hovered: true});
        assert.strictEqual(wrapper.prop('style').backgroundColor, muiTheme.stepper.hoverBackgroundColor);
      });
    });

    describe('handleTouchStart', () => {
      const handleTouchStart = spy();
      const handleMouseEnter = spy();
      const wrapper = themedShallow(
        <StepButton
          onTouchStart={handleTouchStart}
          onMouseEnter={handleMouseEnter}
        >
          Step One
        </StepButton>
      );

      it('should set the touched state', () => {
        assert.strictEqual(wrapper.state('touched'), false, 'should not be touched');
        wrapper.simulate('touchStart');
        assert.strictEqual(wrapper.state('touched'), true, 'should be touched');
        assert.strictEqual(handleTouchStart.callCount, 1, 'should call handleTouchStart once');
      });

      it('should not set the hovered state with touch set', () => {
        wrapper.simulate('mouseEnter');
        assert.strictEqual(wrapper.state('hovered'), false, 'should not be hovered');
        assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');
      });
    });

    it('should bubble callbacks used internally', () => {
      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const handleTouchStart = spy();
      const wrapper = themedShallow(
        <StepButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          Step One
        </StepButton>
      );
      wrapper.simulate('mouseEnter');
      assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');
      wrapper.simulate('mouseLeave');
      assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');
      assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');
      wrapper.simulate('touchStart');
      assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');
      assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');
      assert.strictEqual(handleTouchStart.callCount, 1, 'should call handleTouchStart once');
      wrapper.simulate('mouseEnter');
      wrapper.simulate('touchStart');
      assert.strictEqual(handleMouseEnter.callCount, 2, 'should call handleMouseEnter twice');
      assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');
      assert.strictEqual(handleTouchStart.callCount, 2, 'should call handleTouchStart twice');
    });
  });
});
