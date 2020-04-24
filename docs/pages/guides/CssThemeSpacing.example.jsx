import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  spacing: 2,
});

function CssThemeExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <ThemeProvider theme={muiTheme}>
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        label="2px spacing"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </ThemeProvider>
  );
}

export default CssThemeExample;
