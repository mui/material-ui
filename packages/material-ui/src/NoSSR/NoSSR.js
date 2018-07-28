import React from 'react';
import PropTypes from 'prop-types';
import exactProp from '../utils/exactProp';

const Fallback = () => null;

/**
 * Only render the component on the client.
 * It can be useful in a variety of situations:
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can apply service degradation.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Escape hatch for broken dependencies not supporting SSR.
 */
class NoSSR extends React.Component {
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

NoSSR.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

NoSSR.propTypes = exactProp(NoSSR.propTypes);

NoSSR.defaultProps = {
  fallback: <Fallback />,
};

export default NoSSR;
