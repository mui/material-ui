/* eslint-env mocha */
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import Slide from './Slide';
import { createShallowWithContext } from 'test/utils';

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
        wrapper.simulate(event, { style: {} });
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
        element = { style: {} };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(100%, 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(-100%, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, 100%, 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -100%, 0)');
      });

      it('should set different values if working with a centered element', () => {
        wrapper.setProps({ centered: true });
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(calc(50vw + 50%), 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(calc(-50vw - 50%), 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, calc(50vw + 50%), 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, calc(-50vw - 50%), 0)');
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
        element = { style: {} };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ centered: false });
        wrapper.setProps({ direction: 'left' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(100%, 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(-100%, 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, 100%, 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -100%, 0)');
      });

      it('should set different values if working with a centered element', () => {
        wrapper.setProps({ centered: true });
        wrapper.setProps({ direction: 'left' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(calc(50vw + 50%), 0, 0)');
        wrapper.setProps({ direction: 'right' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(calc(-50vw - 50%), 0, 0)');
        wrapper.setProps({ direction: 'up' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, calc(50vw + 50%), 0)');
        wrapper.setProps({ direction: 'down' });
        instance.handleExiting(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, calc(-50vw - 50%), 0)');
      });
    });
  });
});
