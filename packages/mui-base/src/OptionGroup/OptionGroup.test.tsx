import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionGroup, { optionGroupClasses } from '@mui/base/OptionGroup';

describe('<OptionGroup />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<OptionGroup />, () => ({
    inheritComponent: 'li',
    render,
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    muiName: 'MuiOptionGroup',
    slots: {
      root: {
        expectedClassName: optionGroupClasses.root,
      },
      label: {
        expectedClassName: optionGroupClasses.label,
      },
      list: {
        expectedClassName: optionGroupClasses.list,
      },
    },
    skip: [
      'ownerStatePropagation', // the component does not have its own state
    ],
  }));
});
