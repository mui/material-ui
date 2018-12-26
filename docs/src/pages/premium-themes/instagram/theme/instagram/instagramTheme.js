import variables, { primary, shape } from './variables';

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
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  },
  palette: {
    primary,
  },
  shape,
  overrides,
};

export default muiTheme;
