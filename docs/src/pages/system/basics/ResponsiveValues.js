import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${typeof key === 'number' ? key : values[key]}px)`,
  },
};

export default () => {
  // Pass this theme object to your theme provider
  createMuiTheme(theme);
  // No React components to demo here, return null
  return null;
};
