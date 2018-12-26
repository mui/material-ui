import { createMuiTheme } from '@material-ui/core/styles';
import classes from '../core/classes';

const theme = createMuiTheme();

export const muiBaseTheme = theme;

export const white = {
  text: '#ffffff',
  primary: 'rgba(255, 255, 255, 0.7)',
  secondary: 'rgba(255, 255, 255, 0.54)',
  disabled: 'rgba(255, 255, 255, 0.38)',
  hint: 'rgba(255, 255, 255, 0.24)',
};

export const shade = {
  light: '#f5f5f5',
};

export const red = {
  main: '#ff5252',
  dark: '#e04848',
};

export const primary = {
  main: '#3897f0',
};

export const drawer = {
  header: '#232f3e',
};

export const linked = {
  cursor: 'pointer',
  color: primary.main,
  display: 'inline-block',
};

export const shape = {
  borderRadius: theme.spacing.unit / 2,
};

export const linkInverted = {
  ...linked,
  color: white.primary,
  '&:hover': {
    color: theme.palette.common.white,
  },
};

export default {
  ...classes,
  drawer,
  muiBaseTheme,
  primary,
  red,
  shade,
  linked,
  linkInverted,
  white,
  shape,
};
