import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import classes from './scopedCssBaselineClasses';
import ScopedCssBaseline from './ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const mount = createMount();

  describeConformanceV5(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    muiName: 'MuiScopedCssBaseline',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
