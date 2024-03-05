import * as React from 'react';
import PropTypes from 'prop-types';

function Hidden(props) {
  const { color, only } = props;

  return <div color={color} hidden={only !== 'xs'} />;
}

Hidden.propTypes = {
  /**
   * will be sorted alphanumeric
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * will be sorted by viewport size descending
   */
  only: PropTypes.oneOfType([
    PropTypes.oneOf(['xl', 'md', 'xs']),
    PropTypes.arrayOf(PropTypes.oneOf(['xl', 'md', 'xs']).isRequired),
  ]),
};

export default Hidden;
