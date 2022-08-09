import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Table' {
  interface TablePropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/TableCell' {
  interface TableCellPropsSizeOverrides {
    large: true;
  }
}

// theme typings should work as expected
const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'large' && {
            paddingBlock: '1rem',
          }),
        }),
      },
    },
  },
});

<Table size="large">
  <TableCell size="large" />
</Table>;
