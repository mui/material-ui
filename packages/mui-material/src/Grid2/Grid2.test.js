import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
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
});
