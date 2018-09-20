import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import InputBase from '../InputBase';
import OutlinedInput from './OutlinedInput';
import NotchedOutline from './NotchedOutline';

describe('<OutlinedInput />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ untilSelector: 'OutlinedInput' });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<OutlinedInput labelWidth={0} />);
    assert.strictEqual(wrapper.type(), InputBase);
  });

  it('should mount', () => {
    const wrapper = mount(<OutlinedInput labelWidth={0} />);
    assert.strictEqual(wrapper.find(NotchedOutline).length, 1);
  });
});
