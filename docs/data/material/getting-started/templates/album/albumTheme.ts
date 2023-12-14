import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

const albumTheme = createTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000',
    },
    secondary: {
      light: '#00FF6F',
      main: '#00FF6F',
      dark: '#00FF6F',
    },
    warning: {
      main: '#F7B538',
      dark: '#F79F00',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: '#00FF6F',
      main: '#00FF6F',
      dark: '#00FF6F',
    },
    background: {
      default: '#F7F8FA',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border:'1px solid',
          borderColor:'rgba(0,0,0,0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          border:'1px solid',
          borderColor:'rgba(0,0,0,0.1)'
        },
      },
    },
    },
});

const fontHeader = {
  color: albumTheme.palette.text.primary,
  fontWeight: albumTheme.typography.fontWeightMedium,
  fontFamily: "'Inter', sans-serif",
  textTransform: 'uppercase',
};

const theme = {
  ...albumTheme,
  palette: {
    ...albumTheme.palette,
    background: {
      ...albumTheme.palette.background,
      default: albumTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...albumTheme.typography,
    fontHeader,
    h1: {
      ...albumTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...albumTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...albumTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...albumTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...albumTheme.typography.h5,
      fontSize: 20,
      fontWeight: albumTheme.typography.fontWeightLight,
    },
    h6: {
      ...albumTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...albumTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...albumTheme.typography.body2,
      fontWeight: albumTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...albumTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
