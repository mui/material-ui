import * as React from 'react';
import { createMount, createRenderer } from '@mui-internal/test-utils';
import { Tab, tabClasses } from '@mui/base/Tab';
import { TabsListProvider, TabsListProviderValue } from '../useTabsList';
import { TabsContext } from '../Tabs';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Tab />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const testTabsListContext: TabsListProviderValue = {
    dispatch: () => {},
    registerItem: () => ({ id: 0, deregister: () => {} }),
    getItemIndex: () => 0,
    totalSubitemCount: 1,
    getItemState() {
      return { disabled: false, highlighted: false, selected: false, focusable: true, index: 0 };
    },
  };

  describeConformanceUnstyled(<Tab value="1" />, () => ({
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
    slots: {
      root: {
        expectedClassName: tabClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
      'componentProp',
    ],
  }));
});
