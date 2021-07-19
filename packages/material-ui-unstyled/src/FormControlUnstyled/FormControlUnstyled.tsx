import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FormControlUnstyledContext, { FormControlUnstyledState } from './FormControlContext';
import appendStyleProps from '../utils/appendStyleProps';
import classes from './formControlUnstyledClasses';
import FormControlUnstyledProps, { NativeFormControlElement } from './FormControlUnstyledProps';

function hasValue(value: unknown) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== '';
}

function isFilled(value: unknown, defaultValue?: unknown) {
  return hasValue(value) || hasValue(defaultValue);
}

type NonOptionalStyleProps = 'disabled' | 'error' | 'focused' | 'required';

export type FormControlUnstyledStyleProps = Omit<FormControlUnstyledProps, NonOptionalStyleProps> &
  Required<Pick<FormControlUnstyledProps, NonOptionalStyleProps>> & {
    filled: boolean;
  };

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * *   FormLabel
 * *   FormHelperText
 * *   Input
 * *   InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://material-ui.com/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `Input` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormControlUnstyled API](https://material-ui.com/api/form-control-unstyled/)
 */
const FormControlUnstyled = React.forwardRef(function FormControlUnstyled(
  props: FormControlUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    defaultValue,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled = false,
    error = false,
    focused: visuallyFocused = false,
    onChange,
    required = false,
    value,
    ...other
  } = props;

  const isControlled = value !== undefined;
  const [filled, setFilled] = React.useState(() => isFilled(value, defaultValue));

  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  const styleProps: FormControlUnstyledStyleProps = {
    ...props,
    disabled,
    error,
    filled,
    focused,
    required,
  };

  let registerEffect = () => {};
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'Material-UI: There are multiple `Input` components inside a FormControl.',
            'This creates visual inconsistencies, only use one `Input`.',
          ].join('\n'),
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  React.useEffect(() => {
    if (isControlled) {
      setFilled(isFilled(value));
    }
  }, [value, isControlled]);

  const handleChange = (event: React.ChangeEvent<NativeFormControlElement>) => {
    if (!isControlled) {
      setFilled(isFilled(event.currentTarget.value));
    }

    onChange?.(event);
  };

  const childContext: FormControlUnstyledState = {
    defaultValue,
    disabled,
    error,
    filled,
    focused,
    onBlur: () => {
      setFocused(false);
    },
    onChange: handleChange,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    value,
  };

  const Root = component ?? components.Root ?? 'div';
  const rootProps = appendStyleProps(Root, { ...other, ...componentsProps.root }, styleProps);

  return (
    <FormControlUnstyledContext.Provider value={childContext}>
      <Root
        ref={ref}
        {...rootProps}
        className={clsx(
          classes.root,
          className,
          rootProps?.className,
          disabled && classes.disabled,
        )}
      >
        {children}
      </Root>
    </FormControlUnstyledContext.Provider>
  );
});

FormControlUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.object,
  /**
   * @ignore
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component is displayed in focused state.
   * @default false
   */
  focused: PropTypes.bool,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * @ignore
   */
  value: PropTypes.any,
} as any;

export default FormControlUnstyled;
