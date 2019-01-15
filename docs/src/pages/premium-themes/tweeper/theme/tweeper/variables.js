import { createMuiTheme } from '@material-ui/core/styles';
import classes from '../core/classes';

const primary = {
  main: '#1da1f2',
  dark: '#1a91da',
};

const theme = createMuiTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 500,
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary,
  },
  spacing: {
    unit: 4,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

const white = {
  text: '#ffffff',
  primary: 'rgba(255, 255, 255, 0.7)',
  secondary: 'rgba(255, 255, 255, 0.54)',
  disabled: 'rgba(255, 255, 255, 0.38)',
  hint: 'rgba(255, 255, 255, 0.24)',
};

const red = {
  main: '#ff5252',
  dark: '#e04848',
};

const linked = {
  cursor: 'pointer',
  color: primary.main,
  display: 'inline-block',
};

const linkInverted = {
  ...linked,
  color: white.primary,
  '&:hover': {
    color: theme.palette.common.white,
  },
};

export default {
  ...classes,
  theme,
  primary,
  red,
  linked,
  linkInverted,
  white,
};
