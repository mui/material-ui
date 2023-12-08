import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import SvgIcon from '@mui/material/SvgIcon';

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function classesTest() {
  const defaultProps = {
    count: 1,
    onPageChange: () => {},
    page: 1,
    rowsPerPage: 1,
  };

  <TablePagination classes={{ actions: 'actions' }} {...defaultProps} />;
  // @ts-expect-error desired
  <TablePagination classes={{ alignCenter: 'center' }} {...defaultProps} />;
}

// slots type test
<TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component="div"
  count={1}
  rowsPerPage={1}
  page={1}
  onPageChange={() => {}}
  showFirstButton
  showLastButton
  slots={{
    actions: {
      firstPageIcon: SampleIcon,
      lastPageIcon: SampleIcon,
      nextPageIcon: SampleIcon,
      previousPageIcon: SampleIcon,
    },
  }}
/>;
