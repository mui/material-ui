import { Button } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const lightTheme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
