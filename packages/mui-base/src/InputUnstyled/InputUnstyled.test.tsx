import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';

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
});
