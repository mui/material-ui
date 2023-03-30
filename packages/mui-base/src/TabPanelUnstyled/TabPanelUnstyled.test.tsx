import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabPanelUnstyled, { tabPanelUnstyledClasses } from '@mui/base/TabPanelUnstyled';
import { TabsProvider, TabsProviderValue } from '../useTabs';

describe('<TabPanelUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const tabsProviderDefaultValue: TabsProviderValue = {
    value: '1',
    onSelected: () => {},
    registerTabIdLookup() {},
    getTabId: () => '',
    getTabPanelId: () => '',
    getItemIndex: () => 0,
    registerItem: () => ({ id: 0, unregister: () => {} }),
    totalSubitemCount: 1,
    direction: 'ltr',
    orientation: 'horizontal',
    selectionFollowsFocus: false,
  };

  describeConformanceUnstyled(<TabPanelUnstyled value="1" />, () => ({
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
        expectedClassName: tabPanelUnstyledClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
    ],
  }));
});
