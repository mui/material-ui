// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('CardMedia', () => ({
  cardMedia: {
    position: 'relative',
  },
}));

export default function CardMedia(props, context) {
  const {
    className: classNameProp,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardMedia, classNameProp);

  return (
    <div className={className} {...other} />
  );
}

CardMedia.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

CardMedia.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
