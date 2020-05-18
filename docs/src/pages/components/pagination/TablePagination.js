import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(color, rgb, hex) {
  return { color, rgb, hex };
}

const rows = [
  createData('Aqua', '0, 255, 255', '#00FFFF'),
  createData('Blue', '0, 0, 255', '#0000FF'),
  createData('Dodger Blue', '30, 144, 255', '#1E90FF'),
  createData('Light Sky Blue', '135, 206, 250', '#87CEFA'),
  createData('Navy', '0, 0, 128', '#000080'),
  createData('Slate Blue', '106, 90, 205', '#6A5ACD'),
  createData('Steel Blue', '70, 130, 180', '#4682B4'),
  createData('Sky Blue', '135, 206, 235', '#87CEEB'),
];

export default function SimpleTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Color Name</TableCell>
            <TableCell align="right">RGB</TableCell>
            <TableCell align="right">HEX</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.color}>
              <TableCell align="left">{row.color}</TableCell>
              <TableCell align="right">{row.rgb}</TableCell>
              <TableCell align="right">{row.hex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[2, 4, rows.length]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
