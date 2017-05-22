// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiCardMedia', {
  cardMedia: {
    position: 'relative',
  },
});

function CardMedia(props) {
  const {
    classes,
    className: classNameProp,
    ...other
  } = props;

  const className = classNames(classes.cardMedia, classNameProp);

  return (
    <div className={className} {...other} />
  );
}

CardMedia.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styleSheet)(CardMedia);
