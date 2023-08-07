import * as React from 'react';
import { useTheme } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

export default function TableCustomized() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <div className="TablePaginationDemo">
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Dessert</th>
              <th>Calories</th>
              <th>Fat</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td style={{ width: 120 }} align="right">
                  {row.calories}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.fat}
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 34 * emptyRows }}>
                <td colSpan={3} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <TablePagination
                className="CustomTablePagination"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </div>
      <Styles />
    </React.Fragment>
  );
}

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .TablePaginationDemo {
        width: 500px;
        max-width: 100%;
      }
      .TablePaginationDemo table {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        border-collapse: collapse;
        width: 100%;
      }

      .TablePaginationDemo td,
      .TablePaginationDemo th {
        border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
        text-align: left;
        padding: 6px;
      }

      .TablePaginationDemo th {
        background-color: ${isDarkMode ? cyan[800] : cyan[50]};
      }
      
      .CustomTablePagination .${classes.spacer} {
        display: none;
      }

      .CustomTablePagination .${classes.toolbar}  {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: center;
        }
      }

      .CustomTablePagination .${classes.selectLabel} {
        margin: 0;
      }

      .CustomTablePagination .${classes.select} {
        padding: 2px;
        border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
        border-radius: 50px;
        background-color: transparent;
      }

      .CustomTablePagination .${classes.select}:hover {
        background-color: ${isDarkMode ? grey[800] : grey[50]};
      }

      .CustomTablePagination .${classes.select}:focus {
        outline: 1px solid ${isDarkMode ? cyan[400] : cyan[200]};
      }

      .CustomTablePagination .${classes.displayedRows} {
        margin: 0;

        @media (min-width: 768px) {
          margin-left: auto;
        }
      }

      .CustomTablePagination .${classes.actions} {
        padding: 2px;
        border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
        border-radius: 50px;
        text-align: center;
      }

      .CustomTablePagination .${classes.actions} > button {
        margin: 0 8px;
        border: transparent;
        border-radius: 2px;
        background-color: transparent;
      }

      .CustomTablePagination .${classes.actions} > button:hover {
        background-color: ${isDarkMode ? grey[800] : grey[50]};
      }

      .CustomTablePagination .${classes.actions} > button:focus {
        outline: 1px solid ${isDarkMode ? cyan[400] : cyan[200]};
      }
      `}
    </style>
  );
}
