import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import MenuItemUnstyled, { menuItemUnstyledClasses } from '@mui/base/MenuItemUnstyled';
import { MenuUnstyledContext } from '@mui/base/MenuUnstyled';

const dummyGetItemState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
  index: 0,
});

const testContext = {
  getItemState: dummyGetItemState,
  getItemProps: () => ({}),
  registerItem: () => {},
  unregisterItem: () => {},
  open: false,
};

describe('MenuItemUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<MenuItemUnstyled />, () => ({
    inheritComponent: 'li',
    render: (node) => {
      return render(
        <MenuUnstyledContext.Provider value={testContext}>{node}</MenuUnstyledContext.Provider>,
      );
    },
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <MenuUnstyledContext.Provider value={testContext}>{node}</MenuUnstyledContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenuItemUnstyled',
    slots: {
      root: {
        expectedClassName: menuItemUnstyledClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped in MenuUnstyledContext
    ],
  }));
});
