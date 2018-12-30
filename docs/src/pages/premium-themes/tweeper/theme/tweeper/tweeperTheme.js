import variables, { primary, muiBaseTheme } from './variables';

const req = require.context('./components', true, /.js$/);
let overrides = {};

req.keys().forEach(filename => {
  overrides = {
    ...overrides,
    ...req(filename).default(variables),
  };
});

const muiTheme = {
  typography: {
    useNextVariants: true,
    fontSize: 15,
    fontWeightRegular: 500,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
    body1: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary,
  },
  shape: {
    borderRadius: muiBaseTheme.spacing.unit,
  },
  overrides,
};

export default muiTheme;
