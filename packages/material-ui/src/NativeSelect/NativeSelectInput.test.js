import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createShallow } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import NativeSelectInput from './NativeSelectInput';

describe('<NativeSelectInput />', () => {
  let shallow;
  const mount = createMount();
  const defaultProps = {
    classes: { select: 'select' },
    value: 10,
    IconComponent: 'div',
    children: [
      <option key={1} value={10}>
        Ten
      </option>,
      <option key={2} value={20}>
        Twenty
      </option>,
      <option key={3} value={30}>
        Thirty
      </option>,
    ],
  };

  before(() => {
    shallow = createShallow();
  });

  describeConformance(<NativeSelectInput {...defaultProps} onChange={() => {}} />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLSelectElement,
  }));

  it('should render a native select', () => {
    const wrapper = shallow(
      <NativeSelectInput {...defaultProps}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );
    expect(wrapper.find('select').props().value).to.equal(10);
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
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][0].target.value).to.equal(20);
  });

  it('should apply outlined class', () => {
    const outlined = 'class for outlined variant';
    const wrapper = shallow(
      <NativeSelectInput
        {...defaultProps}
        variant="outlined"
        classes={{ ...defaultProps.classes, outlined }}
      />,
    );

    expect(wrapper.find(`.${defaultProps.classes.select}`).hasClass(outlined)).to.equal(true);
  });

  it('should apply filled class', () => {
    const filled = 'class for filled variant';
    const wrapper = shallow(
      <NativeSelectInput
        {...defaultProps}
        variant="filled"
        classes={{ ...defaultProps.classes, filled }}
      />,
    );

    expect(wrapper.find(`.${defaultProps.classes.select}`).hasClass(filled)).to.equal(true);
  });
});
