import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { TabsContext, useTabs, TabsUnstyledProps } from '@mui/base/TabsUnstyled';
import { ThemeProvider } from '@mui/joy/styles';
import Tabs from '@mui/joy/Tabs';
import TabPanel, { tabPanelClasses as classes } from '@mui/joy/TabPanel';

const TabsProvider = ({ children, ...props }: TabsUnstyledProps) => {
  const { tabsContextValue } = useTabs(props);
  return <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>;
};

describe('Joy <TabPanel />', () => {
  const { render } = createRenderer();

  describeConformance(<TabPanel value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    render: (node) => render(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
    wrapMount: (mount) => (node) => mount(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
    ThemeProvider,
    muiName: 'JoyTabPanel',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { size: 'sm' },
    skip: ['componentsProp', 'classesRoot', 'reactTestRenderer'],
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
