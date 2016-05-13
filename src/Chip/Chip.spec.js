/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import sinon from 'sinon';
import Chip from './Chip';
import getMuiTheme from '../styles/getMuiTheme';

const Avatar = (props) => <div {...props} />;
Avatar.muiName = 'Avatar';

describe('<Chip />', () => {
  const muiTheme = getMuiTheme();
  const themedShallow = (node) => {
    const context = {muiTheme};
    return shallow(node, {context});
  };

  describe('state', () => {
    const wrapper = themedShallow(
      <Chip onTouchTap={() => {}}>Label</Chip>
    );

    it('renders with initial state of false for clicked and focused', () => {
      assert.strictEqual(wrapper.state('clicked'), false);
      assert.strictEqual(wrapper.state('focused'), false);
    });

    it('sets the focus state onFocus', () => {
      wrapper.simulate('focus');
      assert.strictEqual(wrapper.state('focused'), true);
    });

    it('sets the clicked state on mouseDown', () => {
      wrapper.simulate('mouseDown', {stopPropagation() {}, button: 0});
      assert.strictEqual(wrapper.state('clicked'), true);
    });

    it('unsets the clicked state on mouseUp', () => {
      wrapper.simulate('mouseUp');
      assert.strictEqual(wrapper.state('clicked'), false);
    });

    it('sets the clicked state on touchStart', () => {
      wrapper.simulate('touchStart', {stopPropagation() {}});
      assert.strictEqual(wrapper.state('clicked'), true);
    });

    it('unsets the clicked state on touchEnd', () => {
      wrapper.simulate('touchEnd');
      assert.strictEqual(wrapper.state('clicked'), false);
    });

    it('resets the state on blur', () => {
      wrapper.setState({focused: true, clicked: true});
      wrapper.simulate('blur');
      assert.strictEqual(wrapper.state('clicked'), false);
      assert.strictEqual(wrapper.state('focused'), false);
    });
  });

  describe('rendering', () => {
    it('renders an EnhancedButton', () => {
      const wrapper = themedShallow(
        <Chip>Label</Chip>
      );
      assert.ok(wrapper.is('EnhancedButton'));
    });

    it('renders children', () => {
      const wrapper = themedShallow(
        <Chip>Hello world</Chip>
      );
      assert.ok(wrapper.contains('Hello world'), 'should contain the children');
    });

    it('merges styles and other props into the root node', () => {
      const wrapper = themedShallow(
        <Chip
          style={{paddingRight: 200, color: 'purple', border: '1px solid tomato'}}
          myProp="hello"
        />
      );
      const {style, myProp} = wrapper.props();
      assert.strictEqual(style.paddingRight, 200);
      assert.strictEqual(style.color, 'purple');
      assert.strictEqual(style.border, '1px solid tomato');
      assert.strictEqual(myProp, 'hello');
    });

    it('renders a label with an Avatar before', () => {
      const wrapper = themedShallow(
        <Chip>
          <Avatar src="images/kolage-128.jpg" />
          Hello World
        </Chip>
      );
      const avatar = wrapper.children().at(0);
      const label = wrapper.children().at(1);
      assert.ok(avatar.is('Avatar'));
      assert.ok(label.is('span'));
      assert.strictEqual(label.children().node, 'Hello World', 'says hello world');
    });

    it('does not render a delete icon by default', () => {
      const wrapper = themedShallow(
        <Chip>Label</Chip>
      );
      assert.notOk(wrapper.find('NavigationCancel').length);
    });

    it('renders a delete icon after the label when onRequestDelete is provided', () => {
      const wrapper = themedShallow(
        <Chip onRequestDelete={sinon.spy()}>Label</Chip>
      );
      assert.ok(wrapper.childAt(1).is('NavigationCancel'));
    });
  });

  describe('callbacks', () => {
    it('triggers onRequestDelete when the delete icon is clicked', () => {
      const handleRequestDelete = sinon.spy();
      const wrapper = themedShallow(
        <Chip onRequestDelete={handleRequestDelete}>Label</Chip>
      );
      wrapper.childAt(1).simulate('touchTap', {stopPropagation() {}});
      assert.ok(handleRequestDelete.calledOnce);
    });

    it('bubbles callbacks used internally', () => {
      const events = [
        'blur',
        'focus',
        'keyDown',
        'keyboardFocus',
        'mouseDown',
        'mouseEnter',
        'mouseUp',
        'touchEnd',
        'touchStart',
      ];

      const handlers = {};
      const props = {};

      events.forEach((event) => {
        handlers[event] = sinon.spy();
        props[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = handlers[event];
      });

      const wrapper = themedShallow(
        <Chip {...props}>
          Step One
        </Chip>
      );

      events.forEach((event) => {
        wrapper.simulate(event, {stopPropagation() {}});
        assert.ok(handlers[event].calledOnce, `should trigger the ${event} callback`);
      });
    });
  });
});
