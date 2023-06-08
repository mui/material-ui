import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen, describeJoyColorInversion } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ScrollableTabs, { tabsClasses as classes } from '@mui/joy/Tabs';
import SizeTabsContext from './SizeTabsContext';

describe('Joy <ScrollableTabs />', () => {
  const { render } = createRenderer();

  describeConformance(<ScrollableTabs />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyTabs',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot', 'reactTestRenderer'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<ScrollableTabs />, { muiName: 'JoyTabs', classes });

  it('prop: variant', () => {
    render(<ScrollableTabs variant="outlined" aria-label="ScrollableTabs" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.variantOutlined);
  });

  it('prop: color', () => {
    render(<ScrollableTabs color="primary" aria-label="ScrollableTabs" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.colorPrimary);
  });

  it('prop: size, send the value through context', () => {
    function Child() {
      const size = React.useContext(SizeTabsContext);
      return <div>{size}</div>;
    }
    render(
      <ScrollableTabs size="sm">
        <Child />
      </ScrollableTabs>,
    );
    expect(screen.getByText('sm')).toBeVisible();
  });

  it('prop: orientation', () => {
    render(<ScrollableTabs aria-label="ScrollableTabs" orientation="vertical" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.vertical);
  });
});
