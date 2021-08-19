import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
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

type Data = typeof data extends Array<infer T> ? T : never;

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function formatSize(size: number) {
  const kb = size / 1000;
  if (kb < 1000) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1000).toFixed(0)} MB`;
}

export default function BasicTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };
  const headCells = [
    { id: 'name', label: 'Folder Name', TableCellProps: {} },
    { id: 'size', label: 'Size', TableCellProps: { align: 'right' } },
  ] as const;
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        maxWidth: 260,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : '#fff',
      }}
    >
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
                  sx={{ fontSize: '0.75rem' }}
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
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Folder
                    sx={{
                      mr: 1,
                      color: (theme: Theme) =>
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary[700]
                          : theme.palette.grey[300],
                    }}
                    fontSize="small"
                  />{' '}
                  {row.name}
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ color: 'success.main' }}>
                {formatSize(row.size)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
