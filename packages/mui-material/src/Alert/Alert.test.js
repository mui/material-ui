import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import Alert, { alertClasses as classes } from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

describe('<Alert />', () => {
  const { render } = createRenderer();

  describeConformance(<Alert />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAlert',
    testVariantProps: { variant: 'standard', color: 'success' },
    testDeepOverrides: { slotName: 'message', slotClassName: classes.message },
    skip: ['componentsProp'],
  }));
});
