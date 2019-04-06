import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#03dac6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#e9edf1',
    },
  },
});

export default theme;
