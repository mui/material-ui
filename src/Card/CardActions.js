// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styleSheet = createStyleSheet('MuiCardActions', () => ({
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
    disableActionSpacing,
    children,
    className: classNameProp,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardActions, classNameProp);

  return (
    <div className={className} {...other}>
      {disableActionSpacing ?
        children : cloneChildrenWithClassName(children, classes.actionSpacing)}
    </div>
  );
}

CardActions.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the card actions do not have additional margin.
   */
  disableActionSpacing: PropTypes.bool,
};

CardActions.defaultProps = {
  disableActionSpacing: false,
};

CardActions.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
