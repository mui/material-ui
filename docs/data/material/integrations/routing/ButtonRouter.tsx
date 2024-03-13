import * as React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import Button from '@mui/material/Button';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />,
);

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

export default function ButtonRouter() {
  return (
    <div>
      <Router>
        <Button component={RouterLink} to="/">
          With prop forwarding
        </Button>
        <br />
        <Button component={LinkBehavior}>With inlining</Button>
      </Router>
    </div>
  );
}
