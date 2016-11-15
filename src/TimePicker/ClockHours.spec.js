// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import ClockHours, { styleSheet } from './ClockHours';


describe('<ClockHours />', () => {
  let shallowWithContext;
  let classes;
  let touchMoveEvent;
  let touchMoveEventWithUndefinedOffset;
  before(() => {
    shallowWithContext = createShallowWithContext();
    touchMoveEvent = { preventDefault: () => {},
      changedTouches: [{ offsetX: 20, offsetY: 30 }],
      type: 'touchmove' };
    touchMoveEventWithUndefinedOffset = { preventDefault: () => {},
      changedTouches: [{ offsetX: undefined,
        offsetY: undefined,
        target: { getBoundingClientRect: () => {
          return { left: 200, top: 130 };
        } } }],
      type: 'touchmove' };
    classes = shallowWithContext.context.styleManager.render(styleSheet);
  });
  it('verify classes', () => {
    const wrapper = shallowWithContext(<ClockHours />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.children().last().hasClass(classes.hitMask), true, 'should');
  });
  it('verify events', () => {
    const onChangeCalled = spy();
    const wrapper = shallowWithContext(<ClockHours initialHours={10} onChange={onChangeCalled} />);
    wrapper.instance().mask = { offsetWidth: 280, offsetHeight: 280 };
    wrapper.instance().componentDidMount();
    wrapper.children().last().simulate('touchMove', touchMoveEvent);
    assert.strictEqual(onChangeCalled.calledOnce, true, 'called onChange once');
    assert.strictEqual(onChangeCalled.args[0][0], 10, 'on touch move should call onChange with the arg 10');
    wrapper.setProps({ initialHours: onChangeCalled.args[0][0] });
    wrapper.children().last().simulate('touchMove', touchMoveEventWithUndefinedOffset);
    assert.strictEqual(onChangeCalled.args[1][0], 0, 'on touch move should call onChange with the arg 0');
    wrapper.setProps({ initialHours: onChangeCalled.args[1][0] });
    assert.strictEqual(onChangeCalled.calledTwice, true, 'called onChange twice');
  });
});
