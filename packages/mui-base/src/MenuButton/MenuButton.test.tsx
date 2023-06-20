import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import MenuButton from '@mui/base/MenuButton';

describe('<MenuButton />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<MenuButton />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiMenuButton',
    slots: {
      root: {
        expectedClassName: '',
        testWithElement: null,
      },
    },
    skip: [],
  }));
});
