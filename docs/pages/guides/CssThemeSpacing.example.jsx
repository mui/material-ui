import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { DateTimePicker } from '@material-ui/pickers';

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

function CssThemeExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <DateTimePicker label="2px spacing" value={selectedDate} onChange={handleDateChange} />
    </ThemeProvider>
  );
}

export default CssThemeExample;
