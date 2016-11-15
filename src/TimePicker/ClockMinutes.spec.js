// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ClockMinutes, { styleSheet } from './ClockMinutes';


describe('<ClockMinutes />', () => {
  let shallowWithContext;
  let classes;
  let touchMoveEvent;
  before(() => {
    shallowWithContext = createShallowWithContext();
    touchMoveEvent = { preventDefault: () => {},
      changedTouches: [{ offsetX: 20, offsetY: 30 }],
      type: 'touchmove' };
    classes = shallowWithContext.context.styleManager.render(styleSheet);
  });
  it('verify classes', () => {
    const wrapper = shallowWithContext(<ClockMinutes />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.children().last().hasClass(classes.hitMask), true, 'should');
  });
  it('verify events', () => {
    const wrapper = shallowWithContext(<ClockMinutes onChange={() => {}} />);
    wrapper.instance().mask = { offsetWidth: 280, offsetHeight: 280 };
    wrapper.instance().componentDidMount();
    wrapper.children().last().simulate('touchMove', touchMoveEvent);
  });
});
