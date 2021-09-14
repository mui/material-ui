import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

export default function Direction() {
  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <TextField placeholder="Name" variant="standard" />
        <input type="text" placeholder="Name" />
      </div>
    </ThemeProvider>
  );
}
