import React from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { spy, useFakeTimers } from 'sinon';
import rerender from 'test/utils/rerender';
import { createShallow, createMount, getClasses, unwrap } from '@material-ui/core/test-utils';
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
      assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
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
      assert.strictEqual(wrapper.props()['data-test'], 'hello');
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
      assert.strictEqual(ripple.length, 1);
    });

    it('should not have a focus ripple by default', () => {
      wrapper.instance().ripple = { pulsate: spy() };
      wrapper.setState({ focusVisible: true });

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        0,
        'should not call pulsate on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed 1', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1);
    });

    it('should stop the ripple when the mouse is released', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseUp', {});

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1);
    });

    it('should start the ripple when the mouse is pressed 2', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1);
    });

    it('should stop the ripple when the button blurs', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('blur', {});

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1);
    });

    it('should start the ripple when the mouse is pressed 3', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1);
    });

    it('should stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseLeave', {});

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1);
    });

    it('should center the ripple', () => {
      assert.strictEqual(wrapper.find(TouchRipple).props().center, false);
      wrapper.setProps({ centerRipple: true });
      assert.strictEqual(wrapper.find(TouchRipple).props().center, true);
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
      assert.strictEqual(ripple.length, 1);
    });

    it('should pulsate the ripple when focusVisible', () => {
      wrapper.instance().ripple = { pulsate: spy() };
      wrapper.setState({ focusVisible: true });

      assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 1);
    });

    it('should not stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
      });

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 0);
    });

    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      wrapper.instance().ripple = { stop: spy((event, cb) => cb()), start: spy() };
      wrapper.simulate('keyDown', { which: 32, keyCode: 32, key: ' ', persist: () => {} });

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1);
      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1);
    });

    it('should stop and re-pulsate when space bar is released', () => {
      wrapper.instance().ripple = { stop: spy((event, cb) => cb()), pulsate: spy() };
      wrapper.simulate('keyUp', { which: 32, keyCode: 32, key: ' ', persist: () => {} });

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1);

      assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 1);
    });

    it('should stop on blur and set focusVisible to false', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('blur', {});

      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1);
      assert.strictEqual(wrapper.state().focusVisible, false);
    });
  });

  describe('focus inside shadowRoot', () => {
    // Only run on HeadlessChrome which has native shadowRoot support.
    // And jsdom which has limited support for shadowRoot (^12.0.0).
    if (!/HeadlessChrome|jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    let wrapper;
    let instance;
    let button;
    let clock;
    let rootElement;

    beforeEach(() => {
      clock = useFakeTimers();
      rootElement = document.createElement('div');
      rootElement.tabIndex = 0;
      document.body.appendChild(rootElement);
      rootElement.attachShadow({ mode: 'open' });
      wrapper = mount(
        <ButtonBaseNaked theme={{}} classes={{}} id="test-button">
          Hello
        </ButtonBaseNaked>,
        { attachTo: rootElement.shadowRoot },
      );
      instance = wrapper.instance();
      button = rootElement.shadowRoot.getElementById('test-button');
      if (!button) {
        throw new Error('missing button');
      }

      button.focus();

      if (document.activeElement !== rootElement) {
        // Mock activeElement value and simulate host-retargeting in shadow root for
        // jsdom@12.0.0 (https://github.com/jsdom/jsdom/issues/2343)
        rootElement.focus();
        rootElement.shadowRoot.activeElement = button;
        wrapper.simulate('focus');
      }

      const event = new window.Event('keyup');
      event.which = keycode('tab');
      window.dispatchEvent(event);
    });

    afterEach(() => {
      clock.restore();
      ReactDOM.unmountComponentAtNode(rootElement.shadowRoot);
      document.body.removeChild(rootElement);
    });

    it('should set focus state for shadowRoot children', () => {
      assert.strictEqual(wrapper.state().focusVisible, false);
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true);
    });
  });

  describe('mounted tab press listener', () => {
    let wrapper;
    let instance;
    let button;
    let clock;

    beforeEach(() => {
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

    afterEach(() => {
      clock.restore();
    });

    it('should detect the keyboard', () => {
      assert.strictEqual(wrapper.state().focusVisible, false);
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true);
    });

    it('should ignore the keyboard after 1s', () => {
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true);
      button.blur();
      assert.strictEqual(wrapper.state().focusVisible, false);
      button.focus();
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true);
      clock.tick(1e3);
      button.blur();
      assert.strictEqual(wrapper.state().focusVisible, false);
      button.focus();
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, false);
    });
  });

  describe('prop: disabled', () => {
    it('should not receive the focus', () => {
      const wrapper = shallow(<ButtonBase disabled>Hello</ButtonBase>);
      assert.strictEqual(wrapper.props().tabIndex, '-1');
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
      // We simulate a focusVisible button that is getting disabled.
      wrapper.setState({
        focusVisible: true,
      });
      wrapper.setProps({
        disabled: true,
      });
      assert.strictEqual(wrapper.state().focusVisible, false);
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

    it('onFocusVisibleHandler() should propagate call to onFocusVisible prop', () => {
      const eventMock = 'woofButtonBase';
      const onFocusVisibleSpy = spy();
      const wrapper = mount(
        <ButtonBaseNaked
          theme={{}}
          classes={{}}
          component="span"
          onFocusVisible={onFocusVisibleSpy}
        >
          Hello
        </ButtonBaseNaked>,
      );
      const instance = wrapper.instance();
      instance.onFocusVisibleHandler(eventMock);
      assert.strictEqual(onFocusVisibleSpy.callCount, 1);
      assert.strictEqual(onFocusVisibleSpy.calledWith(eventMock), true);
    });

    it('should work with a functional component', () => {
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
      wrapper.simulate('focus');
      clock.tick(instance.focusVisibleCheckTime);
    });
  });

  describe('handleKeyDown()', () => {
    let wrapper;
    let instance;
    let event;

    describe('avoids multiple keydown presses', () => {
      it('should work', () => {
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}} focusRipple>
            Hello
          </ButtonBaseNaked>,
        );
        wrapper.setState({ focusVisible: true });

        const eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: keycode('space') };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.ripple = { stop: spy() };
        instance.handleKeyDown(event);
        assert.strictEqual(instance.keyDown, true);
        assert.strictEqual(event.persist.callCount, 1);
        assert.strictEqual(instance.ripple.stop.callCount, 1);
        assert.strictEqual(instance.ripple.stop.calledWith(event), true);
      });
    });

    describe('prop: onKeyDown', () => {
      it('should work', () => {
        const onKeyDownSpy = spy();
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}} onKeyDown={onKeyDownSpy}>
            Hello
          </ButtonBaseNaked>,
        );

        const eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: undefined };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        assert.strictEqual(instance.keyDown, false);
        assert.strictEqual(event.persist.callCount, 0);
        assert.strictEqual(onKeyDownSpy.callCount, 1);
        assert.strictEqual(onKeyDownSpy.calledWith(event), true);
      });
    });

    describe('keyboard accessibility for non interactive elements', () => {
      it('should work', () => {
        const onClickSpy = spy();
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}} onClick={onClickSpy} component="div">
            Hello
          </ButtonBaseNaked>,
        );

        event = {
          preventDefault: spy(),
          keyCode: keycode('space'),
          target: 'target',
          currentTarget: 'target',
        };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        assert.strictEqual(instance.keyDown, false);
        assert.strictEqual(event.preventDefault.callCount, 1);
        assert.strictEqual(onClickSpy.callCount, 1);
        assert.strictEqual(onClickSpy.calledWith(event), true);
      });

      it('should handle a link with no href', () => {
        const onClickSpy = spy();
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}} component="a" onClick={onClickSpy}>
            Hello
          </ButtonBaseNaked>,
        );
        event = {
          preventDefault: spy(),
          keyCode: keycode('enter'),
          target: 'target',
          currentTarget: 'target',
        };
        instance = wrapper.instance();
        instance.handleKeyDown(event);
        assert.strictEqual(event.preventDefault.callCount, 1);
        assert.strictEqual(onClickSpy.callCount, 1);
      });

      it('should ignore the link with href', () => {
        const onClickSpy = spy();
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}} component="a" href="href" onClick={onClickSpy}>
            Hello
          </ButtonBaseNaked>,
        );
        event = {
          preventDefault: spy(),
          keyCode: keycode('enter'),
          target: 'target',
          currentTarget: 'target',
        };
        instance = wrapper.instance();
        instance.handleKeyDown(event);
        assert.strictEqual(event.preventDefault.callCount, 0);
        assert.strictEqual(onClickSpy.callCount, 0);
      });
    });

    describe('prop: disableTouchRipple', () => {
      it('should work', () => {
        wrapper = mount(
          <ButtonBaseNaked theme={{}} classes={{}} disableTouchRipple>
            Hello
          </ButtonBaseNaked>,
        );
        assert.strictEqual(wrapper.find(TouchRipple).length, 1);
        wrapper.instance().ripple = { start: spy(), stop: spy() };
        wrapper.simulate('mouseDown', {});
        assert.strictEqual(wrapper.instance().ripple.start.callCount, 0);
        wrapper.simulate('mouseUp', {});
        assert.strictEqual(wrapper.instance().ripple.stop.callCount, 0);
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
        wrapper.setState({ focusVisible: true });
        assert.strictEqual(wrapper.find(TouchRipple).length, 0);

        const eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: keycode('space') };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        assert.strictEqual(instance.keyDown, false);
        assert.strictEqual(event.persist.callCount, 0);
        assert.strictEqual(onKeyDownSpy.callCount, 1);
        assert.strictEqual(onKeyDownSpy.calledWith(event), true);
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
      assert.strictEqual(ref.callCount, 1);
      assert.strictEqual(ReactDOM.findDOMNode(ref.args[0][0]).type, 'button');
    });
  });

  describe('prop: action', () => {
    it('should be able to focus visible the button', () => {
      let buttonActions = {};
      const wrapper = mount(
        <ButtonBaseNaked
          theme={{}}
          classes={{}}
          action={actions => {
            buttonActions = actions;
          }}
          focusVisibleClassName="focusVisible"
        >
          Hello
        </ButtonBaseNaked>,
      );

      assert.strictEqual(typeof buttonActions.focusVisible, 'function');
      buttonActions.focusVisible();
      wrapper.update();
      assert.strictEqual(wrapper.instance().button, document.activeElement);
      assert.strictEqual(wrapper.find('.focusVisible').length, 1);
    });
  });

  describe('rerender', () => {
    beforeEach(() => {
      rerender.spy();
    });

    afterEach(() => {
      rerender.reset();
    });

    it('should not rerender the TouchRipple', () => {
      const wrapper = mount(<ButtonBase>foo</ButtonBase>);
      wrapper.setProps({
        children: 'bar',
      });
      assert.strictEqual(
        rerender.updates.filter(update => update.displayName !== 'NoSsr').length,
        1,
      );
    });
  });
});
