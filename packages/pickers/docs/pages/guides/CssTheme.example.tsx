import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { lime } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: lime,
  },
});

export default function CssThemeExample() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Lime DateTimePicker"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </ThemeProvider>
  );
}
