import React from 'react';
import PropTypes from 'prop-types';

// This is a temporary component, we should be able to remove it once all our components
// implement forwardRef.
class RefHolder extends React.Component {
  render() {
    return this.props.children;
  }
}

RefHolder.propTypes = {
  children: PropTypes.node,
};

export default RefHolder;
