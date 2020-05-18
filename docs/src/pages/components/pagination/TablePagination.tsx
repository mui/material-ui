import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const rows = new Array(8).fill('');

export default function SimpleTablePagination() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TablePagination
        rowsPerPageOptions={[2, 4, rows.length]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
