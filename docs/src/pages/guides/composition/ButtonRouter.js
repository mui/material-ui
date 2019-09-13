import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const Link2 = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
));

export default function ButtonRouter() {
  return (
    <Router>
      <div>
        <Button color="primary" component={Link1} to="/">
          With props forwarding
        </Button>
        <br />
        <Button color="primary" component={Link2}>
          Without props forwarding
        </Button>
      </div>
    </Router>
  );
}
