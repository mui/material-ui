import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

type SupportedLocales = keyof typeof locales;

export default function Locales() {
  const [locale, setLocale] = React.useState<SupportedLocales>('zhCN');

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider
        theme={(outerTheme) => createTheme(outerTheme, locales[locale])}
      >
        <Autocomplete
          options={Object.keys(locales)}
          getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
          style={{ width: 300 }}
          value={locale}
          disableClearable
          onChange={(event: any, newValue: string | null) => {
            setLocale(newValue as SupportedLocales);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Locale" fullWidth />
          )}
        />
        <TablePagination
          count={2000}
          rowsPerPage={10}
          page={1}
          component="div"
          onPageChange={() => {}}
        />
      </ThemeProvider>
    </Box>
  );
}
