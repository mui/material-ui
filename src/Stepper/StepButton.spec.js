/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import sinon from 'sinon';
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
    assert.ok(wrapper.is('EnhancedButton'));
    const stepLabel = wrapper.find('StepLabel');
    assert.strictEqual(stepLabel.length, 1);
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
    assert.strictEqual(stepLabel.prop('active'), true);
    assert.strictEqual(stepLabel.prop('completed'), true);
    assert.strictEqual(stepLabel.prop('disabled'), true);
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
      const handleMouseEnter = sinon.spy();
      const handleMouseLeave = sinon.spy();
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
        assert.ok(handleMouseEnter.calledOnce);
        wrapper.simulate('mouseLeave');
        assert.strictEqual(wrapper.state('hovered'), false, 'should not be hovered');
        assert.ok(handleMouseEnter.calledOnce);
        assert.ok(handleMouseLeave.calledOnce);
      });

      it('should set the EnhancedButton backgroundColor on hover', () => {
        wrapper.setState({hovered: false});
        assert.strictEqual(wrapper.prop('style').backgroundColor, muiTheme.stepper.backgroundColor);
        wrapper.setState({hovered: true});
        assert.strictEqual(wrapper.prop('style').backgroundColor, muiTheme.stepper.hoverBackgroundColor);
      });
    });

    describe('handleTouchStart', () => {
      const handleTouchStart = sinon.spy();
      const handleMouseEnter = sinon.spy();
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
        assert.ok(handleTouchStart.calledOnce);
      });

      it('should not set the hovered state with touch set', () => {
        wrapper.simulate('mouseEnter');
        assert.strictEqual(wrapper.state('hovered'), false, 'should not be hovered');
        assert.ok(handleMouseEnter.calledOnce);
      });
    });

    it('should bubble callbacks used internally', () => {
      const handleMouseEnter = sinon.spy();
      const handleMouseLeave = sinon.spy();
      const handleTouchStart = sinon.spy();
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
      assert.ok(handleMouseEnter.calledOnce);
      wrapper.simulate('mouseLeave');
      assert.ok(handleMouseEnter.calledOnce);
      assert.ok(handleMouseLeave.calledOnce);
      wrapper.simulate('touchStart');
      assert.ok(handleMouseEnter.calledOnce);
      assert.ok(handleMouseLeave.calledOnce);
      assert.ok(handleTouchStart.calledOnce);
      wrapper.simulate('mouseEnter');
      wrapper.simulate('touchStart');
      assert.ok(handleMouseEnter.calledTwice);
      assert.ok(handleMouseLeave.calledOnce);
      assert.ok(handleTouchStart.calledTwice);
    });
  });
});
