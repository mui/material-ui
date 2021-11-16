import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import DialogActions, { dialogActionsClasses as classes } from '@mui/material/DialogActions';

describe('<DialogActions />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiDialogActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
