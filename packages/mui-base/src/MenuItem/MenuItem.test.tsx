import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { MenuProvider } from '@mui/base/useMenu';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

const dummyGetItemState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
  index: 0,
  focusable: true,
});

const testContext = {
  dispatch: () => {},
  getItemIndex: () => 0,
  getItemProps: () => ({}),
  getItemState: dummyGetItemState,
  open: false,
  registerItem: () => ({ id: '', deregister: () => {} }),
  totalSubitemCount: 0,
};

describe('<MenuItem />', () => {
  const { render } = createRenderer();

  describeConformanceUnstyled(<MenuItem />, () => ({
    inheritComponent: 'li',
    render: (node) => {
      return render(<MenuProvider value={testContext}>{node}</MenuProvider>);
    },
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    slots: {
      root: {
        expectedClassName: menuItemClasses.root,
      },
    },
    skip: ['componentProp'],
  }));
});
