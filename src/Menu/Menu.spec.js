// @flow weak
/* eslint-env mocha */

import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Menu, { styleSheet } from './Menu';

describe('<Menu />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a Popover', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.is('Popover'), true, 'should have a Popover root');
  });

  it('should fire Popover transition event callbacks', () => {
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

    const wrapper = shallow(<Menu {...handlers} />);

    events.forEach((n) => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.simulate(event, { style: {} });
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  it('should pass `classes.popover` to the Popover for the className', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.hasClass(classes.popover), true, 'should be classes.popover');
  });

  it('should pass `classes.entered` to the Popover for the enteredClassName', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.prop('enteredClassName'), classes.entered, 'should be classes.entered');
  });

  it('should pass the instance function `getContentAnchorEl` to Popover', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(
      wrapper.prop('getContentAnchorEl'),
      wrapper.instance().getContentAnchorEl,
      'should be the same function',
    );
  });

  it('should pass onRequestClose prop to Popover', () => {
    const fn = () => {};
    const wrapper = shallow(<Menu onRequestClose={fn} />);
    assert.strictEqual(
      wrapper.prop('onRequestClose'), fn, 'should be the same function',
    );
  });

  it('should pass anchorEl prop to Popover', () => {
    const el = {};
    const wrapper = shallow(<Menu anchorEl={el} />);
    assert.strictEqual(
      wrapper.prop('anchorEl'), el, 'should be the same object',
    );
  });

  it('should pass through the `open` prop to Popover', () => {
    const wrapper = shallow(<Menu />);
    assert.strictEqual(wrapper.prop('open'), false, 'should have an open prop of false');
    wrapper.setProps({ open: true });
    assert.strictEqual(wrapper.prop('open'), true, 'should have an open prop of true');
  });

  describe('list node', () => {
    let wrapper;
    let list;

    before(() => {
      wrapper = shallow(<Menu className="test-class" data-test="hi" />);
      list = wrapper.childAt(0);
    });

    it('should render a MenuList inside the Popover', () => {
      assert.strictEqual(list.is('MenuList'), true, 'should have a MenuList as the immediate child');
    });

    it('should spread other props on the list', () => {
      assert.strictEqual(list.prop('data-test'), 'hi', 'should have the custom prop');
    });

    it('should have the user classes', () => {
      assert.strictEqual(list.hasClass('test-class'), true, 'should have the user class');
    });
  });
});
