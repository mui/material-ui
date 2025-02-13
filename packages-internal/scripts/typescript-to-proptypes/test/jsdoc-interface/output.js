import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { classes } = props;
  return (
    <ul>
      <li>root: {classes?.root}</li>
      <li>slot: {classes?.slot}</li>
    </ul>
  );
}

Component.propTypes = {
  /**
   * the classes
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    slot: PropTypes.string,
  }),
};

export default Component;
