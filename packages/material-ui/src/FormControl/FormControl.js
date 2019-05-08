import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isFilled, isAdornedStart } from '../InputBase/utils';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { isMuiElement } from '../utils/reactHelpers';
import FormControlContext from './FormControlContext';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style.
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: 'top', // Fix alignment issue on Safari.
  },
  /* Styles applied to the root element if `margin="normal"`. */
  marginNormal: {
    marginTop: 16,
    marginBottom: 8,
  },
  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 8,
    marginBottom: 4,
  },
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%',
  },
};

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * ⚠️Only one input can be used within a FormControl.
 */
const FormControl = React.forwardRef(function FormControl(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'div',
    disabled = false,
    error = false,
    fullWidth = false,
    margin = 'none',
    required = false,
    variant = 'standard',
    ...other
  } = props;
  const [adornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, child => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        const input = isMuiElement(child, ['Select']) ? child.props.input : child;

        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });

  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, child => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const [focused, setFocused] = React.useState(false);

  if (disabled && focused) {
    setFocused(false);
  }

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleDirty = () => {
    if (!filled) {
      setFilled(true);
    }
  };

  const handleClean = () => {
    if (filled) {
      setFilled(false);
    }
  };

  const childContext = {
    adornedStart,
    disabled,
    error,
    filled,
    focused,
    margin,
    onBlur: handleBlur,
    onEmpty: handleClean,
    onFilled: handleDirty,
    onFocus: handleFocus,
    required,
    variant,
  };

  return (
    <FormControlContext.Provider value={childContext}>
      <Component
        className={clsx(
          classes.root,
          {
            [classes[`margin${capitalize(margin)}`]]: margin !== 'none',
            [classes.fullWidth]: fullWidth,
          },
          className,
        )}
        ref={ref}
        {...other}
      >
        {children}
      </Component>
    </FormControlContext.Provider>
  );
});

FormControl.propTypes = {
  /**
   * The contents of the form control.
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
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default withStyles(styles, { name: 'MuiFormControl' })(FormControl);
