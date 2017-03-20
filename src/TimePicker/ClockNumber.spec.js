// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ClockNumber, { styleSheet } from './ClockNumber';


describe('<ClockNumber />', () => {
  let shallowWithContext;
  let classes;
  let expectedTransofm;
  before(() => {
    shallowWithContext = createShallowWithContext();
    expectedTransofm = 'translate(95.10565162951535px, -30.901699437494763px)';
    classes = shallowWithContext.context.styleManager.render(styleSheet);
  });

  it('verify classes', () => {
    const wrapper = shallowWithContext(<ClockNumber radius={100} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('getTransformPos', () => {
    const wrapper = shallowWithContext(<ClockNumber radius={100} />);
    wrapper.setProps({ value: 12 });
    const transform = wrapper.first().prop('style').transform;
    assert.strictEqual(transform, expectedTransofm,
        'transform style should be translate(95.10565162951535px, -30.901699437494763px)');
  });

  it('hour type with inner', () => {
    const wrapper = shallowWithContext(<ClockNumber radius={100} />);
    assert.strictEqual(wrapper.hasClass(classes.inner), false, 'should not have the inner class');
    wrapper.setProps({ value: 23, type: 'hour' });
    assert.strictEqual(wrapper.hasClass(classes.inner), true, 'should have the inner class');
  });
});
