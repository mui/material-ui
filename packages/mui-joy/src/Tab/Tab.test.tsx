import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { TabsContext, useTabs, TabsUnstyledProps } from '@mui/base/TabsUnstyled';
import { ThemeProvider } from '@mui/joy/styles';
import Tab, { tabClasses as classes } from '@mui/joy/Tab';

const TabsProvider = ({ children, ...props }: TabsUnstyledProps) => {
  const { tabsContextValue } = useTabs(props);
  return <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>;
};

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
    skip: ['componentsProp', 'classesRoot', 'reactTestRenderer'],
  }));

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
    expect(screen.getByRole('tab')).to.have.attribute('disabled');
  });
});
