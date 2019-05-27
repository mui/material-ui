import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

function classesTest() {
  const defaultProps = {
    count: 1,
    onChangePage: () => {},
    page: 1,
    rowsPerPage: 1,
  };

  // undesired
  <TablePagination classes={{ actions: 'actions' }} {...defaultProps} />; // $ExpectError
  // desired but unhelpful message
  <TablePagination classes={{ alignCenter: 'center' }} {...defaultProps} />; // $ExpectError
}
