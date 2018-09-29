// @inheritedComponent FormLabel

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import FormLabel from '../FormLabel';
import { formControlState } from '../InputBase/InputBase';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    transformOrigin: 'top left',
  },
  /* Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: 'translate(0, 24px) scale(1)',
  },
  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    // Compensation for the `Input.inputDense` style.
    transform: 'translate(0, 21px) scale(1)',
  },
  /* Styles applied to the `input` element if `shrink={true}`. */
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  /* Styles applied to the `input` element if `disableAnimation={false}`. */
  animated: {
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  /* Styles applied to the root element if `variant="filled"`. */
  filled: {
    // Chrome's autofill feature gives the input field a yellow background.
    // Since the input field is behind the label in the HTML tree,
    // the input field is drawn last and hides the label with an opaque background color.
    // zIndex: 1 will raise the label above opaque background-colors of input.
    zIndex: 1,
    pointerEvents: 'none',
    transform: 'translate(12px, 22px) scale(1)',
    '&$marginDense': {
      transform: 'translate(12px, 19px) scale(1)',
    },
    '&$shrink': {
      transform: 'translate(12px, 10px) scale(0.75)',
      '&$marginDense': {
        transform: 'translate(12px, 7px) scale(0.75)',
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {
    // see comment above on filled.zIndex
    zIndex: 1,
    pointerEvents: 'none',
    transform: 'translate(14px, 22px) scale(1)',
    '&$marginDense': {
      transform: 'translate(14px, 17.5px) scale(1)',
    },
    '&$shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
});

function InputLabel(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    disableAnimation,
    FormLabelClasses,
    margin: marginProp,
    shrink: shrinkProp,
    variant: variantProp,
    ...other
  } = props;

  const { muiFormControl } = context;

  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  const fcs = formControlState({
    props,
    context,
    states: ['margin', 'variant'],
  });

  const className = classNames(
    classes.root,
    {
      [classes.formControl]: muiFormControl,
      [classes.animated]: !disableAnimation,
      [classes.shrink]: shrink,
      [classes.marginDense]: fcs.margin === 'dense',
      [classes.filled]: fcs.variant === 'filled',
      [classes.outlined]: fcs.variant === 'outlined',
    },
    classNameProp,
  );

  return (
    <FormLabel data-shrink={shrink} className={className} classes={FormLabelClasses} {...other}>
      {children}
    </FormLabel>
  );
}

InputLabel.propTypes = {
  /**
   * The contents of the `InputLabel`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, apply disabled class.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * `classes` property applied to the [`FormLabel`](/api/form-label) element.
   */
  FormLabelClasses: PropTypes.object,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

InputLabel.defaultProps = {
  disableAnimation: false,
};

InputLabel.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiInputLabel' })(InputLabel);
