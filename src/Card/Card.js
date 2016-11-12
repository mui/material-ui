// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('Card', () => ({
  card: {
    overflow: 'hidden',
  },
}));

export default function Card(props, context) {
  const {
    className: classNameProp,
    raised,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.card, classNameProp);

  return (
    <Paper className={className} zDepth={raised ? 8 : 2} {...other} />
  );
}

Card.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  raised: PropTypes.bool,
};

Card.defaultProps = {
  raised: false,
};

Card.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
