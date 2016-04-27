/* eslint-env mocha */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {mount, shallow} from 'enzyme';
import {assert} from 'chai';
import RaisedButton from './RaisedButton';
import ActionAndroid from '../svg-icons/action/android';
import getMuiTheme from '../styles/getMuiTheme';

describe('<RaisedButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});
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

  it('renders a label with an icon', () => {
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

  it('renders a hover overlay of equal height to the button', () => {
    const wrappers = [
      () => mountWithContext(
        <RaisedButton>Hello World</RaisedButton>
      ),
      () => mountWithContext(
        <RaisedButton
          backgroundColor="#a4c639"
          icon={<ActionAndroid />}
        />
      ),
    ];

    wrappers.forEach((createWrapper) => {
      const wrapper = createWrapper();
      wrapper.simulate('mouseEnter');

      const overlay = wrapper.ref('overlay');
      const button = ReactDOM.findDOMNode(
        TestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(),
          'button'
        )
      );

      assert.strictEqual(
        overlay.node.clientHeight,
        button.clientHeight,
        'overlay height should match the button height'
      );
    });
  });
});
