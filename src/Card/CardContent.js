// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiCardContent', () => ({
  cardContent: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24,
    },
  },
}));

export default function CardContent(props, context) {
  const {
    className: classNameProp,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardContent, classNameProp);

  return (
    <div className={className} {...other} />
  );
}

CardContent.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

CardContent.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
