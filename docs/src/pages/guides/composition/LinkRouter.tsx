/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Omit } from '@material-ui/types';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

export default function LinkRouter() {
  return (
    <Router>
      <div>
        <Link component={RouterLink} to="/">
          With prop forwarding
        </Link>
        <br />
        <Link component={LinkBehavior}>Without prop forwarding</Link>
      </div>
    </Router>
  );
}
