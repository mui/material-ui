import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useControlled as useControlled } from '@mui/utils';
import FormControlContext from './FormControlContext';
import { getFormControlUtilityClass } from './formControlClasses';
import {
  FormControlProps,
  NativeFormControlElement,
  FormControlTypeMap,
  FormControlOwnerState,
  FormControlState,
  FormControlRootSlotProps,
} from './FormControl.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function hasValue(value: unknown) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== '';
}

function useUtilityClasses(ownerState: FormControlOwnerState) {
  const { disabled, error, filled, focused, required } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focused && 'focused',
      error && 'error',
      filled && 'filled',
      required && 'required',
    ],
  };

  return composeClasses(slots, useClassNamesOverride(getFormControlUtilityClass));
}

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
 * You can find one composition example below and more going to [the demos](https://mui.com/material-ui/react-text-field/#components).
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
 * - [Form Control](https://mui.com/base/react-form-control/)
 * - [Input](https://mui.com/joy-ui/react-input/)
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormControl API](https://mui.com/base/react-form-control/components-api/#form-control)
 */
const FormControl = React.forwardRef(function FormControl<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
>(props: FormControlProps<D>, ref: React.ForwardedRef<any>) {
  const {
    defaultValue,
    children,
    component,
    disabled = false,
    error = false,
    onChange,
    required = false,
    slotProps = {},
    slots = {},
    value: incomingValue,
    ...other
  } = props;

  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: 'FormControl',
    state: 'value',
  });

  const filled = hasValue(value);

  const [focusedState, setFocused] = React.useState(false);
  const focused = focusedState && !disabled;

  React.useEffect(() => setFocused((isFocused) => (disabled ? false : isFocused)), [disabled]);

  const ownerState: FormControlOwnerState = {
    ...props,
    disabled,
    error,
    filled,
    focused,
    required,
  };

  const childContext: FormControlState = React.useMemo(() => {
    return {
      disabled,
      error,
      filled,
      focused,
      onBlur: () => {
        setFocused(false);
      },
      onChange: (event: React.ChangeEvent<NativeFormControlElement>) => {
        setValue(event.target.value);
        onChange?.(event);
      },
      onFocus: () => {
        setFocused(true);
      },
      required,
      value: value ?? '',
    };
  }, [disabled, error, filled, focused, onChange, required, setValue, value]);

  const classes = useUtilityClasses(ownerState);

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(childContext);
    }

    return children;
  };

  const Root = component ?? slots.root ?? 'div';
  const rootProps: WithOptionalOwnerState<FormControlRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      children: renderChildren(),
    },
    ownerState,
    className: classes.root,
  });

  return (
    <FormControlContext.Provider value={childContext}>
      <Root {...rootProps} />
    </FormControlContext.Provider>
  );
}) as OverridableComponent<FormControlTypeMap>;

FormControl.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * Callback fired when the form element's value is modified.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the FormControl.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The value of the form element.
   */
  value: PropTypes.any,
} as any;

export default FormControl;
