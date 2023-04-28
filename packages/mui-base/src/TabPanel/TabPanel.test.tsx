import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabPanel, { tabPanelClasses } from '@mui/base/TabPanel';
import { TabsProvider, TabsProviderValue } from '../useTabs';

describe('<TabPanel />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const tabsProviderDefaultValue: TabsProviderValue = {
    value: '1',
    onSelected: () => {},
    registerTabIdLookup() {},
    getTabId: () => '',
    getTabPanelId: () => '',
    getItemIndex: () => 0,
    registerItem: () => ({ id: 0, deregister: () => {} }),
    totalSubitemCount: 1,
    direction: 'ltr',
    orientation: 'horizontal',
    selectionFollowsFocus: false,
  };

  describeConformanceUnstyled(<TabPanel value="1" />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      const { container, ...other } = render(
        <TabsProvider value={tabsProviderDefaultValue}>{node}</TabsProvider>,
      );

      return { container, ...other };
    },
    mount: (node: any) => {
      const wrapper = mount(<TabsProvider value={tabsProviderDefaultValue}>{node}</TabsProvider>);
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiTabPanel',
    slots: {
      root: {
        expectedClassName: tabPanelClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
    ],
  }));
});
