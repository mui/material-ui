import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  const focusColor = theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'];
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.labelText,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1,
      padding: 0,
    },
    focused: {
      color: focusColor,
    },
    error: {
      color: theme.palette.error.A400,
    },
    disabled: {
      color: theme.palette.input.disabled,
    },
  };
};

function FormLabel(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    component: Component,
    disabled: disabledProp,
    error: errorProp,
    focused: focusedProp,
    required: requiredProp,
    ...other
  } = props;

  const { muiFormControl } = context;

  let required = requiredProp;
  let focused = focusedProp;
  let disabled = disabledProp;
  let error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  const className = classNames(
    classes.root,
    {
      [classes.focused]: focused,
      [classes.disabled]: disabled,
      [classes.error]: error,
    },
    classNameProp,
  );

  const asteriskClassName = classNames({
    [classes.error]: error,
  });

  return (
    <Component className={className} {...other}>
      {children}
      {required && (
        <span className={asteriskClassName} data-mui-test="FormLabelAsterisk">
          {'\u2009*'}
        </span>
      )}
    </Component>
  );
}

FormLabel.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  component: 'label',
};

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiFormLabel' })(FormLabel);
