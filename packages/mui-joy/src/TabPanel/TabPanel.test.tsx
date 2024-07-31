import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { TabsProps } from '@mui/base/Tabs';
import { useTabs, TabsProvider as BaseTabsProvider } from '@mui/base/useTabs';
import { ThemeProvider } from '@mui/joy/styles';
import Tabs from '@mui/joy/Tabs';
import TabPanel, { tabPanelClasses as classes } from '@mui/joy/TabPanel';
import describeConformance from '../../test/describeConformance';

function TabsProvider({ children, ...props }: TabsProps) {
  const { contextValue } = useTabs(props);
  return <BaseTabsProvider value={contextValue}>{children}</BaseTabsProvider>;
}

describe('Joy <TabPanel />', () => {
  const { render } = createRenderer();

  describeConformance(<TabPanel value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    render: (node) => render(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
    ThemeProvider,
    muiName: 'JoyTabPanel',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { size: 'sm' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('size', () => {
    it('uses size from Tabs', () => {
      render(
        <Tabs defaultValue={0} size="sm">
          <TabPanel value={0} />
        </Tabs>,
      );
      expect(screen.getByRole('tabpanel')).to.have.class(classes.sizeSm);
    });

    it('uses prop if provided', () => {
      render(
        <Tabs defaultValue={0} size="sm">
          <TabPanel value={0} size="md" />
        </Tabs>,
      );
      expect(screen.getByRole('tabpanel')).to.have.class(classes.sizeMd);
    });
  });
});
