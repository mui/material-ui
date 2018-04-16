import React from 'react';
import PropTypes from 'prop-types';

const DefaultOnSSR = () => null;

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
    return this.state.mounted ? this.props.children : <DefaultOnSSR />;
  }
}

NoSSR.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoSSR;
