import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import MenuItem from '../MenuItem';
import NativeSelectInput from './NativeSelectInput';

describe('<NativeSelectInput />', () => {
  let shallow;
  let mount;
  const defaultProps = {
    classes: { select: 'select' },
    value: 10,
    IconComponent: 'div',
    children: [
      <MenuItem key={1} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={2} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={3} value={30}>
        Thirty
      </MenuItem>,
    ],
  };

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a native select', () => {
    const wrapper = shallow(
      <NativeSelectInput {...defaultProps}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );
    assert.strictEqual(wrapper.find('select').props().value, 10);
  });

  it('should respond to update event', () => {
    const handleChange = spy();
    const wrapper = mount(
      <NativeSelectInput {...defaultProps} onChange={handleChange}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );

    wrapper.find('select').simulate('change', { target: { value: 20 } });
    assert.strictEqual(handleChange.callCount, 1);
    assert.strictEqual(handleChange.args[0][0].target.value, 20);
  });
});
