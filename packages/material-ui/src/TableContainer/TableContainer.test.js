import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import TableContainer, { tableContainerClasses as classes } from '@material-ui/core/TableContainer';

describe('<TableContainer />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiTableContainer',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));
});
