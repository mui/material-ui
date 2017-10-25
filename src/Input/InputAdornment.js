// @flow

import React from 'react';
import type { Node, ElementType } from 'react';
import classNames from 'classnames';
import Typography from '../Typography';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    'label + div > &': {
      marginTop: -theme.spacing.unit * 2,
    },
  },
  positionStart: {
    marginRight: theme.spacing.unit,
  },
  positionEnd: {
    marginLeft: theme.spacing.unit,
  },
});

type ProvidedProps = {
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

function InputAdornment(props: ProvidedProps & Props) {
  const {
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position,
    ...other
  } = props;

  return (
    <Component
      className={classNames(
        classes.root,
        {
          [classes.positionStart]: position === 'start',
          [classes.positionEnd]: position === 'end',
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

InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false,
};

export default withStyles(styles, { name: 'MuiInputAdornment' })(InputAdornment);
