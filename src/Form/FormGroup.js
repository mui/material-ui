// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiFormGroup', {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
});

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: Element<*>,
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

type AllProps = DefaultProps & Props;

/**
 * FormGroup wraps controls such as Checkbox and Switch.
 * It provides compact row layout and FormLabel awareness.
 */
function FormGroup(props: AllProps) {
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

export default withStyles(styleSheet)(FormGroup);
