// @flow

import React from 'react';
import type { Node } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    color: theme.palette.input.helperText,
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
    textAlign: 'left',
    marginTop: theme.spacing.unit,
    lineHeight: '1em',
    minHeight: '1em',
    margin: 0,
  },
  dense: {
    marginTop: theme.spacing.unit / 2,
  },
  error: {
    color: theme.palette.error.A400,
  },
  disabled: {
    color: theme.palette.input.disabled,
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
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense',
};

function FormHelperText(props: ProvidedProps & Props, context: { muiFormControl: Object }) {
  const {
    children,
    classes,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    margin: marginProp,
    ...other
  } = props;
  const { muiFormControl } = context;

  let disabled = disabledProp;
  let error = errorProp;
  let margin = marginProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  const className = classNames(
    classes.root,
    {
      [classes.disabled]: disabled,
      [classes.error]: error,
      [classes.dense]: margin === 'dense',
    },
    classNameProp,
  );

  return (
    <p className={className} {...other}>
      {children}
    </p>
  );
}

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiFormHelperText' })(FormHelperText);
