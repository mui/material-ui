import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import withStyles from '../styles/withStyles';
import FormLabel from '../FormLabel';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    transformOrigin: 'top left',
  },
  /* Pseudo-class applied to the root element if `focused={true}`. */
  focused: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {},
  /* Pseudo-class applied to the root element if `required={true}`. */
  required: {},
  /* Pseudo-class applied to the asterisk element. */
  asterisk: {},
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
    transform: 'translate(12px, 20px) scale(1)',
    '&$marginDense': {
      transform: 'translate(12px, 17px) scale(1)',
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
    transform: 'translate(14px, 20px) scale(1)',
    '&$marginDense': {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '&$shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
});

const InputLabel = React.forwardRef(function InputLabel(props, ref) {
  const {
    classes,
    className,
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['margin', 'variant'],
  });

  return (
    <FormLabel
      data-shrink={shrink}
      className={clsx(
        classes.root,
        {
          [classes.formControl]: muiFormControl,
          [classes.animated]: !disableAnimation,
          [classes.shrink]: shrink,
          [classes.marginDense]: fcs.margin === 'dense',
          [classes.filled]: fcs.variant === 'filled',
          [classes.outlined]: fcs.variant === 'outlined',
        },
        className,
      )}
      classes={{
        focused: classes.focused,
        disabled: classes.disabled,
        error: classes.error,
        required: classes.required,
        asterisk: classes.asterisk,
      }}
      ref={ref}
      {...other}
    />
  );
});

InputLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The contents of the `InputLabel`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
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
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default withStyles(styles, { name: 'MuiInputLabel' })(InputLabel);
