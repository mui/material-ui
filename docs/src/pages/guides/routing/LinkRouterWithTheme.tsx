import * as React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter as Router,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link, { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
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
      <ThemeProvider theme={theme}>
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
