import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import TableContainer from './TableContainer';
import classes from './tableContainerClasses';

describe('<TableContainer />', () => {
  const mount = createMount();

  describeConformanceV5(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    muiName: 'MuiTableContainer',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));
});
