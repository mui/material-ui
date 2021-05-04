import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

export default function DynamicThemeNesting() {
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event) => {
    setSuccess(event.target.checked);
  };

  const theme = React.useMemo(() => {
    if (success) {
      return createTheme({
        palette: {
          primary: {
            light: green[300],
            main: green[500],
            dark: green[700],
          },
        },
      });
    }
    return createTheme();
  }, [success]);

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={success}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Success"
      />
      <ThemeProvider theme={theme}>
        <Slider defaultValue={30} sx={{ width: 300, mt: 1 }} />
      </ThemeProvider>
    </React.Fragment>
  );
}
