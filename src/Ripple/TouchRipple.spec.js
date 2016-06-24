/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import TouchRipple from './TouchRipple';
import {createShallowWithContext} from 'test/utils';

describe('<TouchRipple />', () => {
  let shallow;

  before(() => shallow = createShallowWithContext());

  it('should render the custom className', () => {
    const wrapper = shallow(
      <TouchRipple className="test-class-name" />
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should contain the test className');
  });
});
