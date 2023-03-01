import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { TabsListProvider, TabsListProviderValue } from '../useTabsList';
import { TabsContext } from '../TabsUnstyled';

describe('<TabUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const testTabsListContext: TabsListProviderValue = {
    registerItem: () => {},
    unregisterItem: () => {},
    getItemIndex: () => 0,
    totalSubitemCount: 1,
    getItemProps() {
      return {
        'aria-disabled': undefined,
        'aria-selected': undefined,
        onClick: () => {},
        onPointerOver: () => {},
        role: 'tab' as const,
      } as any;
    },
    getItemState() {
      return { disabled: false, highlighted: false, selected: false, index: 0 };
    },
    registerHighlightChangeHandler: () => () => {},
    registerSelectionChangeHandler: () => () => {},
    focusManagement: 'DOM',
  };

  describeConformanceUnstyled(<TabUnstyled value="1" />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      const { container, ...other } = render(
        <TabsContext.Provider value={{ idPrefix: '', value: 0, onSelected() {} }}>
          <TabsListProvider value={testTabsListContext}>{node}</TabsListProvider>
        </TabsContext.Provider>,
      );

      return { container, ...other };
    },
    mount: (node: any) => {
      const wrapper = mount(
        <TabsContext.Provider value={{ idPrefix: '', value: 0, onSelected() {} }}>
          <TabsListProvider value={testTabsListContext}>{node}</TabsListProvider>
        </TabsContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'div',
    muiName: 'MuiTab',
    slots: {
      root: {
        expectedClassName: tabUnstyledClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
    ],
  }));
});
