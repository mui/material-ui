import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * A basic error boundary that can be used to assert thrown errors in render.
 * @example <ErrorBoundary ref={errorRef}><MyComponent /></ErrorBoundary>;
 *          expect(errorRef.current.errors).to.have.lenght(0);
 */
// enforce a single file for test related components
// eslint-disable-next-line import/prefer-default-export
export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { error: null };

  /**
   * @public
   */
  errors = [];

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    this.errors.push(error);
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}
