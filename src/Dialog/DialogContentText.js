// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    ...theme.typography.subheading,
    color: theme.palette.text.secondary,
    margin: 0,
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component.
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
};

function DialogContentText(props: ProvidedProps & Props) {
  const { children, classes, className, ...other } = props;

  return (
    <p className={classNames(classes.root, className)} {...other}>
      {children}
    </p>
  );
}

export default withStyles(styles, { name: 'MuiDialogContentText' })(DialogContentText);
