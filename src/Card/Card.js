// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../Paper';

function Card(props) {
  const { raised, ...other } = props;

  return <Paper elevation={raised ? 8 : 2} {...other} />;
}

Card.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};

Card.defaultProps = {
  raised: false,
};

export default Card;
