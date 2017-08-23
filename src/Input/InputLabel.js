// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { FormLabel } from '../Form';

export const styles = (theme: Object) => ({
  root: {
    transformOrigin: 'top left',
  },
  formControl: {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: `translate(0, ${theme.spacing.unit * 3 - 1}px) scale(1)`,
  },
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  animated: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  disabled: {
    color: theme.palette.input.disabled,
  },
});

type DefaultProps = {
  classes: Object,
  disabled: boolean,
  disableAnimation: boolean,
};

export type Props = {
  /**
   * The contents of the `InputLabel`.
   */
  children?: React.Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation?: boolean,
  /**
   * If `true`, apply disabled class.
   */
  disabled?: boolean,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `true`, the input of this label is focused.
   */
  focused?: boolean,
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required?: boolean,
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean,
};

type AllProps = DefaultProps & Props;

function InputLabel(props: AllProps, context: { muiFormControl: Object }) {
  const {
    disabled,
    disableAnimation,
    children,
    classes,
    className: classNameProp,
    shrink: shrinkProp,
    ...other
  } = props;

  const { muiFormControl } = context;
  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused;
  }

  const className = classNames(
    classes.root,
    {
      [classes.formControl]: muiFormControl,
      [classes.animated]: !disableAnimation,
      [classes.shrink]: shrink,
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <FormLabel className={className} {...other}>
      {children}
    </FormLabel>
  );
}

InputLabel.defaultProps = {
  disabled: false,
  disableAnimation: false,
};

InputLabel.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiInputLabel' })(InputLabel);
