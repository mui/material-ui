import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import TablePaginationActions, {
  tablePaginationActionsClasses as classes,
} from '@mui/material/TablePaginationActions';
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
      count={100}
      onPageChange={() => {}}
      page={1}
      rowsPerPage={10}
      showFirstButton
      showLastButton
    />,
    () => ({
      inheritComponent: 'div',
      render,
      classes,
      muiName: 'MuiTablePaginationActions',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentsProp', 'componentProp', 'themeVariants'],
    }),
  );
});
