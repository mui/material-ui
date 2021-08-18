import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import TableContainer, { tableContainerClasses as classes } from '@material-ui/core/TableContainer';

describe('<TableContainer />', () => {
  const render = createClientRender();

  describeConformance(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTableContainer',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));
});
