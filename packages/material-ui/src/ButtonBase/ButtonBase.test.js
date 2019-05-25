import React from 'react';
import { act } from 'react-dom/test-utils';
import { assert } from 'chai';
import { spy } from 'sinon';
import rerender from 'test/utils/rerender';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import TouchRipple from './TouchRipple';
import ButtonBase from './ButtonBase';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import * as PropTypes from 'prop-types';

function focusVisible(element) {
  element.blur();
  document.dispatchEvent(new window.Event('keydown'));
  element.focus();
}

function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  document.dispatchEvent(new window.Event('pointerdown'));
}

describe('<ButtonBase />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
    // StrictModeViolation: uses TouchRipple
    mount = createMount({ strict: false });
    classes = getClasses(<ButtonBase />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ButtonBase />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'a',
  }));

  describe('root node', () => {
    it('should change the button type', () => {
      const wrapper = mount(<ButtonBase type="submit">Hello</ButtonBase>);
      const button = wrapper.find('button');
      assert.strictEqual(button.exists(), true);
      assert.strictEqual(button.props().type, 'submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      const wrapper = mount(<ButtonBase component="span" role="checkbox" aria-checked={false} />);
      const checkbox = wrapper.find('span[role="checkbox"]');
      assert.strictEqual(checkbox.props().tabIndex, 0);
    });

    it('should not apply role="button" if type="button"', () => {
      const wrapper = mount(<ButtonBase>Hello</ButtonBase>);
      const button = wrapper.find('button');
      assert.strictEqual(button.exists(), true);
      assert.strictEqual(wrapper.props().role, undefined);
    });

    it('should change the button type to span and set role="button"', () => {
      const wrapper = mount(<ButtonBase component="span">Hello</ButtonBase>);
      const button = wrapper.find('[role="button"]');
      assert.strictEqual(button.exists(), true);
      assert.strictEqual(button.type(), 'span');
      assert.strictEqual(button.props().type, undefined);
    });

    it('should automatically change the button to an a element when href is provided', () => {
      const wrapper = mount(<ButtonBase href="http://google.com">Hello</ButtonBase>);
      const button = wrapper.find('[role="button"]');
      assert.strictEqual(button.type(), 'a');
      assert.strictEqual(button.props().href, 'http://google.com');
    });

    it('should change the button type to a and set role="button"', () => {
      const wrapper = mount(<ButtonBase component="a">Hello</ButtonBase>);
      const button = wrapper.find('[role="button"]');
      assert.strictEqual(button.exists(), true);
      assert.strictEqual(button.type(), 'a');
      assert.strictEqual(button.props().type, undefined);
    });

    it('should not change the button to an a element', () => {
      const wrapper = mount(
        <ButtonBase component="span" href="http://google.com">
          Hello
        </ButtonBase>,
      );
      const button = wrapper.find('[role="button"]');
      assert.strictEqual(button.name(), 'span');
      assert.strictEqual(button.props().href, 'http://google.com');
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
    describe('interactions', () => {
      const buttonRef = React.createRef();
      let wrapper;

      /**
       * Each test in here relies on the previous one. Each one has a single
       * act and a single assertion. The state of the Ripple is tracked by the number of ripples
       * that are active i.e. not leaving and the number of ripples that are inactive (child-leaving)
       */

      before(() => {
        wrapper = mount(
          <React.Fragment>
            <ButtonBase
              ref={buttonRef}
              TouchRippleProps={{
                classes: {
                  root: 'touch-ripple',
                  ripple: 'ripple',
                  ripplePulsate: 'ripple-pulsate',
                  rippleVisible: 'ripple-visible',
                  child: 'child',
                  childLeaving: 'child-leaving',
                },
              }}
            >
              Hello
            </ButtonBase>
          </React.Fragment>,
        );
        simulatePointerDevice();
      });

      it('should not have a focus ripple by default', () => {
        act(() => {
          focusVisible(buttonRef.current);
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-pulsate').length, 0);
      });

      it('should start the ripple when the mouse is pressed 1', () => {
        act(() => {
          wrapper.simulate('mouseDown');
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 0);
        assert.strictEqual(wrapper.find('.ripple-visible .child:not(.child-leaving)').length, 1);
      });

      it('should stop the ripple when the mouse is released', () => {
        act(() => {
          wrapper.simulate('mouseUp');
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 1);
        assert.strictEqual(wrapper.find('.ripple-visible .child:not(.child-leaving)').length, 0);
      });

      it('should start the ripple when the mouse is pressed 2', () => {
        act(() => {
          wrapper.simulate('mouseDown');
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 1);
        assert.strictEqual(wrapper.find('.ripple-visible .child:not(.child-leaving)').length, 1);
      });

      it('should stop the ripple when the button blurs', () => {
        act(() => {
          wrapper.simulate('blur');
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 2);
        assert.strictEqual(wrapper.find('.ripple-visible .child:not(.child-leaving)').length, 0);
      });

      it('should start the ripple when the mouse is pressed 3', () => {
        act(() => {
          wrapper.simulate('mouseDown');
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 2);
        assert.strictEqual(wrapper.find('.ripple-visible .child:not(.child-leaving)').length, 1);
      });

      it('should stop the ripple when the mouse leaves', () => {
        act(() => {
          wrapper.simulate('mouseLeave');
        });
        wrapper.update();

        assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 3);
        assert.strictEqual(wrapper.find('.ripple-visible .child:not(.child-leaving)').length, 0);
      });
    });

    it('should center the ripple', () => {
      const wrapper = mount(<ButtonBase />);
      assert.strictEqual(wrapper.find(TouchRipple).props().center, false);
      wrapper.setProps({ centerRipple: true });
      wrapper.update();
      assert.strictEqual(wrapper.find(TouchRipple).props().center, true);
    });
  });

  describe('focusRipple', () => {
    const buttonRef = React.createRef();
    let wrapper;

    before(() => {
      wrapper = mount(
        <React.Fragment>
          <ButtonBase
            focusRipple
            focusVisibleClassName="focus-visible"
            ref={buttonRef}
            TouchRippleProps={{
              classes: {
                root: 'touch-ripple',
                ripple: 'ripple',
                ripplePulsate: 'ripple-pulsate',
                rippleVisible: 'ripple-visible',
                childLeaving: 'child-leaving',
              },
            }}
          >
            Hello
          </ButtonBase>
        </React.Fragment>,
      );
      simulatePointerDevice();
    });

    it('should be enabled by default', () => {
      const ripple = wrapper.find(TouchRipple);
      assert.strictEqual(ripple.length, 1);
    });

    it('should pulsate the ripple when focusVisible', () => {
      act(() => {
        focusVisible(buttonRef.current);
      });
      wrapper.update();

      assert.strictEqual(wrapper.find('.ripple-pulsate').length, 1);
    });

    it('should not stop the ripple when the mouse leaves', () => {
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
      });

      assert.strictEqual(wrapper.find('.ripple-pulsate').length, 1);
    });

    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      act(() => {
        wrapper.find('button').simulate('keyDown', {
          key: ' ',
          persist: () => {},
        });
      });
      wrapper.update();

      assert.strictEqual(wrapper.find('.ripple-pulsate .child-leaving').length, 1);
      assert.strictEqual(wrapper.find('.ripple-visible').length, 2);
    });

    it('should stop and re-pulsate when space bar is released', () => {
      act(() => {
        wrapper.simulate('keyUp', {
          key: ' ',
          persist: () => {},
        });
      });
      wrapper.update();

      assert.strictEqual(wrapper.find('.ripple-pulsate .child-leaving').length, 1);
      assert.strictEqual(wrapper.find('.ripple-pulsate').length, 2);
      assert.strictEqual(wrapper.find('.ripple-visible').length, 3);
    });

    it('should stop on blur and set focusVisible to false', () => {
      assert.strictEqual(wrapper.find('button.focus-visible').length, 1);
      act(() => {
        wrapper.simulate('blur', {});
      });
      wrapper.update();

      assert.strictEqual(wrapper.find('.ripple-visible .child-leaving').length, 3);
    });
  });

  describe('prop: disabled', () => {
    it('should have a negative tabIndex', () => {
      const wrapper = mount(<ButtonBase disabled>Hello</ButtonBase>);
      assert.strictEqual(wrapper.find('button').props().tabIndex, -1);
    });

    it('should forward it to native buttons', () => {
      const wrapper = mount(
        <ButtonBase disabled component="button">
          Hello
        </ButtonBase>,
      );
      assert.strictEqual(wrapper.find('button').props().disabled, true);
    });

    it('should reset the focused state', () => {
      const wrapper = mount(<ButtonBase>Hello</ButtonBase>);
      const button = wrapper.find('button').instance();
      simulatePointerDevice();

      focusVisible(button);

      assert.strictEqual(button.classList.contains(classes.focusVisible), true);

      wrapper.setProps({ disabled: true });

      assert.strictEqual(button.classList.contains(classes.focusVisible), false);
    });

    it('should use aria attributes for other components', () => {
      const wrapper = mount(
        <ButtonBase component="span" disabled>
          Hello
        </ButtonBase>,
      );
      assert.strictEqual(wrapper.find('span[role="button"]').props().disabled, undefined);
      assert.strictEqual(wrapper.find('span[role="button"]').props()['aria-disabled'], true);
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = React.forwardRef((props, ref) => <div ref={ref} {...props} />);
      const wrapper = mount(<ButtonBase component={Link}>Hello</ButtonBase>);
      assert.strictEqual(
        wrapper
          .find('[role="button"]')
          .first()
          .type(),
        Link,
      );
    });
  });

  describe('event: focus', () => {
    it('when disabled should not call onFocus', () => {
      const onFocusSpy = spy();
      const wrapper = mount(
        <ButtonBase component="div" disabled onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );
      const button = wrapper.find('div[role="button"]').instance();
      button.focus();

      assert.strictEqual(onFocusSpy.callCount, 0);
    });

    it('has a focus-visible polyfill', () => {
      const wrapper = mount(<ButtonBase>Hello</ButtonBase>);
      const button = wrapper.find('button').instance();
      simulatePointerDevice();

      assert.strictEqual(button.classList.contains(classes.focusVisible), false);
      button.focus();
      assert.strictEqual(button.classList.contains(classes.focusVisible), false);
      focusVisible(button);
      assert.strictEqual(button.classList.contains(classes.focusVisible), true);
    });

    it('onFocusVisibleHandler() should propagate call to onFocusVisible prop', () => {
      const onFocusVisibleSpy = spy();
      const buttonRef = React.createRef();
      mount(
        <React.Fragment>
          <ButtonBase component="span" onFocusVisible={onFocusVisibleSpy} ref={buttonRef}>
            Hello
          </ButtonBase>
        </React.Fragment>,
      );
      simulatePointerDevice();

      focusVisible(buttonRef.current);

      assert.strictEqual(onFocusVisibleSpy.callCount, 1);
      assert.strictEqual(onFocusVisibleSpy.firstCall.args.length, 1);
    });
  });

  describe('event: keydown', () => {
    // eslint-disable-next-line mocha/no-skipped-tests
    describe.skip('avoids multiple keydown presses', () => {
      it('should work', () => {
        const wrapper = mount(<ButtonBase focusRipple>Hello</ButtonBase>);
        const instanceWrapper = wrapper.find('ButtonBase');
        instanceWrapper.setState({ focusVisible: true });

        const eventPersistSpy = spy();
        const event = { persist: eventPersistSpy, key: ' ' };

        const instance = instanceWrapper.instance();
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
      it('call it when keydown events are dispatched', () => {
        const onKeyDownSpy = spy();
        const wrapper = mount(<ButtonBase onKeyDown={onKeyDownSpy}>Hello</ButtonBase>);

        const event = { persist: spy(), key: undefined };
        wrapper.simulate('keyDown', event);

        assert.strictEqual(event.persist.callCount, 0);
        assert.strictEqual(onKeyDownSpy.callCount, 1);
      });
    });

    describe('prop: disableTouchRipple', () => {
      it('creates no ripples on click', () => {
        const wrapper = mount(
          <ButtonBase
            disableTouchRipple
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple',
              },
            }}
          >
            Hello
          </ButtonBase>,
        );
        const button = wrapper.find('button').instance();

        assert.strictEqual(wrapper.find(TouchRipple).length, 1);

        act(() => {
          wrapper.simulate('click', {});
        });
        wrapper.update();

        assert.strictEqual(button.classList.contains('ripple'), false);
      });
    });

    describe('prop: disableRipple', () => {
      it('removes the TouchRipple', () => {
        const wrapper = mount(
          <ButtonBase disableRipple focusRipple>
            Hello
          </ButtonBase>,
        );

        assert.strictEqual(wrapper.find(TouchRipple).length, 0);
      });
    });

    describe('keyboard accessibility for non interactive elements', () => {
      it('calls onClick when a spacebar is pressed on the element', () => {
        const onClickSpy = spy();
        const wrapper = mount(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );

        const event = {
          preventDefault: spy(),
          key: ' ',
          target: 'target',
          currentTarget: 'target',
        };
        wrapper
          .find('div[role="button"]')
          .props()
          .onKeyDown(event);

        assert.strictEqual(event.preventDefault.callCount, 1);
        assert.strictEqual(onClickSpy.firstCall.calledWithMatch(event), true);
      });

      it('prevents default with an anchor and empty href', () => {
        const onClickSpy = spy();
        const wrapper = mount(
          <ButtonBase component="a" onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );
        const event = {
          preventDefault: spy(),
          key: 'Enter',
          target: 'target',
          currentTarget: 'target',
        };
        wrapper
          .find('a[role="button"]')
          .props()
          .onKeyDown(event);

        assert.strictEqual(event.preventDefault.callCount, 1);
        assert.strictEqual(onClickSpy.callCount, 1);
      });

      it('should ignore anchors with href', () => {
        const onClickSpy = spy();
        const wrapper = mount(
          <ButtonBase component="a" href="href" onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );
        const event = {
          preventDefault: spy(),
          key: 'Enter',
          target: 'target',
          currentTarget: 'target',
        };
        wrapper
          .find('a[role="button"]')
          .props()
          .onKeyDown(event);

        assert.strictEqual(event.preventDefault.callCount, 0);
        assert.strictEqual(onClickSpy.callCount, 0);
      });
    });
  });

  describe('prop: action', () => {
    it('should be able to focus visible the button', () => {
      let buttonActions = {};
      const wrapper = mount(
        <ButtonBase
          action={actions => {
            buttonActions = actions;
          }}
          focusVisibleClassName="focusVisible"
        >
          Hello
        </ButtonBase>,
      );

      assert.strictEqual(typeof buttonActions.focusVisible, 'function');
      buttonActions.focusVisible();
      wrapper.update();
      assert.strictEqual(wrapper.find('button').getDOMNode(), document.activeElement);
      assert.strictEqual(wrapper.find('.focusVisible').exists(), true);
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
        3,
      );
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      PropTypes.resetWarningCache();
    });

    it('warns on invalid `component` prop', () => {
      // Only run the test on node. On the browser the thrown error is not caught
      if (!/jsdom/.test(window.navigator.userAgent)) {
        return;
      }

      function Component(props) {
        return <button type="button" {...props} />;
      }

      // cant match the error message here because flakiness with mocha watchmode
      mount(<ButtonBase component={Component} />);

      assert.include(
        consoleErrorMock.args()[0][0],
        'Invalid prop `component` supplied to `ForwardRef(ButtonBase)`. Expected an element type that can hold a ref',
      );
    });
  });
});
