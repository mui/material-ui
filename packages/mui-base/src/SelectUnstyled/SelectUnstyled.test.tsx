import * as React from 'react';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import selectUnstyledClasses from './selectUnstyledClasses';

describe('SelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<SelectUnstyled />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSelect',
    slots: {
      button: {
        expectedClassName: selectUnstyledClasses.button,
      },
    },
  }));
});
