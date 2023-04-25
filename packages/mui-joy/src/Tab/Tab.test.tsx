import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen, describeJoyColorInversion } from 'test/utils';
import { TabsProps } from '@mui/base/Tabs';
import useTabs, { TabsProvider as BaseTabsProvider } from '@mui/base/useTabs';
import useTabsList, { TabsListProvider as BaseTabsListProvider } from '@mui/base/useTabsList';
import { ThemeProvider } from '@mui/joy/styles';
import Tab, { tabClasses as classes } from '@mui/joy/Tab';

function TabsListProvider({ children }: React.PropsWithChildren<{}>) {
  const { contextValue: tabsListContextValue } = useTabsList({
    ref: { current: null },
  });
  return <BaseTabsListProvider value={tabsListContextValue}>{children}</BaseTabsListProvider>;
}

function TabsProvider({ children, ...props }: TabsProps) {
  const { contextValue: tabsContextValue } = useTabs(props);

  return (
    <BaseTabsProvider value={tabsContextValue}>
      <TabsListProvider>{children}</TabsListProvider>
    </BaseTabsProvider>
  );
}

describe('Joy <Tab />', () => {
  const { render } = createRenderer();

  describeConformance(<Tab />, () => ({
    classes,
    inheritComponent: 'button',
    render: (node) => render(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
    wrapMount: (mount) => (node) => mount(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
    ThemeProvider,
    muiName: 'JoyTab',
    refInstanceof: window.HTMLButtonElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot', 'reactTestRenderer'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<Tab />, {
    muiName: 'JoyTab',
    classes,
    wrapper: (node) => <TabsProvider defaultValue={0}>{node}</TabsProvider>,
  });

  it('prop: variant', () => {
    render(
      <TabsProvider>
        <Tab variant="outlined" />
      </TabsProvider>,
    );
    expect(screen.getByRole('tab')).to.have.class(classes.variantOutlined);
  });

  it('prop: color', () => {
    render(
      <TabsProvider>
        <Tab color="primary" />
      </TabsProvider>,
    );
    expect(screen.getByRole('tab')).to.have.class(classes.colorPrimary);
  });

  it('prop: disabled', () => {
    render(
      <TabsProvider>
        <Tab disabled />
      </TabsProvider>,
    );
    expect(screen.getByRole('tab')).to.have.class(classes.disabled);
    expect(screen.getByRole('tab')).to.have.attribute('aria-disabled');
  });
});
