import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import DialogActions, { dialogActionsClasses as classes } from '@material-ui/core/DialogActions';

describe('<DialogActions />', () => {
  const render = createClientRender();

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
