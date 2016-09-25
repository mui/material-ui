// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import RadioGroup from './RadioGroup';

describe('<RadioGroup>', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
  });

  it('should render a radiogroup div', () => {
    const wrapper = shallow(
      <RadioGroup />
    );
    assert.strictEqual(
      wrapper.is('div[role="radiogroup"]'),
      true,
      'should be a div with the correct role'
    );
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const wrapper = shallow(
      <RadioGroup onBlur={handleBlur} />
    );
    const event = {};
    wrapper.simulate('blur', event);
    assert.strictEqual(handleBlur.callCount, 1);
    assert.strictEqual(handleBlur.args[0][0], event);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const wrapper = shallow(
      <RadioGroup onKeyDown={handleKeyDown} />
    );
    const event = {};
    wrapper.simulate('keyDown', event);
    assert.strictEqual(handleKeyDown.callCount, 1);
    assert.strictEqual(handleKeyDown.args[0][0], event);
  });
});
