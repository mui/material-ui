import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import { TabsContext } from '@mui/base/Tabs';
import TabsList, { tabsListClasses } from '@mui/base/TabsList';

describe('<TabsList />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  describeConformanceUnstyled(<TabsList />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      const { container, ...other } = render(
        <TabsContext.Provider
          value={{
            value: '1',
            onSelected: () => {},
            registerTabIdLookup() {},
            getTabId: () => '',
            getTabPanelId: () => '',
          }}
        >
          {node}
        </TabsContext.Provider>,
      );

      return { container, ...other };
    },
    mount: (node: any) => {
      const wrapper = mount(
        <TabsContext.Provider
          value={{
            value: '1',
            onSelected: () => {},
            registerTabIdLookup() {},
            getTabId: () => '',
            getTabPanelId: () => '',
          }}
        >
          {node}
        </TabsContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiTabPanel',
    slots: {
      root: {
        expectedClassName: tabsListClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
    ],
  }));
});
