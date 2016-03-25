/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';
import FlatButton from './FlatButton';

describe('<FlatButton />', () => {
  const flatButtonTheme = getMuiTheme().flatButton;
  const testChildren = <div className="unique">Hello World</div>;

  it('renders an enhanced button', () => {
    const wrapper = shallow(
      <FlatButton>Button</FlatButton>
    );
    assert.ok(wrapper.is('EnhancedButton'));
  });

  it('renders children', () => {
    const wrapper = shallow(
      <FlatButton>{testChildren}</FlatButton>
    );
    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('passes props to the enhanced button', () => {
    const props = {
      ariaLabel: 'Say hello world',
      disabled: true,
      href: 'http://google.com',
      linkButton: true,
      name: 'Hello World',
    };

    const wrapper = shallow(
      <FlatButton {...props}>Button</FlatButton>
    );

    assert.ok(wrapper.is('EnhancedButton'));
    assert.ok(wrapper.is(props));
  });

  it('renders a label with an icon before', () => {
    const wrapper = shallow(
      <FlatButton
        icon={<span className="test-icon" />}
        label="Hello"
      />
    );
    const icon = wrapper.children().at(0);
    const label = wrapper.children().at(1);
    assert.ok(icon.is('span'), );
    assert.ok(icon.hasClass('test-icon'));
    assert.ok(label.is('FlatButtonLabel'));
    assert.strictEqual(label.node.props.label, 'Hello', 'says hello');
  });

  it('renders a label with an icon after', () => {
    const wrapper = shallow(
      <FlatButton
        icon={<span className="test-icon" />}
        label="Hello"
        labelPosition="before"
      />
    );
    const icon = wrapper.children().at(1);
    const label = wrapper.children().at(0);
    assert.ok(icon.is('span'), );
    assert.ok(icon.hasClass('test-icon'));
    assert.ok(label.is('FlatButtonLabel'));
    assert.strictEqual(label.node.props.label, 'Hello', 'says hello');
  });

  it('colors the button the primary theme color', () => {
    const wrapper = shallow(
      <FlatButton
        label="Button"
        icon={<span className="test-icon" />}
        primary={true}
      />
    );
    const icon = wrapper.children().at(0);
    assert.ok(wrapper.is('EnhancedButton'));
    assert.ok(wrapper.is({
      style: {
        color: flatButtonTheme.primaryTextColor,
      },
    }));
    assert.ok(icon.is('span'));
    assert.ok(icon.is({color: flatButtonTheme.primaryTextColor}));
  });

  it('colors the button the secondary theme color', () => {
    const wrapper = shallow(
      <FlatButton secondary={true} icon={<span className="test-icon" />}>Button</FlatButton>
    );
    assert.ok(wrapper.is('EnhancedButton'));
    assert.ok(wrapper.is({
      style: {
        color: flatButtonTheme.secondaryTextColor,
      },
    }));
  });

  it('overrides hover and background color styles via props', () => {
    const wrapper = shallow(
      <FlatButton
        backgroundColor="rgba(159,159,159)"
        hoverColor="yellow"
        label="Button"
      />
    );

    assert.ok(wrapper.is({
      style: {
        backgroundColor: 'rgba(159,159,159)',
      },
    }), 'should have the custom background color');

    wrapper.setState({hovered: true});

    assert.ok(wrapper.is({
      style: {
        backgroundColor: 'yellow',
      },
    }), 'should have the custom hover background color');
  });

  it('overrides the ripple color via props', () => {
    const wrapper = shallow(
      <FlatButton rippleColor="yellow" label="Button" />
    );
    assert.strictEqual(wrapper.node.props.focusRippleColor, 'yellow', 'should be yellow');
    assert.strictEqual(wrapper.node.props.touchRippleColor, 'yellow', 'should be yellow');
  });
});
