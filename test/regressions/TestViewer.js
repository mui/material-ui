import React from 'react';
import PropTypes from 'prop-types';
import { useFakeTimers } from 'sinon';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Do the opposite of the docs in order to help catching issues.
      boxSizing: 'content-box',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
      // Disable transitions to avoid flaky screenshots
      transition: 'none !important',
      animation: 'none !important',
    },
    body: {
      margin: 0,
      overflowX: 'hidden',
    },
  },
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'inline-block',
    padding: theme.spacing(1),
  },
});

function TestViewer(props) {
  const { children, classes } = props;

  // We're simulating `act(() => ReactDOM.render(children))`
  // In the end children passive effects should've been flushed.
  // React doesn't have any such guarantee outside of `act()` so we're approximating it.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    // Use a "real timestamp" so that we see a useful date instead of "00:00"
    // eslint-disable-next-line react-hooks/rules-of-hooks -- not a React hook
    const clock = useFakeTimers(new Date('Mon Aug 18 14:11:54 2014 -0500'));
    // and wait `load-css` timeouts to be flushed
    clock.runToLast();
    setReady(true);

    return () => {
      clock.restore();
    };
  }, []);

  return (
    <div aria-busy={!ready} data-testid="testcase" className={classes.root}>
      {children}
    </div>
  );
}

TestViewer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestViewer);
