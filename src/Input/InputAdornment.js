// @flow weak

import React from 'react';
import type { Node, ElementType } from 'react';
import classNames from 'classnames';
import Typography from '../Typography';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    display: 'inline-block',
    'label + div > &': {
      marginTop: -16,
    },
  },
  start: {
    marginRight: theme.spacing.unit,
  },
  end: {
    marginLeft: theme.spacing.unit,
  },
});

type Default = {
  classes: Object,
  component: ElementType,
  disableTypography: boolean,
};

export type Props = {
  /**
   * The content of the component, normally an `IconButton` or string.
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
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography?: boolean,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: 'start' | 'end',
};

function InputAdornment(props: Default & Props) {
  const {
    children,
    component: Component,
    classes,
    className,
    position,
    disableTypography,
    ...other
  } = props;

  return (
    <Component
      className={classNames(
        classes.root,
        {
          [classes.start]: position === 'start',
          [classes.end]: position === 'end',
        },
        className,
      )}
      {...other}
    >
      {typeof children === 'string' && !disableTypography ? (
        <Typography color="secondary">{children}</Typography>
      ) : (
        children
      )}
    </Component>
  );
}

InputAdornment.muiName = 'InputAdornment';
InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false,
};

export default withStyles(styles, { name: 'MuiInputAdornment' })(InputAdornment);
