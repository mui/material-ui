import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, describeConformanceV5, createClientRender } from 'test/utils';
import NativeSelectInput from './NativeSelectInput';

describe('<NativeSelectInput />', () => {
  const mount = createMount();
  const render = createClientRender();
  const defaultProps = {
    classes: { select: 'select' },
    onChange: () => {},
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

  describeConformanceV5(<NativeSelectInput {...defaultProps} onChange={() => {}} />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLSelectElement,
    muiName: 'MuiNativeSelectInput',
  }));

  it('should render a native select', () => {
    const { container } = render(
      <NativeSelectInput {...defaultProps}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );

    expect(container.firstChild.value).to.equal('10');
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
    const outlined = 'outlined';
    const { container } = render(
      <NativeSelectInput
        {...defaultProps}
        variant="outlined"
        classes={{ ...defaultProps.classes, outlined }}
      />,
    );

    expect(container.firstChild).to.have.class(outlined);
  });

  it('should apply filled class', () => {
    const filled = 'filled';
    const { container } = render(
      <NativeSelectInput
        {...defaultProps}
        variant="filled"
        classes={{ ...defaultProps.classes, filled }}
      />,
    );

    expect(container.firstChild).to.have.class(filled);
  });
});
