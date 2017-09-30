// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    height: 24,
    marginRight: theme.spacing.unit * 2,
    width: 24,
    color: theme.palette.action.active,
    flexShrink: 0,
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `material-ui-icons` SVG icon component.
   */
  children: Element<any>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
};

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
function ListItemIcon(props: ProvidedProps & Props) {
  const { children, classes, className: classNameProp, ...other } = props;

  return React.cloneElement(children, {
    className: classNames(classes.root, classNameProp, children.props.className),
    ...other,
  });
}

export default withStyles(styles, { name: 'MuiListItemIcon' })(ListItemIcon);
