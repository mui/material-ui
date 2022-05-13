import * as React from 'react';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Grid, { gridClasses as classes } from '@mui/joy/Grid';

describe('<Grid />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Grid {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    testStateOverrides: { prop: 'container', value: true, styleKey: 'container' },
    skip: ['componentsProp', 'classesRoot'],
  }));
});
