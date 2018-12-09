import 'docs/src/modules/components/bootstrap';
import React from 'react';

function withRoot(Component) {
  function WithRoot(props) {
    return <Component {...props} />;
  }

  return WithRoot;
}

export default withRoot;
