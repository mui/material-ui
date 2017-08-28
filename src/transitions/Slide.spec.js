// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';
import { createShallow, createMount } from '../test-utils';
import Slide from './Slide';
import transitions, { easing, duration } from '../styles/transitions';
import createMuiTheme from '../styles/createMuiTheme';

describe('<Slide />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({
      dive: true,
    });
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Slide />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  it('enterTransitionDuration prop should have default value from standard durations', () => {
    assert.strictEqual(Slide.Naked.defaultProps.enterTransitionDuration, duration.enteringScreen);
  });

  it('leaveTransitionDuration prop should have default value from standard durations', () => {
    assert.strictEqual(Slide.Naked.defaultProps.leaveTransitionDuration, duration.leavingScreen);
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Slide {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {}, getBoundingClientRect: () => ({}) });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('transition animation', () => {
    let wrapper;
    let instance;
    let element;
    const enterDuration = 556;
    const leaveDuration = 446;

    before(() => {
      wrapper = shallow(
        <Slide enterTransitionDuration={enterDuration} leaveTransitionDuration={leaveDuration} />,
      );
      instance = wrapper.instance();
      element = {
        getBoundingClientRect: () => ({}),
        style: {},
      };
    });

    it('should create proper easeOut animation onEntering', () => {
      instance.handleEntering(element);
      const animation = transitions.create('transform', {
        duration: enterDuration,
        easing: easing.easeOut,
      });
      assert.strictEqual(element.style.transition, animation);
    });

    it('should create proper sharp animation onExit', () => {
      instance.handleExit(element);
      const animation = transitions.create('transform', {
        duration: leaveDuration,
        easing: easing.sharp,
      });
      assert.strictEqual(element.style.transition, animation);
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Slide />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      beforeEach(() => {
        element = {
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 200,
            bottom: 500,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(calc(100vw - 300px), 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-824px, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, calc(100vh - 200px), 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });

      it('should reset the previous transition if needed', () => {
        element.style.transform = 'translate3d(-824px, 0, 0)';
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-824px, 0, 0)');
      });
    });

    describe('handleEntering()', () => {
      let element;

      before(() => {
        element = { style: {} };
        instance.handleEntering(element);
      });

      it('should reset the translate3d', () => {
        assert.strictEqual(element.style.transform, 'translate3d(0, 0, 0)');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = {
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 200,
            bottom: 500,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(calc(100vw - 300px), 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-824px, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, calc(100vh - 200px), 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });
    });
  });

  describe('mount', () => {
    let mount;

    before(() => {
      mount = createMount();
    });

    after(() => {
      mount.cleanUp();
    });

    it('should work when initially hidden', () => {
      const wrapper = mount(
        <Slide.Naked theme={createMuiTheme()} in={false}>
          <div>Foo</div>
        </Slide.Naked>,
      );
      const transition = findDOMNode(wrapper.instance().transition);
      // $FlowFixMe
      assert.notStrictEqual(transition ? transition.style.transform : undefined, undefined);
    });
  });
});
