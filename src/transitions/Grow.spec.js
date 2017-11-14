// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow } from '../test-utils';
import Grow, { getScale } from './Grow';

describe('<Grow />', () => {
  let shallow;
  const props = {
    in: true,
    children: <div />,
  };

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render a CSSTransition', () => {
    const wrapper = shallow(<Grow {...props} />);
    assert.strictEqual(wrapper.name(), 'CSSTransition');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Grow {...props} {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
        assert.strictEqual(handlers[n].args[0].length, 1, 'should forward the element');
      });
    });
  });

  describe('prop: timeout', () => {
    let wrapper;
    let instance;
    let element;
    const enterDuration = 556;
    const leaveDuration = 446;

    beforeEach(() => {
      wrapper = shallow(
        <Grow
          {...props}
          timeout={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
        />,
      );
      instance = wrapper.instance();
      element = { getBoundingClientRect: () => ({}), style: {} };
    });

    it('should create proper easeOut animation onEnter', () => {
      instance.handleEntering(element);
      assert.match(element.style.transition, new RegExp(`${enterDuration}ms`));
    });

    it('should create proper sharp animation onExit', () => {
      instance.handleExit(element);
      assert.match(element.style.transition, new RegExp(`${leaveDuration}ms`));
    });
  });

  describe('transition lifecycle', () => {
    const element = {
      style: {
        top: 'auto',
        left: 'auto',
        opacity: 1,
        transform: undefined,
        transformOrigin: undefined,
        transition: undefined,
      },
    };

    describe('handleEnter(element)', () => {
      let wrapper;
      let handleEnter;

      before(() => {
        handleEnter = spy();
        wrapper = shallow(<Grow {...props} onEnter={handleEnter} />);
        wrapper.instance().handleEnter(element);
      });

      it('should set the inline styles for the enter phase', () => {
        assert.strictEqual(element.style.opacity, '0', 'should be transparent');
        assert.strictEqual(
          element.style.transform,
          getScale(0.75),
          'should have the starting scale',
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleEnter.callCount, 1, 'should have been called once');
      });
    });

    describe('handleEntering(element)', () => {
      let wrapper;
      let handleEntering;

      before(() => {
        handleEntering = spy();
        wrapper = shallow(<Grow {...props} onEntering={handleEntering} />);
        wrapper.instance().handleEntering(element);
      });

      it('should set the inline styles for the entering phase', () => {
        assert.strictEqual(
          element.style.transition,
          'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
            'transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          'should apply a transition for transform and opacity',
        );
        assert.strictEqual(element.style.opacity, '1', 'should be visible');
        assert.strictEqual(element.style.transform, getScale(1), 'should have the full scale');
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleEntering.callCount, 1, 'should have been called once');
      });
    });

    describe('handleExit(element)', () => {
      let wrapper;
      let handleExit;

      before(() => {
        handleExit = spy();
        wrapper = shallow(<Grow {...props} onExit={handleExit} />);
        wrapper.instance().handleExit(element);
      });

      it('should set the inline styles for the exit phase', () => {
        assert.strictEqual(element.style.opacity, '0', 'should be transparent');
        assert.strictEqual(element.style.transform, getScale(0.75), 'should have the exit scale');
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleExit.callCount, 1, 'should have been called once');
      });
    });
  });

  describe('addEndListener()', () => {
    let instance;
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should return autoTransitionDuration when timeout is auto', () => {
      const wrapper = shallow(<Grow {...props} timeout="auto" />);
      assert.strictEqual(wrapper.props().timeout, null);
      instance = wrapper.instance();
      const next = spy();

      const autoTransitionDuration = 10;
      instance.autoTransitionDuration = autoTransitionDuration;
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 0);
      clock.tick(autoTransitionDuration);
      assert.strictEqual(next.callCount, 1);

      instance.autoTransitionDuration = undefined;
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 1);
      clock.tick(0);
      assert.strictEqual(next.callCount, 2);
    });

    it('should return props.timeout when timeout is number', () => {
      const timeout = 10;
      const wrapper = shallow(<Grow {...props} timeout={timeout} />);
      assert.strictEqual(wrapper.props().timeout, timeout);
      instance = wrapper.instance();
      const next = spy();
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 0);
      clock.tick(timeout);
      assert.strictEqual(next.callCount, 0);
    });
  });
});
