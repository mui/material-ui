import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/getting-started/installation/" {...props} />
));

function ButtonRouter() {
  return (
    <Router>
      <Button color="primary" component={AdapterLink} to="/">
        Simple case
      </Button>
      <Button component={CollisionLink}>Avoids props collision</Button>
    </Router>
  );
}

export default ButtonRouter;
