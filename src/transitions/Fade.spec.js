// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow } from '../test-utils';
import Fade from './Fade';

describe('<Fade />', () => {
  let shallow;
  const props = {
    in: true,
    children: <div />,
  };

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Fade {...props} />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Fade {...props} {...handlers} />);

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
      wrapper = shallow(<Fade {...props} />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      it('should set element opacity to 0 initially', () => {
        const element = { style: { opacity: 1 } };
        instance.handleEnter(element);
        assert.strictEqual(element.style.opacity, '0', 'should set the opacity to 0');
      });
    });

    describe('handleEntering()', () => {
      it('should set opacity to 1', () => {
        const element = { style: { opacity: 0 } };
        instance.handleEntering(element);
        assert.strictEqual(element.style.opacity, '1', 'should set the opacity to 1');
      });
    });

    describe('handleExit()', () => {
      it('should set opacity to the 0', () => {
        const element = { style: { opacity: 1 } };
        instance.handleExit(element);
        assert.strictEqual(element.style.opacity, '0', 'should set the opacity to 0');
      });
    });
  });
});
