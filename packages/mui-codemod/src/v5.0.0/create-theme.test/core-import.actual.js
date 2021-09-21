import { createMuiTheme as createAppTheme } from '@material-ui/core';

const lightTheme = createAppTheme();

const darkTheme = createAppTheme({
  palette: {
    mode: 'dark',
  },
});
