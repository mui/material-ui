// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styleSheet = createStyleSheet('CardActions', () => ({
  cardActions: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px',
  },
  actionSpacing: {
    margin: '0 4px',
  },
}));

export default function CardActions(props, context) {
  const {
    actionSpacing,
    children,
    className: classNameProp,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardActions, classNameProp);

  return (
    <div className={className} {...other}>
      {actionSpacing ? cloneChildrenWithClassName(children, classes.actionSpacing) : children}
    </div>
  );
}

CardActions.propTypes = {
  actionSpacing: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

CardActions.defaultProps = {
  actionSpacing: true,
};

CardActions.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
