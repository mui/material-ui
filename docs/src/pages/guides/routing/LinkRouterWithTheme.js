import * as React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';
import Link from '@material-ui/core/Link';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material-UI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
    .isRequired,
};

const themeSetter = (outerTheme) =>
  createTheme(outerTheme, {
    components: {
      MuiLink: {
        defaultProps: {
          // @ts-ignore
          component: LinkBehavior,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

export default function LinkRouterWithTheme() {
  return (
    <Stack sx={{ typography: 'body1' }} alignItems="center" spacing={1}>
      <ThemeProvider theme={themeSetter}>
        <Router>
          <Link href="/">Link</Link>
          <Button href="/" variant="contained">
            Link
          </Button>
        </Router>
      </ThemeProvider>
    </Stack>
  );
}
