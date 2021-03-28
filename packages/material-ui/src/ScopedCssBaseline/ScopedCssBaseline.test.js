import * as React from 'react';
import { createMount, describeConformanceV5, createClientRender } from 'test/utils';
import classes from './scopedCssBaselineClasses';
import ScopedCssBaseline from './ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    render,
    muiName: 'MuiScopedCssBaseline',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentProp'],
  }));
});
