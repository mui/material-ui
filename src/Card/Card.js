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
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};

Card.defaultProps = {
  raised: false,
};

export default Card;
