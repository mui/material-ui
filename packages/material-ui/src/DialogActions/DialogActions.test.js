import * as React from 'react';
import { createMount, describeConformance } from 'test/utils';
import DialogActions from './DialogActions';
import classes from './dialogActionsClasses';

describe('<DialogActions />', () => {
  const mount = createMount();

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiDialogActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
