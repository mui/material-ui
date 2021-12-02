import * as React from 'react';
import PropTypes from 'prop-types';

function TestViewer(props) {
  const { children } = props;

  // We're simulating `act(() => ReactDOM.render(children))`
  // In the end children passive effects should've been flushed.
  // React doesn't have any such guarantee outside of `act()` so we're approximating it.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    setReady(true);
  }, []);

  return (
    <React.Suspense fallback={<div aria-busy />}>
      <div aria-busy={!ready} data-testid="testcase">
        {children}
      </div>
    </React.Suspense>
  );
}

TestViewer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TestViewer;
