import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import formControlState from '../FormControl/formControlState';
import withFormControlContext from '../FormControl/withFormControlContext';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary,
    ...theme.typography.body1,
    lineHeight: 1,
    padding: 0,
    '&$focused': {
      color: theme.palette.primary[theme.palette.type === 'light' ? 'dark' : 'light'],
    },
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
    '&$error': {
      color: theme.palette.error.main,
    },
  },
  /* Styles applied to the root element if `focused={true}`. */
  focused: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `error={true}`. */
  error: {},
  /* Styles applied to the root element if `filled={true}`. */
  filled: {},
  /* Styles applied to the root element if `required={true}`. */
  required: {},
  /* Styles applied to the asterisk element. */
  asterisk: {
    '&$error': {
      color: theme.palette.error.main,
    },
  },
});

const FormLabel = React.forwardRef(function FormLabel(props, ref) {
  const {
    children,
    classes,
    className: classNameProp,
    component: Component = 'label',
    disabled,
    error,
    filled,
    focused,
    muiFormControl,
    required,
    ...other
  } = props;

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['required', 'focused', 'disabled', 'error', 'filled'],
  });

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.disabled]: fcs.disabled,
          [classes.error]: fcs.error,
          [classes.filled]: fcs.filled,
          [classes.focused]: fcs.focused,
          [classes.required]: fcs.required,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      {children}
      {fcs.required && (
        <span
          className={clsx(classes.asterisk, {
            [classes.error]: fcs.error,
          })}
          data-mui-test="FormLabelAsterisk"
        >
          &thinsp;{'*'}
        </span>
      )}
    </Component>
  );
});

FormLabel.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * @ignore
   */
  muiFormControl: PropTypes.object,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiFormLabel' })(withFormControlContext(FormLabel));
