import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';

describe('OptionUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<OptionUnstyled value={42} />, () => ({
    inheritComponent: 'li',
    render,
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    muiName: 'MuiOptionUnstyled',
    slots: {
      root: {
        expectedClassName: optionUnstyledClasses.root,
      },
    },
  }));
});
