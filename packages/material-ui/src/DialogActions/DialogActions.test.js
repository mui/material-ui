import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import DialogActions from './DialogActions';
import classes from './dialogActionsClasses';

describe('<DialogActions />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiDialogActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
