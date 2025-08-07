import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Tabs, { tabsClasses as classes } from '@mui/joy/Tabs';
import SizeTabsContext from './SizeTabsContext';
import describeConformance from '../../test/describeConformance';

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
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('prop: variant', () => {
    const screen = render(<Tabs variant="outlined" aria-label="Tabs" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.variantOutlined);
  });

  it('prop: color', () => {
    const screen = render(<Tabs color="primary" aria-label="Tabs" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.colorPrimary);
  });

  it('prop: size, send the value through context', () => {
    function Child() {
      const size = React.useContext(SizeTabsContext);
      return <div>{size}</div>;
    }
    const screen = render(
      <Tabs size="sm">
        <Child />
      </Tabs>,
    );
    expect(screen.getByText('sm')).toBeVisible();
  });

  it('prop: orientation', () => {
    const screen = render(<Tabs aria-label="Tabs" orientation="vertical" />);
    expect(screen.getByLabelText('Tabs')).to.have.class(classes.vertical);
  });
});
