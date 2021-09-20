import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
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
