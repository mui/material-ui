/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import RaisedButton from './RaisedButton';
import getMuiTheme from '../styles/getMuiTheme';

describe('<RaisedButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const testChildren = <span className="unique">Hello World</span>;

  it('renders an enhanced button inside paper', () => {
    const wrapper = shallowWithContext(
      <RaisedButton>Button</RaisedButton>
    );
    assert.ok(wrapper.is('Paper'));
    assert.ok(wrapper.childAt(0).is('EnhancedButton'));
  });

  it('renders children', () => {
    const wrapper = shallowWithContext(
      <RaisedButton>{testChildren}</RaisedButton>
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

    const wrapper = shallowWithContext(
      <RaisedButton {...props}>Button</RaisedButton>
    );

    assert.ok(wrapper.childAt(0).is('EnhancedButton'));
    assert.ok(wrapper.childAt(0).is(props));
  });

  it('renders a label with an icon before', () => {
    const wrapper = shallowWithContext(
      <RaisedButton
        icon={<span className="test-icon" />}
        label={<span className="test-label">Hello</span>}
      />
    );
    const icon = wrapper.find('.test-icon');
    const label = wrapper.find('.test-label');
    assert.ok(icon.is('span'));
    assert.strictEqual(label.children().node, 'Hello', 'says hello');
  });
});
