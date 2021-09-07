import * as React from 'react';
import { createMount, createClientRender, describeConformanceUnstyled } from 'test/utils';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';

describe('<ButtonUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceUnstyled(<ButtonUnstyled />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiButton',
    slots: {
      root: {
        expectedClassName: buttonUnstyledClasses.root,
      },
    },
  }));
});
