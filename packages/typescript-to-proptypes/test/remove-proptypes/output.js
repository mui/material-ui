import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  return <div>{props.children}</div>;
}

Component.propTypes /* remove-proptypes */ = {
  /**
   * UI to render
   */
  children: PropTypes.node,
};

export default Component;
