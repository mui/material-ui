import React from 'react';
import PropTypes from 'prop-types';
import exactProp from '../utils/exactProp';

const Fallback = () => null;

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */
class NoSsr extends React.Component {
  state = {
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const { children, fallback } = this.props;

    return this.state.mounted ? children : fallback;
  }
}

NoSsr.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

NoSsr.propTypes = exactProp(NoSsr.propTypes);

NoSsr.defaultProps = {
  fallback: <Fallback />,
};

export default NoSsr;
