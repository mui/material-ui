import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Rating from '@material-ui/lab/Rating';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

export default function Locales() {
  return (
    <div>
      <ThemeProvider theme={(outerTheme) => createMuiTheme(outerTheme, zhCN)}>
        <TablePagination
          count={20}
          rowsPerPage={10}
          page={1}
          component="div"
          onChangePage={() => {}}
        />
        <Autocomplete
          options={[]}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="自动完成" variant="outlined" fullWidth />
          )}
        />
        <Rating value={1} name="locales" />
      </ThemeProvider>
    </div>
  );
}
