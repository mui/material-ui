import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

export default function ButtonRouter() {
  return (
    <Router>
      <div>
        <Button color="primary" component={RouterLink} to="/">
          With prop forwarding
        </Button>
        <br />
        <Button color="primary" component={LinkBehavior}>
          Without prop forwarding
        </Button>
      </div>
    </Router>
  );
}
