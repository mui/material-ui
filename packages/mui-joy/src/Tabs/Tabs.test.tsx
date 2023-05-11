import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen, describeJoyColorInversion } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Tabs, { tabsClasses as classes } from '@mui/joy/Tabs';
import SizeTabsContext from './SizeTabsContext';

describe('Joy <Tabs />', () => {
  const { render } = createRenderer();

  describeConformance(<Tabs />, () => ({
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

  describeJoyColorInversion(<Tabs />, { muiName: 'JoyTabs', classes });

  it('prop: variant', () => {
    render(<Tabs variant="outlined" aria-label="Tabs" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.variantOutlined);
  });

  it('prop: color', () => {
    render(<Tabs color="primary" aria-label="Tabs" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.colorPrimary);
  });

  it('prop: size, send the value through context', () => {
    function Child() {
      const size = React.useContext(SizeTabsContext);
      return <div>{size}</div>;
    }
    render(
      <Tabs size="sm">
        <Child />
      </Tabs>,
    );
    expect(screen.getByText('sm')).toBeVisible();
  });

  it('prop: orientation', () => {
    render(<Tabs aria-label="Tabs" orientation="vertical" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.vertical);
  });
});
