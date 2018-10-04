import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses, createMount } from '../test-utils';
import Input from '../Input';
import NativeSelect from './NativeSelect';

describe('<NativeSelect />', () => {
  let shallow;
  let classes;
  let mount;
  const props = {
    input: <Input />,
    children: [<option value="1">1</option>, <option value="2">2</option>],
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<NativeSelect {...props} />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a correct top element', () => {
    const wrapper = shallow(<NativeSelect {...props} />);
    assert.strictEqual(wrapper.type(), Input);
  });

  it('should provide the classes to the input component', () => {
    const wrapper = shallow(<NativeSelect {...props} />);
    assert.deepEqual(wrapper.props().inputProps.classes, classes);
  });

  it('should be able to mount the component', () => {
    const wrapper = mount(
      <NativeSelect {...props} value={10}>
        <option value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelect>,
    );
    assert.strictEqual(wrapper.find('select').props().value, 10);
  });
});
