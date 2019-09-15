import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const Link2 = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
  (props, ref) => <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />,
);

export default function ButtonRouter() {
  return (
    <Router>
      <div>
        <Button color="primary" component={Link1} to="/">
          With prop forwarding
        </Button>
        <br />
        <Button color="primary" component={Link2}>
          Without prop forwarding
        </Button>
      </div>
    </Router>
  );
}
