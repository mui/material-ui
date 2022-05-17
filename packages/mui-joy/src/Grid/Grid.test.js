import * as React from 'react';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Grid, { gridClasses as classes } from '@mui/joy/Grid';

describe('Joy UI <Grid />', () => {
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
    skip: ['componentsProp', 'classesRoot'],
  }));
});
