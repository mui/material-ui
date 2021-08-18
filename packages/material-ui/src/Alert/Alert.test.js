import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import Alert, { alertClasses as classes } from '@material-ui/core/Alert';
import Paper from '@material-ui/core/Paper';

describe('<Alert />', () => {
  const render = createClientRender();

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
