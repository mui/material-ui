import variables, { primary, muiBaseTheme } from './variables';

const req = require.context('./components', true, /.js$/);
let overrides = {};

req.keys().forEach(filename => {
  overrides = {
    ...overrides,
    ...req(filename).default(variables),
  };
});

console.log('overrides', overrides);

const muiTheme = {
  typography: {
    useNextVariants: true,
    fontSize: 15,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
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
