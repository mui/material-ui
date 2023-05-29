import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { getNumberInputUtilityClass } from './numberInputClasses';
import useNumberInput from '../unstable_useNumberInput';
import {
  NumberInputOwnerState,
  NumberInputProps,
  NumberInputRootSlotProps,
  NumberInputInputSlotProps,
  NumberInputIncrementButtonSlotProps,
  NumberInputDecrementButtonSlotProps,
  NumberInputTypeMap,
} from './NumberInput.types';
import composeClasses from '../composeClasses';
import { EventHandlers, useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: NumberInputOwnerState) => {
  const { disabled, error, focused, formControlContext, isIncrementDisabled, isDecrementDisabled } =
    ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      Boolean(formControlContext) && 'formControl',
    ],
    input: ['input', disabled && 'disabled'],
    incrementButton: ['incrementButton', isIncrementDisabled && 'disabled'],
    decrementButton: ['decrementButton', isDecrementDisabled && 'disabled'],
  };

  return composeClasses(slots, useClassNamesOverride(getNumberInputUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Number Input](https://mui.com/base/react-number-input/)
 *
 * API:
 *
 * - [NumberInput API](https://mui.com/base/react-number-input/components-api/#number-input)
 */
const NumberInput = React.forwardRef(function NumberInput(
  props: NumberInputProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    className,
    component,
    defaultValue,
    disabled,
    error,
    id,
    max,
    min,
    onBlur,
    onInputChange,
    onFocus,
    onChange,
    placeholder,
    required,
    readOnly,
    shiftMultiplier,
    step,
    value,
    slotProps = {},
    slots = {},
    ...rest
  } = props;

  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    focused,
    error: errorState,
    disabled: disabledState,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled,
  } = useNumberInput({
    min,
    max,
    step,
    shiftMultiplier,
    defaultValue,
    disabled,
    error,
    onFocus,
    onInputChange,
    onBlur,
    onChange,
    required,
    readOnly,
    value,
    inputId: id,
  });

  const ownerState: NumberInputOwnerState = {
    ...props,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled,
  };

  const classes = useUtilityClasses(ownerState);

  const propsForwardedToInputSlot = {
    placeholder,
  };

  const Root = component ?? slots.root ?? 'div';
  const rootProps: WithOptionalOwnerState<NumberInputRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: rest,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: [classes.root, className],
  });

  const Input = slots.input ?? 'input';
  const inputProps: WithOptionalOwnerState<NumberInputInputSlotProps> = useSlotProps({
    elementType: Input,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsForwardedToInputSlot }),
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input,
  });

  const IncrementButton = slots.incrementButton ?? 'button';
  const incrementButtonProps: WithOptionalOwnerState<NumberInputIncrementButtonSlotProps> =
    useSlotProps({
      elementType: IncrementButton,
      getSlotProps: getIncrementButtonProps,
      externalSlotProps: slotProps.incrementButton,
      ownerState,
      className: classes.incrementButton,
    });

  const DecrementButton = slots.decrementButton ?? 'button';
  const decrementButtonProps: WithOptionalOwnerState<NumberInputDecrementButtonSlotProps> =
    useSlotProps({
      elementType: DecrementButton,
      getSlotProps: getDecrementButtonProps,
      externalSlotProps: slotProps.decrementButton,
      ownerState,
      className: classes.decrementButton,
    });

  return (
    <Root {...rootProps}>
      <DecrementButton {...decrementButtonProps} />
      <IncrementButton {...incrementButtonProps} />
      <Input {...inputProps} />
    </Root>
  );
}) as OverridableComponent<NumberInputTypeMap>;

NumberInput.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The maximum value.
   */
  max: PropTypes.number,
  /**
   * The minimum value.
   */
  min: PropTypes.number,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the <input> value changes, before clamping is applied. Note that
   * `event.target.value` may contain values that fall outside of `min` and `max` or
   * are otherwise "invalid".
   */
  onInputChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired after the value is clamped and changes.
   * Called with `undefined` when the value is unset.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the `input` element becomes read-only. The stepper buttons remain active,
   * with the addition that they are now keyboard focusable.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Multiplier applied to `step` if the shift key is held while incrementing
   * or decrementing the value. Defaults to `10`.
   */
  shiftMultiplier: PropTypes.number,
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: PropTypes.shape({
    decrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    incrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    decrementButton: PropTypes.elementType,
    incrementButton: PropTypes.elementType,
    input: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The amount that the value changes on each increment or decrement.
   */
  step: PropTypes.number,
  /**
   * The current value. Use when the component is controlled.
   */
  value: PropTypes.any,
} as any;

export default NumberInput;
