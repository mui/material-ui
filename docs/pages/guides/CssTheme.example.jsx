import React, { useState } from 'react';
import lime from '@material-ui/core/colors/lime';
import { TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: lime,
  },
});

function CssThemeExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        label="Lime DateTimePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </ThemeProvider>
  );
}

export default CssThemeExample;
