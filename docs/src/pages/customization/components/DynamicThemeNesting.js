import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { blue } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

export default function DynamicThemeNesting() {
  const [color, setColor] = React.useState('default');

  const handleChange = (event) => {
    setColor(event.target.checked ? 'blue' : 'default');
  };

  const theme = React.useMemo(() => {
    if (color === 'blue') {
      return createMuiTheme({
        palette: {
          secondary: {
            main: blue[500],
            contrastText: '#fff',
          },
        },
      });
    }
    return createMuiTheme();
  }, [color]);

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={color === 'blue'}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Blue"
      />
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="secondary">
          {'Theme nesting'}
        </Button>
      </ThemeProvider>
    </React.Fragment>
  );
}
