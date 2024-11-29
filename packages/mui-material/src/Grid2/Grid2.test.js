import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import Grid2, { grid2Classes as classes } from '@mui/material/Grid2';
import describeConformance from '../../test/describeConformance';

// The main tests are in mui-system Grid folder
describe('<Grid2 />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Grid2 {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiGrid2',
    testVariantProps: { container: true, spacing: 5 },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should not crash with theme scoping', () => {
    expect(() =>
      render(
        <ThemeProvider theme={{ [THEME_ID]: createTheme() }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>6</Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>6</Grid2>
          </Grid2>
        </ThemeProvider>,
      ),
    ).not.throw();
  });
});
