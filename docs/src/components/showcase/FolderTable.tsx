import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
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

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
const primaryDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
  800: '#001E3C',
  900: '#0A1929',
};
const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#96A3B0',
  700: '#8796A5',
  800: '#5A6978',
  900: '#3D4752',
};

export default function BasicTable() {
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://next.material-ui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary,
          grey,
          ...(mode === 'light' && {
            text: {
              primary: grey[800],
              secondary: grey[600],
            },
          }),
          divider: mode === 'dark' ? primaryDark[500] : grey[200],
          success: {
            main: mode === 'dark' ? '#1AA251' : '#178D46',
          },
          background: {
            paper: mode === 'dark' ? primaryDark[800] : '#fff',
          },
        },
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderColor: mode === 'dark' ? primaryDark[500] : grey[200],
              },
              sizeSmall: {
                padding: '0.625rem 1rem',
              },
            },
          },
        },
      }),
    [mode],
  );
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
                      sx={{ mr: 1 }}
                      fontSize="small"
                      htmlColor={mode === 'dark' ? primary[700] : grey[300]}
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
    </ThemeProvider>
  );
}
