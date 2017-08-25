/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';

const DefaultOnSSR = () => null;

class NoSSR extends React.Component {
  state = {
    canRender: false,
  };

  componentDidMount() {
    this.setState({ canRender: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    return this.state.canRender ? this.props.children : <DefaultOnSSR />;
  }
}

NoSSR.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoSSR;
