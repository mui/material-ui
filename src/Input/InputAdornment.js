// @flow weak

import React from 'react';
import type { Node, ElementType } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = () => ({
  root: {},
});

type Default = {
  classes: Object,
  component: ElementType,
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: 'before' | 'after',
};

function InputAdornment(props: Default & Props) {
  const { children, component: Component, classes, className, position, ...other } = props;

  return (
    <Component className={classNames(classes.root, className)} {...other}>
      {children}
    </Component>
  );
}

InputAdornment.muiName = 'InputAdornment';
InputAdornment.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiInputAction' })(InputAdornment);
