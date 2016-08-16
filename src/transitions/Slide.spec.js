// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import Slide from './Slide';

describe('<Slide>', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Slide />);
    assert.strictEqual(wrapper.is('Transition'), true, 'is a Transition component');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = [
        'onEnter',
        'onEntering',
        'onEntered',
        'onExit',
        'onExiting',
        'onExited',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Slide {...handlers} />);

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {}, getBoundingClientRect: () => ({}) });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
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

      before(() => {
        element = {
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 500,
            top: 200,
            bottom: 100,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(1000px, 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-800px, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, 400px, 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
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
            right: 500,
            top: 200,
            bottom: 100,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(1000px, 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-800px, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, 400px, 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });
    });
  });
});
