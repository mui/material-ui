// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import ClockHours, { styleSheet } from './ClockHours';


describe('<ClockHours /> and touch events', () => {
  let shallowWithContext;
  let classes;
  let touchMoveEvent;
  let touchMoveEventWithUndefinedOffset;
  before(() => {
    shallowWithContext = createShallowWithContext();
    touchMoveEvent = { preventDefault: () => {},
      changedTouches: [{ offsetX: 190, offsetY: 210 }],
      type: 'touchmove' };
    touchMoveEventWithUndefinedOffset = { preventDefault: () => {},
      changedTouches: [{ offsetX: undefined,
        offsetY: undefined,
        target: { getBoundingClientRect: () => {
          return { left: 200, top: 130 };
        } } }],
      type: 'touchend' };
    classes = shallowWithContext.context.styleManager.render(styleSheet);
  });
  it('verify classes', () => {
    const wrapper = shallowWithContext(<ClockHours />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.children().last().hasClass(classes.hitMask), true, 'should');
  });
  it('verify touch events', () => {
    const onChangeCalled = spy();

    const wrapper = shallowWithContext(<ClockHours
      format="24hr"
      initialHours={10}
      onChange={onChangeCalled}
    />);

    wrapper.instance().mask = { offsetWidth: 280, offsetHeight: 280 };
    wrapper.instance().componentDidMount();
    wrapper.children().last().simulate('touchEnd', touchMoveEvent);
    assert.strictEqual(onChangeCalled.calledOnce, true, 'called onChange once');
    assert.strictEqual(onChangeCalled.args[0][0], 17, 'on touch move should call onChange with the arg 17');
    wrapper.setProps({ initialHours: onChangeCalled.args[0][0] });
    wrapper.children().last().simulate('touchMove', touchMoveEventWithUndefinedOffset);
    assert.strictEqual(onChangeCalled.args[1][0], 12, 'on touch move should call onChange with the arg 12');
    wrapper.setProps({ initialHours: onChangeCalled.args[1][0] });
    assert.strictEqual(onChangeCalled.calledTwice, true, 'called onChange twice');
  });
});


describe('<ClockHours /> mouse events', () => {
  let shallowWithContext;
  let mouseMoveEvent;
  let mouseUpEvent;
  let mouseMoveWithUndefinedData;
  before(() => {
    shallowWithContext = createShallowWithContext();
    mouseMoveEvent = { preventDefault: () => {},
      buttons: 1,
      nativeEvent: { offsetX: 20, offsetY: 30 },
      type: 'mouseMove' };
    mouseUpEvent = { preventDefault: () => {},
      nativeEvent: { offsetX: 190, offsetY: 240 },
      type: 'mouseup' };
    mouseMoveWithUndefinedData = { preventDefault: () => {}, nativeEvent: {} };
  });

  it('verify mouse events', () => {
    const onChangeCalled = spy();
    const wrapper = shallowWithContext(<ClockHours initialHours={10} onChange={onChangeCalled} />);
    wrapper.instance().mask = { offsetWidth: 280, offsetHeight: 280 };
    wrapper.instance().componentDidMount();
    wrapper.children().last().simulate('mouseMove', mouseMoveEvent);
    assert.strictEqual(onChangeCalled.calledOnce, true, 'called onChange once');
    assert.strictEqual(onChangeCalled.args[0][0], 10, 'on mouse move should call onChange with the arg 10');
    wrapper.setProps({ initialHours: onChangeCalled.args[0][0] });
    wrapper.children().last().simulate('mouseUp', mouseUpEvent);
    assert.strictEqual(onChangeCalled.args[1][0], 5, 'on mouse up should call onChange with the arg 9');
    wrapper.setProps({ initialHours: onChangeCalled.args[1][0] });
    assert.strictEqual(onChangeCalled.calledTwice, true, 'called onChange twice');
    wrapper.children().last().simulate('mouseMove', mouseMoveWithUndefinedData);
    assert.strictEqual(onChangeCalled.calledThrice,
      false,
      'this event should return without call the onChange');
  });
});
