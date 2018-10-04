import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { formControlState } from '../InputBase/InputBase';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'left',
    marginTop: 8,
    lineHeight: '1em',
    minHeight: '1em',
    margin: 0,
    '&$error': {
      color: theme.palette.error.main,
    },
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
  },
  /* Styles applied to the root element if `error={true}`. */
  error: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 4,
  },
  /* Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
  contained: {
    margin: '8px 12px 0',
  },
  /* Styles applied to the root element if `focused={true}`. */
  focused: {},
  /* Styles applied to the root element if `filled={true}`. */
  filled: {},
  /* Styles applied to the root element if `required={true}`. */
  required: {},
});

function FormHelperText(props, context) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    disabled,
    error,
    filled,
    focused,
    margin,
    required,
    variant,
    ...other
  } = props;

  const fcs = formControlState({
    props,
    context,
    states: ['variant', 'margin', 'disabled', 'error', 'filled', 'focused', 'required'],
  });

  return (
    <Component
      className={classNames(
        classes.root,
        {
          [classes.contained]: fcs.variant === 'filled' || fcs.variant === 'outlined',
          [classes.marginDense]: fcs.margin === 'dense',
          [classes.disabled]: fcs.disabled,
          [classes.error]: fcs.error,
          [classes.filled]: fcs.filled,
          [classes.focused]: fcs.focused,
          [classes.required]: fcs.required,
        },
        classNameProp,
      )}
      {...other}
    />
  );
}

FormHelperText.propTypes = {
  /**
   * The content of the component.
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

FormHelperText.defaultProps = {
  component: 'p',
};

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiFormHelperText' })(FormHelperText);
