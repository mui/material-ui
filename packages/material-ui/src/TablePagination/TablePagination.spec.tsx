import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

function classesTest() {
  const defaultProps = {
    count: 1,
    onChangePage: () => {},
    page: 1,
    rowsPerPage: 1,
  };

  <TablePagination classes={{ actions: 'actions' }} {...defaultProps} />;
  // @ts-expect-error desired
  <TablePagination classes={{ alignCenter: 'center' }} {...defaultProps} />;
}
