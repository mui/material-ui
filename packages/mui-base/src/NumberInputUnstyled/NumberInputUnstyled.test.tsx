import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import { expect } from 'chai';
import NumberInputUnstyled, { numberInputUnstyledClasses } from '@mui/base/NumberInputUnstyled';

describe('<NumberInputUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<NumberInputUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiNumberInput',
    slots: {
      root: {
        expectedClassName: numberInputUnstyledClasses.root,
      },
      input: {
        expectedClassName: numberInputUnstyledClasses.input,
        testWithElement: 'input',
      },
    },
  }));

  it('should be able to attach input ref passed through props', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<NumberInputUnstyled slotProps={{ input: { ref: inputRef } }} />);

    expect(inputRef.current).to.deep.equal(getByRole('spinbutton'));
  });
});
