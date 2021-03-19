import * as React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
  createMuiTheme(outerTheme, {
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
    <Box
      sx={{
        display: 'flex',
        typography: 'body1',
        flexDirection: 'column',
        alignItems: 'center', // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 1 },
      }}
    >
      <ThemeProvider theme={themeSetter}>
        <Router>
          <Link href="/">Link</Link>
          <Button href="/" variant="contained">
            Link
          </Button>
        </Router>
      </ThemeProvider>
    </Box>
  );
}
