import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TablePagination } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
}));

export default function DataTable({columns, rows, dense, stickyHeader, height, pagination}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const presentedRows = pagination ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows;

  return (
    <div>
      <div style={{height, overflowY: 'scroll'}}>
        <Table className={classes.table} size={dense ? 'small' : 'medium'} stickyHeader={stickyHeader}>
          <EnhancedTableHead columns={columns} />
          <TableBody>
            {presentedRows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={(e, newPage) => setPage(newPage)}
        onChangeRowsPerPage={e => setRowsPerPage(e.target.value)}
      />}
    </div>
  );
}
