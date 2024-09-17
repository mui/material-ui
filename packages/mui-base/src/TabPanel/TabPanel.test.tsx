import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { TabPanel, tabPanelClasses } from '@mui/base/TabPanel';
import { TabsProvider, TabsProviderValue } from '../useTabs';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<TabPanel />', () => {
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
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    slots: {
      root: {
        expectedClassName: tabPanelClasses.root,
      },
    },
    skip: ['componentProp'],
  }));
});
