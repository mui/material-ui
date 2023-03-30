import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { TabsListProvider, TabsListProviderValue } from '../useTabsList';
import { TabsContext } from '../TabsUnstyled';

describe('<TabUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const testTabsListContext: TabsListProviderValue = {
    dispatch: () => {},
    registerItem: () => ({ id: 0, unregister: () => {} }),
    getItemIndex: () => 0,
    totalSubitemCount: 1,
    getItemState() {
      return { disabled: false, highlighted: false, selected: false, focusable: true, index: 0 };
    },
    registerHighlightChangeHandler: () => () => {},
    registerSelectionChangeHandler: () => () => {},
  };

  describeConformanceUnstyled(<TabUnstyled value="1" />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      const { container, ...other } = render(
        <TabsContext.Provider
          value={{
            value: 0,
            onSelected() {},
            registerTabIdLookup() {},
            getTabId: () => '',
            getTabPanelId: () => '',
          }}
        >
          <TabsListProvider value={testTabsListContext}>{node}</TabsListProvider>
        </TabsContext.Provider>,
      );

      return { container, ...other };
    },
    mount: (node: any) => {
      const wrapper = mount(
        <TabsContext.Provider
          value={{
            value: 0,
            onSelected() {},
            registerTabIdLookup() {},
            getTabId: () => '',
            getTabPanelId: () => '',
          }}
        >
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
