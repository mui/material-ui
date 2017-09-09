// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ClockPointer, { styleSheet } from './ClockPointer';


describe('<ClockPointer />', () => {
  let shallowWithContext;
  let classes;
  let expectedTransofm;
  before(() => {
    shallowWithContext = createShallowWithContext();
    expectedTransofm = 'rotateZ(330deg)';
    classes = shallowWithContext.context.styleManager.render(styleSheet);
  });

  it('verify classes', () => {
    const wrapper = shallowWithContext(<ClockPointer value={12} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('rotateZ', () => {
    const wrapper = shallowWithContext(<ClockPointer type="hour" value={11} />);
    const transform = wrapper.prop('style').transform;
    assert.strictEqual(transform, expectedTransofm,
        'transform style should be rotateZ(330deg)');
  });

  it('hour type with inner', () => {
    const wrapper = shallowWithContext(<ClockPointer />);
    assert.strictEqual(wrapper.hasClass(classes.inner), false, 'should not have the inner class');
    wrapper.setProps({ value: 23, type: 'hour' });
    assert.strictEqual(wrapper.hasClass(classes.inner), true, 'should have the inner class');
  });
});
