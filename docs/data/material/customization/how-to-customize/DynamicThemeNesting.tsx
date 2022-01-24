import * as React from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

export default function DynamicThemeNesting() {
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
