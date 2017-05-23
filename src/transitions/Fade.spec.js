// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow } from '../test-utils';
import Fade from './Fade';

describe('<Fade />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Fade />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Fade {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
        assert.strictEqual(handlers[n].args[0].length, 1, 'should forward the element');
      });
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Fade />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      before(() => {
        element = { style: { opacity: 1 } };
        instance.handleEnter(element);
      });

      it('should set element opacity to 0 initially', () => {
        assert.strictEqual(element.style.opacity, 0, 'should set the opacity to 0');
      });
    });

    describe('handleEntering()', () => {
      let element;

      before(() => {
        element = { style: { opacity: 0 } };
        instance.handleEntering(element);
      });

      it('should set opacity to 1', () => {
        assert.strictEqual(element.style.opacity, 1, 'should set the opacity to 1');
      });
    });

    describe('handleExit()', () => {
      let element;

      before(() => {
        element = { style: { opacity: 1 } };
        instance.handleExit(element);
      });

      it('should set opacity to the 0', () => {
        assert.strictEqual(element.style.opacity, 0, 'should set the opacity to 0');
      });
    });
  });
});
