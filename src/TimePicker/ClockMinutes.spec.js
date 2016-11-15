// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import ClockMinutes, { styleSheet } from './ClockMinutes';


describe('<ClockMinutes />', () => {
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
          return { left: 20, top: 30 };
        } } }],
      type: 'touchend' };
    classes = shallowWithContext.context.styleManager.render(styleSheet);
  });
  it('verify classes', () => {
    const wrapper = shallowWithContext(<ClockMinutes />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.children().last().hasClass(classes.hitMask), true, 'should');
  });
  it('verify events', () => {
    const onChangeCalled = spy();
    const wrapper = shallowWithContext(<ClockMinutes initialMinutes={50} onChange={onChangeCalled} />);
    wrapper.instance().mask = { offsetWidth: 280, offsetHeight: 280 };
    wrapper.instance().componentDidMount();
    wrapper.children().last().simulate('touchMove', touchMoveEvent);
    assert.strictEqual(onChangeCalled.calledOnce, true, 'called onChange once');
    assert.strictEqual(onChangeCalled.args[0][0], 52,
        'the firts ontouchmove should call onChange with the arg 52');
    wrapper.setProps({ initialMinutes: onChangeCalled.args[0][0] });
    wrapper.children().last().simulate('touchEnd', touchMoveEventWithUndefinedOffset);
    assert.strictEqual(onChangeCalled.args[1][0], 0,
        'the second ontouchmove should call onChange with the arg 0');
    wrapper.setProps({ initialMinutes: onChangeCalled.args[1][0] });
    assert.strictEqual(onChangeCalled.calledTwice, true, 'called onChange twice');
  });
});
