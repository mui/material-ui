import * as React from 'react';
import { act, createRenderer } from '@mui/internal-test-utils';
import { Tab } from '@mui/base/Tab';
import { Tabs, TabsContext } from '@mui/base/Tabs';
import { TabsList, tabsListClasses } from '@mui/base/TabsList';
import { expect } from 'chai';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<TabsList />', () => {
  const { render } = createRenderer();

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
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    slots: {
      root: {
        expectedClassName: tabsListClasses.root,
      },
    },
    skip: ['componentProp'],
  }));

  describe('accessibility attributes', () => {
    it('sets the aria-selected attribute on the selected tab', () => {
      const { getByText } = render(
        <Tabs defaultValue={1}>
          <TabsList>
            <Tab value={1}>Tab 1</Tab>
            <Tab value={2}>Tab 2</Tab>
            <Tab value={3}>Tab 3</Tab>
          </TabsList>
        </Tabs>,
      );

      const tab1 = getByText('Tab 1');
      const tab2 = getByText('Tab 2');
      const tab3 = getByText('Tab 3');

      expect(tab1).to.have.attribute('aria-selected', 'true');
      expect(tab2).to.have.attribute('aria-selected', 'false');
      expect(tab3).to.have.attribute('aria-selected', 'false');

      act(() => {
        tab2.click();
      });

      expect(tab1).to.have.attribute('aria-selected', 'false');
      expect(tab2).to.have.attribute('aria-selected', 'true');
      expect(tab3).to.have.attribute('aria-selected', 'false');

      act(() => {
        tab3.click();
      });

      expect(tab1).to.have.attribute('aria-selected', 'false');
      expect(tab2).to.have.attribute('aria-selected', 'false');
      expect(tab3).to.have.attribute('aria-selected', 'true');

      act(() => {
        tab1.click();
      });

      expect(tab1).to.have.attribute('aria-selected', 'true');
      expect(tab2).to.have.attribute('aria-selected', 'false');
      expect(tab3).to.have.attribute('aria-selected', 'false');
    });
  });
});
