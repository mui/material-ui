// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListItemAvatar', () => {
  return {
    dense: {
      height: 32,
      marginRight: 8,
      width: 32,
    },
  };
});

export default function ListItemAvatar(props, context) {
  if (!context.dense) {
    warning(false, `Material-UI: <ListItemAvatar/> is a simple wrapper for the dense mode.
      You do not need it.`);
    return props.children;
  }

  const {
    children,
    className: classNameProp,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  return React.cloneElement(children, {
    className: classNames(classes.dense, classNameProp, children.props.className),
    ...other,
  });
}

ListItemAvatar.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemAvatar.contextTypes = {
  dense: PropTypes.bool,
  styleManager: customPropTypes.muiRequired,
};
