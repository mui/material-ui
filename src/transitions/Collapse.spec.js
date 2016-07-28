// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import Collapse, { styleSheet } from './Collapse';
import { createShallowWithContext } from 'test/utils';

describe('<Collapse>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Collapse />);
    assert.strictEqual(wrapper.is('Transition'), true, 'is a Transition component');
  });

  it('should render a container around the wrapper', () => {
    const wrapper = shallow(<Collapse containerClassName="woof" />);
    assert.strictEqual(wrapper.childAt(0).is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.container), true, 'should have the container class');
    assert.strictEqual(wrapper.childAt(0).hasClass('woof'), true, 'should have the user class');
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const wrapper = shallow(<Collapse>{children}</Collapse>);
    assert.strictEqual(wrapper.childAt(0).childAt(0).is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.childAt(0).childAt(0).children().equals(children), true, 'should wrap the children');
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

      const wrapper = shallow(<Collapse {...handlers} />);

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
      wrapper = shallow(<Collapse />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      before(() => {
        element = { style: { height: 32 } };
        instance.handleEnter(element);
      });

      it('should set element height to 0 initially', () => {
        assert.strictEqual(element.style.height, '0px', 'should set the height to 0');
      });
    });

    describe('handleEntering()', () => {
      let element;

      before(() => {
        element = { style: { height: 0 } };
        instance.wrapper = { clientHeight: 666 };
        instance.handleEntering(element);
      });

      it('should set element transition duration', () => {
        assert.strictEqual(element.style.transitionDuration, '300ms', 'should have the default 300ms duration');
      });

      it('should set height to the wrapper height', () => {
        assert.strictEqual(element.style.height, '666px', 'should have 666px height');
      });
    });

    describe('handleEntered()', () => {
      let element;

      before(() => {
        element = { style: { height: 666, transitionDuration: '500ms' } };
        instance.handleEntered(element);
      });

      it('should set element transition duration to 0 to fix a safari bug', () => {
        assert.strictEqual(element.style.transitionDuration, '0ms', 'should have 0ms duration');
      });

      it('should set height to auto', () => {
        assert.strictEqual(element.style.height, 'auto', 'should have auto height');
      });
    });

    describe('handleExit()', () => {
      let element;

      before(() => {
        element = { style: { height: 'auto' } };
        instance.wrapper = { clientHeight: 666 };
        instance.handleExit(element);
      });

      it('should set height to the wrapper height', () => {
        assert.strictEqual(element.style.height, '666px', 'should have 666px height');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = { style: { height: 666 } };
        instance.handleExiting(element);
      });

      it('should set height to the 0', () => {
        assert.strictEqual(element.style.height, '0px', 'should have 0px height');
      });
    });
  });
});
