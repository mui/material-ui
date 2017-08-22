// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';

export const styles = {
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
};

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component, normally `Avatar`.
   */
  children: React.Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
};

type AllProps = DefaultProps & Props;

/**
 * It's a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */
function ListItemAvatar(props: AllProps, context: { dense: boolean }) {
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

ListItemAvatar.contextTypes = {
  dense: PropTypes.bool,
};

ListItemAvatar.muiName = 'ListItemAvatar';

export default withStyles(styles, { name: 'MuiListItemAvatar' })(ListItemAvatar);
