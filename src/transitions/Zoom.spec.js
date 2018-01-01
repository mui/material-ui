// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow } from '../test-utils';
import Zoom from './Zoom';

describe('<Zoom />', () => {
  let shallow;
  const props = {
    in: true,
    children: <div />,
  };

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Zoom {...props} />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Zoom {...props} {...handlers} />);

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
      wrapper = shallow(<Zoom {...props} />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      it('should set element transform to scale(0) initially', () => {
        const element = { style: { transform: 'scale(1)' } };
        instance.handleEnter(element);
        assert.strictEqual(
          element.style.transform,
          'scale(0)',
          'should set the transform to scale(0)',
        );
      });
    });

    describe('handleEntering()', () => {
      it('should set transform to scale(1)', () => {
        const element = { style: { transform: 'scale(0)' } };
        instance.handleEntering(element);
        assert.strictEqual(
          element.style.transform,
          'scale(1)',
          'should set the transform to scale(1)',
        );
      });
    });

    describe('handleExit()', () => {
      it('should set transform to the scale(0)', () => {
        const element = { style: { transform: 'scale(1)' } };
        instance.handleExit(element);
        assert.strictEqual(
          element.style.transform,
          'scale(0)',
          'should set the transform to scale(0)',
        );
      });
    });
  });
});
