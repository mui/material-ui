import React from 'react';
import { assert } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Input from '../Input';
import NativeSelect from './NativeSelect';

describe('<NativeSelect />', () => {
  let classes;
  let mount;
  const defaultProps = {
    input: <Input />,
    children: [
      <option key="1" value="1">
        1
      </option>,
      <option key="2" value="2">
        2
      </option>,
    ],
  };

  before(() => {
    classes = getClasses(<NativeSelect {...defaultProps} />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<NativeSelect {...defaultProps} />, () => ({
    classes,
    inheritComponent: Input,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'rootClass'],
  }));

  it('should provide the classes to the input component', () => {
    const wrapper = mount(<NativeSelect {...defaultProps} />);
    assert.deepEqual(wrapper.find(Input).props().inputProps.classes, classes);
  });

  it('should be able to mount the component', () => {
    const wrapper = mount(
      <NativeSelect {...defaultProps} value={10}>
        <option value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelect>,
    );
    assert.strictEqual(wrapper.find('select').props().value, 10);
  });
});
