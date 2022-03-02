import * as React from 'react';
import { expect } from 'chai';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';
import FormControlUnstyled from '@mui/base/FormControlUnstyled';

describe('<InputUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<InputUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiInput',
    slots: {
      root: {
        expectedClassName: inputUnstyledClasses.root,
      },
      input: {
        expectedClassName: inputUnstyledClasses.input,
        testWithElement: 'input',
      },
    },
  }));

  it('inherit focused from FormControl', () => {
    const { container } = render(
      <FormControlUnstyled focused>
        <InputUnstyled />
      </FormControlUnstyled>,
    );
    expect(container.firstChild?.firstChild).to.have.class(inputUnstyledClasses.focused);
  });
});
