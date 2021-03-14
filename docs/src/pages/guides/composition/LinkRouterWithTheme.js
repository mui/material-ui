import * as React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LinkBehavior = React.forwardRef(({ href, ...props }, ref) => (
  <RouterLink data-testid="customLink" ref={ref} to={href} {...props} />
));

LinkBehavior.propTypes = {
  href: PropTypes.string,
};

const theme = createMuiTheme({
  components: {
    MuiButtonBase: {
      LinkComponent: LinkBehavior,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
  },
});

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Button href="/">with theme</Button>
      </Router>
    </ThemeProvider>
  );
}
