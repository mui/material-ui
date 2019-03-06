import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

function Direction() {
  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <TextField placeholder="Name" />
        <input type="text" placeholder="Name" />
      </div>
    </ThemeProvider>
  );
}

export default Direction;
