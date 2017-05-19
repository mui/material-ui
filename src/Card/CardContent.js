// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiCardContent', (theme) => ({
  cardContent: {
    padding: theme.spacing.unit * 2,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 3,
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
   * @ignore
   */
  className: PropTypes.string,
};

CardContent.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
