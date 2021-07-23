import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { visuallyHidden } from '@material-ui/utils';

import Folder from '@material-ui/icons/Folder';

const data = [
  { name: 'Fonts', size: 125600 },
  { name: 'Libs', size: 134000000 },
  { name: 'Source', size: 200000000 },
  { name: 'Dependencies', size: 44000000 },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function formatSize(size) {
  const kb = size / 1000;
  if (kb < 1000) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1000).toFixed(0)} MB`;
}

const theme = createTheme({
  palette: {
    text: {
      primary: '#5A6978',
      secondary: '#96A3B0',
    },
    divider: '#E5E8EC',
  },
  typography: {
    fontFamily: [
      '"PlusJakartaSans"',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#E5E8EC',
        },
        sizeSmall: {
          padding: '10px 16px',
        },
      },
    },
  },
});

export default function BasicTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const headCells = [
    { id: 'name', label: 'Folder Name', TableCellProps: {} },
    { id: 'size', label: 'Size', TableCellProps: { align: 'right' } },
  ];

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 260 }}>
        <Table aria-label="folder table" size="small">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  {...headCell.TableCellProps}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <Folder sx={{ mr: 1 }} fontSize="small" htmlColor="#D7DCE1" />{' '}
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="right">{formatSize(row.size)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
