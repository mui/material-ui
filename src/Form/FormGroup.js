// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
};

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
  /**
   * Display group of elements in a compact row.
   */
  row?: boolean,
};

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
function FormGroup(props: ProvidedProps & Props) {
  const { classes, className, children, row, ...other } = props;
  const rootClassName = classNames(
    classes.root,
    {
      [classes.row]: row,
    },
    className,
  );

  return (
    <div className={rootClassName} {...other}>
      {children}
    </div>
  );
}

FormGroup.defaultProps = {
  row: false,
};

export default withStyles(styles, { name: 'MuiFormGroup' })(FormGroup);
