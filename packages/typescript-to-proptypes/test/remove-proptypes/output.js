import * as React from 'react';
import PropTypes from 'prop-types';
function makeComponent() {
  return function Component(props) {
    return <div>{props.children}</div>;
  };
}
// @typescript-to-proptypes-generate
const MyComponent = makeComponent();

MyComponent.propTypes /* remove-proptypes */ = {
  /**
   * UI to render
   */
  children: PropTypes.node,
};

export default MyComponent;
