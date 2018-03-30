import React from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import { focusKeyPressed } from '../utils/keyboardFocus';
import TouchRipple from './TouchRipple';
import ButtonBase from './ButtonBase';

const ButtonBaseNaked = unwrap(ButtonBase);

describe('<ButtonBase />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
    mount = createMount();
    classes = getClasses(<ButtonBase />);
  });

  after(() => {
    mount.cleanUp();
  });

  describe('root node', () => {
    it('should render a button with type="button" by default', () => {
      const wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.childAt(0).equals('Hello'), true, 'should say Hello');
      assert.strictEqual(wrapper.props().type, 'button');
    });

    it('should change the button type', () => {
      const wrapper = shallow(<ButtonBase type="submit">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.props().type, 'submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      const wrapper = shallow(<ButtonBase component="span" role="checkbox" aria-checked={false} />);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().role, 'checkbox');
      assert.strictEqual(wrapper.props().tabIndex, '0');
    });

    it('should spread props on button', () => {
      const wrapper = shallow(<ButtonBase data-test="hello">Hello</ButtonBase>);
      assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the button');
    });

    it('should render the custom className and the root class', () => {
      const wrapper = shallow(<ButtonBase className="test-class-name" />);
      assert.strictEqual(
        wrapper.hasClass('test-class-name'),
        true,
        'should pass the test className',
      );
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });

    it('should not apply role="button" if type="button"', () => {
      const wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.props().type, 'button');
      assert.strictEqual(wrapper.props().role, undefined);
    });

    it('should change the button type to span and set role="button"', () => {
      const wrapper = shallow(<ButtonBase component="span">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().type, undefined);
      assert.strictEqual(wrapper.props().role, 'button');
    });

    it('should automatically change the button to an a element when href is provided', () => {
      const wrapper = shallow(<ButtonBase href="http://google.com">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'a');
      assert.strictEqual(wrapper.props().href, 'http://google.com');
    });

    it('should change the button type to a and set role="button"', () => {
      const wrapper = shallow(<ButtonBase component="a">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'a');
      assert.strictEqual(wrapper.props().type, undefined);
      assert.strictEqual(wrapper.props().role, 'button');
    });

    it('should not change the button to an a element', () => {
      const wrapper = shallow(
        <ButtonBase component="span" href="http://google.com">
          Hello
        </ButtonBase>,
      );
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().href, 'http://google.com');
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

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { persist: () => {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('ripple', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
    });

    it('should be enabled by default', () => {
      const ripple = wrapper.find(TouchRipple);
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });

    it('should not have a focus ripple by default', () => {
      wrapper.instance().ripple = { pulsate: spy() };
      wrapper.setState({ keyboardFocused: true });

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        0,
        'should not call pulsate on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop the ripple when the mouse is released', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseUp', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop the ripple when the button blurs', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('blur', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseLeave', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
    });

    it('should center the ripple', () => {
      assert.strictEqual(
        wrapper.find(TouchRipple).prop('center'),
        false,
        'should not be centered by default',
      );
      wrapper.setProps({ centerRipple: true });
      assert.strictEqual(wrapper.find(TouchRipple).prop('center'), true, 'should be centered');
    });
  });

  describe('focusRipple', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <ButtonBaseNaked theme={{}} classes={{}} focusRipple>
          Hello
        </ButtonBaseNaked>,
      );
    });

    it('should be enabled by default', () => {
      const ripple = wrapper.find(TouchRipple);
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });

    it('should pulsate the ripple when keyboardFocused', () => {
      wrapper.instance().ripple = { pulsate: spy() };
      wrapper.setState({ keyboardFocused: true });

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        1,
        'should call pulsate on the ripple',
      );
    });

    it('should not stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
      });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        0,
        'should not call stop on the ripple',
      );
    });

    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      wrapper.instance().ripple = { stop: spy((event, cb) => cb()), start: spy() };
      wrapper.simulate('keyDown', { which: 32, keyCode: 32, key: ' ', persist: () => {} });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop and re-pulsate when space bar is released', () => {
      wrapper.instance().ripple = { stop: spy((event, cb) => cb()), pulsate: spy() };
      wrapper.simulate('keyUp', { which: 32, keyCode: 32, key: ' ', persist: () => {} });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        1,
        'should call pulsate on the ripple',
      );
    });

    it('should stop on blur and set keyboardFocused to false', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('blur', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
      assert.strictEqual(wrapper.state('keyboardFocused'), false, 'should not be keyboardFocused');
    });
  });

  describe('mounted tab press listener', () => {
    let wrapper;
    let instance;
    let button;
    let clock;

    before(() => {
      clock = useFakeTimers();
      wrapper = mount(
        <ButtonBaseNaked theme={{}} classes={{}} id="test-button">
          Hello
        </ButtonBaseNaked>,
      );
      instance = wrapper.instance();
      button = document.getElementById('test-button');
      if (!button) {
        throw new Error('missing button');
      }
      button.focus();

      const event = new window.Event('keyup');
      event.which = keycode('tab');
      window.dispatchEvent(event);
    });

    after(() => {
      clock.restore();
    });

    it('should work', () => {
      assert.strictEqual(
        wrapper.state('keyboardFocused'),
        false,
        'should not set keyboard focus before time has passed',
      );
      clock.tick(instance.keyboardFocusCheckTime * instance.keyboardFocusMaxCheckTimes);
      assert.strictEqual(
        wrapper.state('keyboardFocused'),
        true,
        'should listen for tab presses and set keyboard focus',
      );
    });
  });

  describe('prop: disabled', () => {
    it('should apply the right tabIndex', () => {
      const wrapper = shallow(<ButtonBase disabled>Hello</ButtonBase>);
      assert.strictEqual(wrapper.props().tabIndex, '-1', 'should not receive the focus');
    });

    it('should also apply it when using component', () => {
      const wrapper = shallow(
        <ButtonBase disabled component="button">
          Hello
        </ButtonBase>,
      );
      assert.strictEqual(wrapper.find('button').props().disabled, true);
    });

    it('should reset the focused state', () => {
      const wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
      // We simulate a keyboardFocused button that is getting disabled.
      wrapper.setState({
        keyboardFocused: true,
      });
      wrapper.setProps({
        disabled: true,
      });
      assert.strictEqual(wrapper.state().keyboardFocused, false);
    });

    it('should not apply disabled on a span', () => {
      const wrapper = shallow(
        <ButtonBase component="span" disabled>
          Hello
        </ButtonBase>,
      );
      assert.strictEqual(wrapper.props().disabled, undefined);
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = props => <div {...props} />;
      const wrapper = shallow(<ButtonBase component={Link}>Hello</ButtonBase>);
      assert.strictEqual(wrapper.is(Link), true);
    });
  });

  describe('handleFocus()', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('when disabled should not persist event', () => {
      const wrapper = mount(
        <ButtonBaseNaked theme={{}} classes={{}} disabled>
          Hello
        </ButtonBaseNaked>,
      );
      const instance = wrapper.instance();
      const eventMock = { persist: spy() };
      instance.handleFocus(eventMock);
      assert.strictEqual(eventMock.persist.callCount, 0);
    });

    it('onKeyboardFocusHandler() should propogate call to onKeyboardFocus prop', () => {
      const eventMock = 'woofButtonBase';
      const onKeyboardFocusSpy = spy();
      const wrapper = mount(
        <ButtonBaseNaked
          theme={{}}
          classes={{}}
          component="span"
          onKeyboardFocus={onKeyboardFocusSpy}
        >
          Hello
        </ButtonBaseNaked>,
      );
      const instance = wrapper.instance();
      instance.onKeyboardFocusHandler(eventMock);
      assert.strictEqual(onKeyboardFocusSpy.callCount, 1);
      assert.strictEqual(onKeyboardFocusSpy.calledWith(eventMock), true);
    });

    it('should work with a functionnal component', () => {
      focusKeyPressed(true);
      const MyLink = props => (
        <a href="/foo" {...props}>
          bar
        </a>
      );
      const wrapper = mount(
        <ButtonBaseNaked theme={{}} classes={{}} component={MyLink}>
          Hello
        </ButtonBaseNaked>,
      );
      const instance = wrapper.instance();
      instance.focusKeyPressed = true;
      wrapper.simulate('focus');
      clock.tick(instance.keyboardFocusCheckTime);
    });
  });

  describe('handleKeyDown()', () => {
    let wrapper;
    let instance;
    let event;

    describe('avoids multiple keydown presses', () => {
      it('should work', () => {
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}}>
            Hello
          </ButtonBaseNaked>,
        );
        wrapper.setProps({ focusRipple: true });
        wrapper.setState({ keyboardFocused: true });

        const eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: keycode('space') };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.ripple = { stop: spy() };
        instance.handleKeyDown(event);
        assert.strictEqual(instance.keyDown, true, 'should mark keydown as true');
        assert.strictEqual(event.persist.callCount, 1, 'should call event.persist exactly once');
        assert.strictEqual(instance.ripple.stop.callCount, 1, 'should call stop exactly once');
        assert.strictEqual(
          instance.ripple.stop.calledWith(event),
          true,
          'should call stop with event',
        );
      });
    });

    describe('prop: onKeyDown', () => {
      it('should work', () => {
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}}>
            Hello
          </ButtonBaseNaked>,
        );
        const onKeyDownSpy = spy();
        wrapper.setProps({ onKeyDown: onKeyDownSpy });

        const eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: undefined };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        assert.strictEqual(instance.keyDown, false, 'should not change keydown');
        assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');
        assert.strictEqual(onKeyDownSpy.callCount, 1, 'should call onKeyDown');
        assert.strictEqual(
          onKeyDownSpy.calledWith(event),
          true,
          'should call onKeyDown with event',
        );
      });
    });

    describe('Keyboard accessibility for non interactive elements', () => {
      it('should work', () => {
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}}>
            Hello
          </ButtonBaseNaked>,
        );
        const onClickSpy = spy();
        wrapper.setProps({ onClick: onClickSpy, component: 'div' });

        const eventTargetMock = 'woofButtonBase';
        event = {
          persist: spy(),
          preventDefault: spy(),
          keyCode: keycode('space'),
          target: eventTargetMock,
          currentTarget: eventTargetMock,
        };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        assert.strictEqual(instance.keyDown, false, 'should not change keydown');
        assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');
        assert.strictEqual(event.preventDefault.callCount, 1, 'should call event.preventDefault');
        assert.strictEqual(onClickSpy.callCount, 1, 'should call onClick');
        assert.strictEqual(onClickSpy.calledWith(event), true, 'should call onClick with event');
      });
    });

    describe('prop: disableRipple', () => {
      it('should work', () => {
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}}>
            Hello
          </ButtonBaseNaked>,
        );
        assert.strictEqual(wrapper.find(TouchRipple).length, 1);
        const onKeyDownSpy = spy();
        wrapper.setProps({ onKeyDown: onKeyDownSpy, disableRipple: true, focusRipple: true });
        wrapper.setState({ keyboardFocused: true });
        assert.strictEqual(wrapper.find(TouchRipple).length, 0);

        const eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: keycode('space') };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        assert.strictEqual(instance.keyDown, false, 'should not change keydown');
        assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');
        assert.strictEqual(onKeyDownSpy.callCount, 1, 'should call onKeyDown');
        assert.strictEqual(
          onKeyDownSpy.calledWith(event),
          true,
          'should call onKeyDown with event',
        );
      });
    });
  });

  describe('prop: ref', () => {
    it('should be able to get a ref of the root element', () => {
      function ButtonBaseRef(props) {
        return <ButtonBase ref={props.rootRef} />;
      }
      ButtonBaseRef.propTypes = {
        rootRef: PropTypes.func.isRequired,
      };

      const ref = spy();
      mount(<ButtonBaseRef rootRef={ref}>Hello</ButtonBaseRef>);
      assert.strictEqual(ref.callCount, 1, 'should call the ref function');
      assert.strictEqual(ReactDOM.findDOMNode(ref.args[0][0]).type, 'button');
    });
  });
});
