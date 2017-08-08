// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Card from './Card';

describe('<Card />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render Paper with 2dp', () => {
    const wrapper = shallow(<Card />);
    assert.strictEqual(wrapper.name(), 'Paper');
    assert.strictEqual(wrapper.props().elevation, 2);
  });

  it('should render Paper with 8dp', () => {
    const wrapper = shallow(<Card raised />);
    assert.strictEqual(wrapper.props().elevation, 8);
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Card data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });
});
