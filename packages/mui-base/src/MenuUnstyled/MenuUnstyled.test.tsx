import * as React from 'react';
import MenuUnstyled, { menuUnstyledClasses } from '@mui/base/MenuUnstyled';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';

describe('MenuUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<MenuUnstyled />, () => ({
    inheritComponent: 'ul',
    render,
    mount,
    refInstanceof: window.HTMLUListElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenuUnstyled',
    slots: {
      root: {
        expectedClassName: menuUnstyledClasses.root,
      },
    },
  }));
});
