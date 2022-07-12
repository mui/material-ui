import * as React from 'react';
import { describeConformance, createRenderer } from 'test/utils';
import Grid2, { grid2Classes as classes } from '@mui/material/Unstable_Grid2';

// The main tests are in mui-system Unstable_Grid folder
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
});
