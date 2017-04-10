// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListItemAvatar', () => {
  return {
    denseAvatar: {
      width: 36,
      height: 36,
      fontSize: 18,
      marginRight: 4,
    },
    denseAvatarIcon: {
      width: 20,
      height: 20,
    },
  };
});

/**
 * `<ListItemAvatar>` is a simple wrapper to apply the `dense` mode styles to `Avatar`.
 *
 * ```
 * <ListItemAvatar>
 *   <Avatar>
 * </ListItemAvatar>
 * ```
 */
export default function ListItemAvatar(props, context) {
  if (context.dense === undefined) {
    warning(false, `Material-UI: <ListItemAvatar> is a simple wrapper to apply the dense styles
      to <Avatar>. You do not need it unless you are controlling the <List> dense property.`);
    return props.children;
  }

  const {
    children,
    className: classNameProp,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  return React.cloneElement(children, {
    className: classNames(
      { [classes.denseAvatar]: context.dense },
      classNameProp,
      children.props.className,
    ),
    childrenClassName: classNames(
      { [classes.denseAvatarIcon]: context.dense },
      children.props.childrenClassName,
    ),
    ...other,
  });
}

ListItemAvatar.propTypes = {
  /**
   * The content of the component, normally `Avatar`.
   */
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
