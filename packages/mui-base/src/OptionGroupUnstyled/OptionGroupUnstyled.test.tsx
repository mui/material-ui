import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionGroupUnstyled, { optionGroupUnstyledClasses } from '@mui/base/OptionGroupUnstyled';

describe('OptionGroupUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<OptionGroupUnstyled />, () => ({
    inheritComponent: 'li',
    render,
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    muiName: 'MuiOptionGroupUnstyled',
    slots: {
      root: {
        expectedClassName: optionGroupUnstyledClasses.root,
      },
      label: {
        expectedClassName: optionGroupUnstyledClasses.label,
      },
      list: {
        expectedClassName: optionGroupUnstyledClasses.list,
      },
    },
    skip: [
      'ownerStatePropagation', // the component does not have its own state
    ],
  }));
});
