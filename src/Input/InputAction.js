// @flow weak

import React from 'react';
import type { Node, ElementType } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    position: 'absolute',
    right: -theme.spacing.unit * 2,
    top: theme.spacing.unit,
  },
});

type Default = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component, normally an `IconButton`.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * 
   */
  component?: ElementType,
};

function InputAction(props: Default & Props) {
  const { children, component, classes, className, ...other } = props;

  const Component = component || 'div';

  return (
    <Component {...other} className={classNames(classes.root, className)}>
      {children}
    </Component>
  );
}

InputAction.muiName = 'InputAction';

export default withStyles(styles, { name: 'MuiInputAction' })(InputAction);
