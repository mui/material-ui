/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Omit } from '@material-ui/types';

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const Link2 = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
  (props, ref) => <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />,
);

export default function LinkRouter() {
  return (
    <Router>
      <div>
        <Link component={Link1} to="/">
          With prop forwarding
        </Link>
        <br />
        <Link component={Link2}>Without prop forwarding</Link>
      </div>
    </Router>
  );
}
