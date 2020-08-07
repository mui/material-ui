import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

export default class DemoErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { children, onResetDemoClick, t } = this.props;
    const { error } = this.state;

    if (error) {
      /* eslint-disable material-ui/no-hardcoded-labels */
      return (
        <div>
          <Typography color="error" component="p" variant="h5" gutterBottom>
            This demo had a runtime error!
          </Typography>
          <Typography>
            We would appreciate it if you report this error directly to our{' '}
            <Link
              href="https://github.com/mui-org/material-ui/issues/new?template=1.bug.md"
              target="_blank"
            >
              issue tracker
            </Link>
            .
          </Typography>
          <pre>{error.toString()}</pre>
          <Button color="secondary" onClick={onResetDemoClick} variant="text">
            {t('resetDemo')}
          </Button>
        </div>
      );
      /* eslint-enable material-ui/no-hardcoded-labels */
    }

    return children;
  }
}

DemoErrorBoundary.propTypes = {
  children: PropTypes.node,
  onResetDemoClick: PropTypes.func.isRequired,
  /**
   * translate function from redux store
   */
  t: PropTypes.func.isRequired,
};
