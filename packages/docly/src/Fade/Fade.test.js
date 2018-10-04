import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import Fade from './Fade';

describe('<Fade />', () => {
  let shallow;
  let mount;
  const defaultProps = {
    in: true,
    children: <div />,
  };

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Fade {...defaultProps} />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Fade {...defaultProps} {...handlers} />);

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
      wrapper = shallow(<Fade {...defaultProps} />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      it('should set style properties', () => {
        const element = { style: {} };
        instance.handleEnter(element);
        assert.strictEqual(
          element.style.transition,
          'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        );
      });
    });

    describe('handleExit()', () => {
      it('should set style properties', () => {
        const element = { style: {} };
        instance.handleExit(element);
        assert.strictEqual(
          element.style.transition,
          'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        );
      });
    });
  });

  describe('prop: appear', () => {
    it('should work when initially hidden', () => {
      const wrapper = mount(
        <Fade in={false} appear>
          <div>Foo</div>
        </Fade>,
      );
      assert.deepEqual(wrapper.find('div').props().style, {
        opacity: 0,
        willChange: 'opacity',
      });
    });

    it('should work when initially hidden', () => {
      const wrapper = mount(
        <Fade in={false} appear={false}>
          <div>Foo</div>
        </Fade>,
      );
      assert.deepEqual(wrapper.find('div').props().style, {
        opacity: 0,
        willChange: 'opacity',
      });
    });
  });
});
