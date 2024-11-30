import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Grid2, { grid2Classes as classes } from '@mui/material/Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { expect } from 'chai';
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

  it('should render with the container class', () => {
    render(<Grid2 data-testid="grid" container />);
    expect(screen.getByTestId('grid')).to.have.class(classes.container);
  });

  it('should have container styles passed from theme', () => {
    const theme = createTheme({
      components: {
        MuiGrid2: {
          styleOverrides: {
            container: {
              padding: '11px',
            },
          },
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Grid2 data-testid="grid" container>
          hello
        </Grid2>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('grid')).to.have.style('padding', '11px');
  });
});
