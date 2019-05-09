/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref as any} {...props} />
));

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
const CollisionLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
  (props, ref) => (
    <RouterLink innerRef={ref as any} to="/getting-started/installation/" {...props} />
  ),
);

function LinkRouter() {
  return (
    <Router>
      <div>
        <Link component={RouterLink} to="/">
          Simple case
        </Link>
        <br />
        <Link component={AdapterLink} to="/">
          Ref forwarding
        </Link>
        <br />
        <Link component={CollisionLink}>Avoids props collision</Link>
      </div>
    </Router>
  );
}

export default LinkRouter;
