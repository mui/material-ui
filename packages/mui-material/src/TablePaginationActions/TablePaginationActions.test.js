import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import TablePaginationActions from '@mui/material/TablePaginationActions';
import describeConformance from '../../test/describeConformance';

describe('<TablePaginationActions />', () => {
  const { render } = createRenderer();

  describeConformance(
    <TablePaginationActions
      getItemAriaLabel={(type) => {
        if (type === 'first') {
          return 'first';
        }
        if (type === 'last') {
          return 'last';
        }
        if (type === 'next') {
          return 'next';
        }
        return 'previous';
      }}
    />,
    () => ({
      inheritComponent: 'div',
      render,
      muiName: 'MuiTablePaginationActions',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentsProp', 'componentProp', 'themeVariants'],
    }),
  );
});
