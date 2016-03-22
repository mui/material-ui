/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import EnhancedButton from './EnhancedButton';

describe('<EnhancedButton />', () => {
  const testChildren = <div className="unique">Hello World</div>;

  it('renders a button', () => {
    const wrapper = shallow(
      <EnhancedButton>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('button'), 'should match a button element');
  });

  it('renders a link when href is provided & linkButton is true', () => {
    const wrapper = shallow(
      <EnhancedButton href="http://google.com" linkButton={true}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('a'), 'should match a <a> element');
  });

  it('renders any container element', () => {
    const wrapper = shallow(
      <EnhancedButton containerElement={<div />}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('div'), 'should match a div element');
  });

  it('renders children', () => {
    const wrapper = shallow(
      <EnhancedButton backgroundColor="red">{testChildren}</EnhancedButton>
    );
    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('renders a disabled button when disabled={true} which blocks onTouchTap from firing', () => {
    const wrapper = shallow(
      <EnhancedButton disabled={true}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('button[disabled]'), 'should be a disabled button element');

    let clicked = false;
    let touched = false;
    wrapper.setProps({
      onClick: () => clicked = true,
      onTouchTap: () => touched = true,
    });
    wrapper.simulate('click');
    wrapper.simulate('touchTap');
    assert.strictEqual(clicked, false, 'should not trigger the click');
    assert.strictEqual(touched, false, 'should not trigger the touchTap');
  });

  it('renders a dummy link button when disabled={true} which blocks onTouchTap from firing', () => {
    const wrapper = shallow(
      <EnhancedButton
        disabled={true}
        href="http://google.com"
        linkButton={true}
      >
        Button
      </EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.notOk(wrapper.is('a'), 'should not be an <a> element');
    assert.notOk(wrapper.is('button'), 'should not be an <a> element');

    let clicked = false;
    let touched = false;
    wrapper.setProps({
      onClick: () => clicked = true,
      onTouchTap: () => touched = true,
    });
    wrapper.simulate('click');
    wrapper.simulate('touchTap');
    assert.strictEqual(clicked, false, 'should not trigger the click');
    assert.strictEqual(touched, false, 'should not trigger the touchTap');
  });

  it('can be styled', () => {
    const wrapper = shallow(
      <EnhancedButton style={{color: 'red'}}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.strictEqual(wrapper.node.props.style.color, 'red', 'should be red');
  });

  it('overrides default styles', () => {
    const wrapper = shallow(
      <EnhancedButton>Button</EnhancedButton>
    );

    assert.strictEqual(wrapper.node.props.style.background, 'none', 'should be none');
    wrapper.setProps({
      style: {
        background: 'blue',
      },
    });
    assert.strictEqual(wrapper.node.props.style.background, 'blue', 'should be blue');
  });

  it('can set the button type', () => {
    const wrapper = shallow(
      <EnhancedButton type="submit">Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('button[type="submit"]'), 'should have the type attribute');
    wrapper.setProps({type: 'reset'});
    assert.ok(wrapper.is('button[type="reset"]'), 'should have the type attribute');
  });

  it('passes through other html attributes', () => {
    const wrapper = shallow(
      <EnhancedButton name="hello">Button</EnhancedButton>
    );
    assert.ok(wrapper.is('button[name="hello"]'), 'should have the name attribute');
  });

  it('handles focus propagation based on disabled props', () => {
    const eventStack = [];
    eventStack.reset = () => eventStack.splice(0, eventStack.length);

    const wrapper = shallow(
      <EnhancedButton
        disableKeyboardFocus={true}
        onFocus={() => eventStack.push('focus')}
      >
        Button
      </EnhancedButton>
    );

    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 0);
    wrapper.setProps({disableKeyboardFocus: false});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 1);
    wrapper.setProps({disabled: true});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 1);
    wrapper.setProps({disabled: false});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 2);
    wrapper.setProps({disableKeyboardFocus: true});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 2);
  });

  it('has a TouchRipple and controls it using props', () => {
    const wrapper = shallow(
      <EnhancedButton
        centerRipple={true}
        touchRippleColor="red"
        touchRippleOpacity={0.8}
      >
        Button
      </EnhancedButton>
    );

    const touchRipple = wrapper.find('TouchRipple');
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.strictEqual(touchRipple.length, 1, 'should have a TouchRipple');
    assert.strictEqual(touchRipple.node.props.centerRipple, true);
    assert.strictEqual(touchRipple.node.props.color, 'red');
    assert.strictEqual(touchRipple.node.props.opacity, 0.8);
  });

  it('has no TouchRipple when disableTouchRipple={true}', () => {
    const wrapper = shallow(
      <EnhancedButton disableTouchRipple={true}>Button</EnhancedButton>
    );
    assert.strictEqual(wrapper.find('TouchRipple').length, 0, 'should not have a TouchRipple');
  });

  it('has a FocusRipple when keyboard focused (tracked internally) and controls it using props', () => {
    const wrapper = shallow(
      <EnhancedButton
        focusRippleColor="red"
        focusRippleOpacity={0.8}
      >
        Button
      </EnhancedButton>
    );

    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');

    wrapper.setState({
      isKeyboardFocused: true,
    });

    const focusRipple = wrapper.find('FocusRipple');
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.strictEqual(focusRipple.length, 1, 'should have a FocusRipple');
    assert.strictEqual(focusRipple.node.props.show, true);
    assert.strictEqual(focusRipple.node.props.color, 'red');
    assert.strictEqual(focusRipple.node.props.opacity, 0.8);

    wrapper.setProps({
      disableKeyboardFocus: true,
    });
    wrapper.setState({
      isKeyboardFocused: true,
    });

    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');

    wrapper.setProps({
      disableKeyboardFocus: false,
    });
    wrapper.setState({
      isKeyboardFocused: true,
    });

    assert.strictEqual(wrapper.find('FocusRipple').length, 1, 'should have a FocusRipple');
  });

  it('removes a FocusRipple on blur', () => {
    const wrapper = shallow(
      <EnhancedButton>Button</EnhancedButton>
    );
    wrapper.setState({
      isKeyboardFocused: true,
    });
    assert.strictEqual(wrapper.find('FocusRipple').length, 1, 'should have a FocusRipple');
    wrapper.simulate('blur');
    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');
  });

  it('has no ripples when both are disabled', () => {
    const wrapper = shallow(
      <EnhancedButton
        keyboardFocused={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
      >
        Button
      </EnhancedButton>
    );
    assert.strictEqual(wrapper.find('TouchRipple').length, 0, 'should not have a TouchRipple');
    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');
  });

  it('has no ripples when button is disabled', () => {
    const wrapper = shallow(
      <EnhancedButton keyboardFocused={true} disabled={true}>Button</EnhancedButton>
    );
    assert.strictEqual(wrapper.find('TouchRipple').length, 0, 'should not have a TouchRipple');
    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');
  });

  it('fires the touchtap handler if keyboard focused and the enter or space keys are hit', () => {
    const eventStack = [];
    eventStack.reset = () => eventStack.splice(0, eventStack.length);

    const wrapper = shallow(
      <EnhancedButton
        keyboardFocused={true}
        onTouchTap={() => eventStack.push('touchTap')}
      >
        Button
      </EnhancedButton>
    );

    wrapper.simulate('keyDown', {which: 13});
    assert.strictEqual(eventStack.length, 1);

    wrapper.setState({isKeyboardFocused: true});
    wrapper.simulate('keyUp', {which: 32});
    assert.strictEqual(eventStack.length, 2);

    wrapper.setState({isKeyboardFocused: true});
    wrapper.setProps({disabled: true});
    wrapper.simulate('keyDown', {which: 13});
    assert.strictEqual(eventStack.length, 2, 'should not work when button is disabled');
  });
});
