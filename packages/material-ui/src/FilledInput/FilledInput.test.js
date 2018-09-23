import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import InputBase from '../InputBase';
import FilledInput from './FilledInput';

describe('<FilledInput />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ untilSelector: 'FilledInput' });
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<FilledInput />);
    assert.strictEqual(wrapper.type(), InputBase);
  });
});
