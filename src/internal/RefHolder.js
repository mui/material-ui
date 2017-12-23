import React from 'react';
import PropTypes from 'prop-types';

/**
 * @ignore - internal component.
 *
 * Internal helper component to allow attaching a ref to a
 * child element that may not accept refs (functional component).
 */
class RefHolder extends React.Component {
  render() {
    return this.props.children;
  }
}

RefHolder.propTypes = {
  children: PropTypes.node,
};

export default RefHolder;
