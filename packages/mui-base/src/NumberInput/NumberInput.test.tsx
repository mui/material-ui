import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import { expect } from 'chai';
import NumberInput, { numberInputClasses } from '@mui/base/NumberInput';

describe('<NumberInput />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<NumberInput />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiNumberInput',
    slots: {
      root: {
        expectedClassName: numberInputClasses.root,
      },
      input: {
        expectedClassName: numberInputClasses.input,
        testWithElement: 'input',
      },
    },
  }));

  it('should be able to attach input ref passed through props', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<NumberInput slotProps={{ input: { ref: inputRef } }} />);

    expect(inputRef.current).to.deep.equal(getByRole('spinbutton'));
  });
});
