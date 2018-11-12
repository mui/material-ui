import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#18202c',
      },
    },
    MuiButton: {
      root: {},
      label: {
        textTransform: 'initial',
      },
      contained: {
        boxShadow: 'none',
      },
    },
    MuiPrivateTabIndicator: {
      root: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      },
      colorSecondary: {
        backgroundColor: '#fff',
      },
    },
  },
});

export default theme;
