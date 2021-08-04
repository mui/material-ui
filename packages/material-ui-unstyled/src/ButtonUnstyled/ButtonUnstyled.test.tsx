import * as React from 'react';
import { createMount, createClientRender, describeConformanceUnstyled } from 'test/utils';
import ButtonUnstyled, { buttonUnstyledClasses } from '@material-ui/unstyled/ButtonUnstyled';

describe('<ButtonUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceUnstyled(<ButtonUnstyled />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiFormControl',
    slots: {
      root: {
        expectedClassName: buttonUnstyledClasses.root,
      },
    },
  }));
});
