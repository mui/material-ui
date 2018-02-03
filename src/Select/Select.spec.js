import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses, createMount } from '../test-utils';
import { MenuItem } from '../Menu';
import Input from '../Input';
import Select from './Select';

describe('<Select />', () => {
  let shallow;
  let classes;
  let mount;
  const props = {
    input: <Input />,
    children: [<MenuItem value="1">1</MenuItem>, <MenuItem value="2">2</MenuItem>],
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Select {...props} />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a correct top element', () => {
    const wrapper = shallow(<Select {...props} />);
    assert.strictEqual(wrapper.type(), Input);
  });

  it('should provide the classes to the input component', () => {
    const wrapper = shallow(<Select {...props} />);
    assert.deepEqual(wrapper.props().inputProps.classes, classes);
  });

  it('should be able to mount the component', () => {
    const wrapper = mount(
      <Select {...props} value={10}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>,
    );
    assert.strictEqual(wrapper.find('input').props().value, 10);
  });
});
