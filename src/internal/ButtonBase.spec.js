/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import {spy} from 'sinon';
import ButtonBase, {styleSheet} from './ButtonBase';
import {createShallowWithContext, createMountWithContext} from 'test/utils';

describe('<ButtonBase>', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    mount = createMountWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });
  after(() => mount.cleanUp());

  describe('root node', () => {
    it('should render a button with type="button" by default', () => {
      const wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).equals('Hello'), true, 'should say Hello');
      assert.strictEqual(wrapper.prop('type'), 'button', 'should be type button');
    });

    it('should change the button type', () => {
      const wrapper = shallow(<ButtonBase type="submit">Hello</ButtonBase>);
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.prop('type'), 'submit', 'should be type submit');
    });

    it('should change the button component and role', () => {
      const wrapper = shallow(<ButtonBase component="span" role="checkbox" />);
      assert.strictEqual(wrapper.is('span'), true, 'should be a span');
      assert.strictEqual(wrapper.prop('role'), 'checkbox', 'should be role checkbox');
    });

    it('should spread props on button', () => {
      const wrapper = shallow(<ButtonBase data-test="hello">Hello</ButtonBase>);
      assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the button');
    });

    it('should render the custom className and the root class', () => {
      const wrapper = shallow(
        <ButtonBase className="test-class-name" />
      );
      assert.strictEqual(wrapper.hasClass('test-class-name'), true, 'should pass the test className');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    });

    it('should change the button type to span and set role="button"', () => {
      const wrapper = shallow(<ButtonBase component="span">Hello</ButtonBase>);
      assert.strictEqual(wrapper.is('span'), true, 'should be a span');
      assert.strictEqual(wrapper.prop('type'), undefined, 'should not set a type');
      assert.strictEqual(wrapper.prop('role'), 'button', 'should role to button');
    });

    it('should automatically change the button to an a element when href is passed', () => {
      const wrapper = shallow(<ButtonBase href="http://google.com">Hello</ButtonBase>);
      assert.strictEqual(wrapper.is('a'), true, 'should be an a element');
      assert.strictEqual(wrapper.prop('href'), 'http://google.com', 'should have the href property');
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = [
        'onClick',
        'onFocus',
        'onBlur',
        'onKeyUp',
        'onKeyDown',
        'onMouseDown',
        'onMouseLeave',
        'onMouseUp',
        'onTouchEnd',
        'onTouchStart',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<ButtonBase {...handlers} />);

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {});
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('ripple', () => {
    let wrapper;

    before(() => wrapper = shallow(<ButtonBase>Hello</ButtonBase>));

    it('should be enabled by default', () => {
      const ripple = wrapper.find('TouchRipple');
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });

    it('should not have a focus ripple by default', () => {
      wrapper.instance().ripple = {pulsate: spy()};
      wrapper.setState({keyboardFocused: true});

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        0,
        'should not call pulsate on the ripple'
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = {start: spy()};
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple'
      );
    });

    it('should stop the ripple when the mouse is released', () => {
      wrapper.instance().ripple = {stop: spy()};
      wrapper.simulate('mouseUp', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple'
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = {start: spy()};
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple'
      );
    });

    it('should stop the ripple when the button blurs', () => {
      wrapper.instance().ripple = {stop: spy()};
      wrapper.simulate('blur', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple'
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = {start: spy()};
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple'
      );
    });

    it('should stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = {stop: spy()};
      wrapper.simulate('mouseLeave', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple'
      );
    });

    it('should center the ripple', () => {
      assert.strictEqual(wrapper.find('TouchRipple').prop('center'), false, 'should not be centered by default');
      wrapper.setProps({centerRipple: true});
      assert.strictEqual(wrapper.find('TouchRipple').prop('center'), true, 'should be centered');
    });
  });

  describe('focusRipple', () => {
    let wrapper;

    before(() => wrapper = shallow(<ButtonBase focusRipple={true}>Hello</ButtonBase>));

    it('should be enabled by default', () => {
      const ripple = wrapper.find('TouchRipple');
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });

    it('should pulsate the ripple when keyboardFocused', () => {
      wrapper.instance().ripple = {pulsate: spy()};
      wrapper.setState({keyboardFocused: true});

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        1,
        'should call pulsate on the ripple'
      );
    });

    it('should not stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = {stop: spy()};
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
      });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        0,
        'should not call stop on the ripple'
      );
    });

    it('should stop pulsate and start a ripple when the space (activation) button is pressed', () => {
      wrapper.instance().ripple = {stop: spy((event, cb) => cb()), start: spy()};
      wrapper.simulate('keyDown', {which: 32, keyCode: 32, key: ' ', persist: () => {}});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple'
      );

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple'
      );
    });

    it('should stop and re-pulsate when space bar is released', () => {
      wrapper.instance().ripple = {stop: spy((event, cb) => cb()), pulsate: spy()};
      wrapper.simulate('keyUp', {which: 32, keyCode: 32, key: ' ', persist: () => {}});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple'
      );

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        1,
        'should call pulsate on the ripple'
      );
    });

    it('should stop on blur and set keyboardFocused to false', () => {
      wrapper.instance().ripple = {stop: spy()};
      wrapper.simulate('blur', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple'
      );
      assert.strictEqual(wrapper.state('keyboardFocused'), false, 'should not be keyboardFocused');
    });
  });

  describe('mounted tab press listener', () => {
    it('should listen for tab presses and set keyboard focus', (done) => {
      const wrapper = mount(
        <ButtonBase id="test-button">Hello</ButtonBase>
      );

      const button = document.getElementById('test-button');
      button.focus();

      const event = new window.Event('keydown');
      event.keyCode = 9;
      window.dispatchEvent(event);

      setTimeout(() => {
        assert.strictEqual(
          wrapper.state('keyboardFocused'),
          true,
          'should be keyboardFocused'
        );
        done();
      }, 200);
    });
  });
});
