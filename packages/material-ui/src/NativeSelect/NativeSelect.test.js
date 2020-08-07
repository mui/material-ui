import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Input from '../Input';
import NativeSelect from './NativeSelect';

describe('<NativeSelect />', () => {
  let classes;
  const mount = createMount();
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
    expect(wrapper.find(Input).props().inputProps.classes).to.deep.equal(classes);
  });

  it('should be able to mount the component', () => {
    const wrapper = mount(
      <NativeSelect {...defaultProps} value={10}>
        <option value="">empty</option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelect>,
    );
    expect(wrapper.find('select').props().value).to.equal(10);
  });
});
