import { createMuiTheme } from '@material-ui/core/styles';
import classes from '../core/classes';

const primary = {
  main: '#3897f0',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
    useNextVariants: true,
  },
  palette: {
    primary,
  },
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
});

const white = {
  text: '#fff',
  primary: 'rgba(255, 255, 255, 0.7)',
  secondary: 'rgba(255, 255, 255, 0.54)',
  disabled: 'rgba(255, 255, 255, 0.38)',
  hint: 'rgba(255, 255, 255, 0.24)',
};

const shade = {
  light: '#f5f5f5',
};

const red = {
  main: '#ff5252',
  dark: '#e04848',
};

const drawer = {
  header: '#232f3e',
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
    color: '#fff',
  },
};

export default {
  ...classes,
  theme,
  drawer,
  primary,
  red,
  shade,
  linked,
  linkInverted,
  white,
};
