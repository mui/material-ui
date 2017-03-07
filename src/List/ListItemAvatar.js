// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiListItemAvatar', {
  root: {
    width: 36,
    height: 36,
    fontSize: 18,
    marginRight: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

/**
 * It's a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */
function ListItemAvatar(props, context) {
  if (context.dense === undefined) {
    warning(
      false,
      `Material-UI: <ListItemAvatar> is a simple wrapper to apply the dense styles
      to <Avatar>. You do not need it unless you are controlling the <List> dense property.`,
    );
    return props.children;
  }

  const { children, classes, className: classNameProp, ...other } = props;

  return React.cloneElement(children, {
    className: classNames(
      { [classes.root]: context.dense },
      classNameProp,
      children.props.className,
    ),
    childrenClassName: classNames(
      { [classes.icon]: context.dense },
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

ListItemAvatar.contextTypes = {
  dense: PropTypes.bool,
};

ListItemAvatar.muiName = 'ListItemAvatar';

export default withStyles(styleSheet)(ListItemAvatar);
