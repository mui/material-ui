import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DefaultOnSSR = () => null;

class NoSSR extends Component {
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
