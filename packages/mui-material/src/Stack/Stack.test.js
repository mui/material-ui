import * as React from 'react';
import { describeConformance, createRenderer } from 'test/utils';
import Stack, { stackClasses as classes } from '@mui/material/Stack';

// The main tests are in mui-system Stack folder
describe('<Stack />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Stack {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
    testVariantProps: { direction: 'row' },
    skip: ['componentsProp', 'classesRoot'],
  }));
});
