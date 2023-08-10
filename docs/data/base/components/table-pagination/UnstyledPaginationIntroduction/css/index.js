import * as React from 'react';
import { useTheme } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

export default function UnstyledPaginationIntroduction() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <div className="TablePaginationIntroductionDemo">
        <table aria-label="custom pagination table">
          <tfoot>
            <tr>
              <TablePagination
                className="CustomTablePagination"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={13}
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
      .TablePaginationIntroductionDemo {
        width: 500px;
        max-width: 100%;
      }  
      th {
        background-color: ${isDarkMode ? grey[900] : '#fff'};
      }
      .TablePaginationIntroductionDemo table {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        width: 100%;
        background-color: ${isDarkMode ? grey[900] : '#fff'};
        box-shadow: 0px 2px 16px ${isDarkMode ? grey[900] : grey[200]};
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
      }

      .TablePaginationIntroductionDemo td,
      .TablePaginationIntroductionDemo th {
        padding: 16px;
      }

      .TablePaginationIntroductionDemo th {
        background-color: ${isDarkMode ? grey[900] : '#fff'};
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
        padding: 2px 6px;
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
        padding: 2px 6px;
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

      .CustomTablePagination .${classes.actions} > button:disabled {
        opacity: 0.7;
      }
      `}
    </style>
  );
}
