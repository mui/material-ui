'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useCheckbox } from '../useCheckbox';
import {
  CheckboxProps,
  CheckboxOwnerState,
  CheckboxInputSlotProps,
  CheckboxRootSlotProps,
  CheckboxTypeMap,
} from './Checkbox.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getCheckboxUtilityClass } from './checkboxClasses';

const useUtilityClasses = (ownerState: CheckboxOwnerState) => {
  const { checked, disabled, focusVisible, readOnly } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    input: ['input'],
  };

  return composeClasses(slots, useClassNamesOverride(getCheckboxUtilityClass));
};

/**
 * The foundation for building custom-styled checkboxes.
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/base-ui/react-checkbox/)
 *
 * API:
 *
 * - [Checkbox API](https://mui.com/base-ui/react-checkbox/components-api/#checkbox)
 */
const Checkbox = React.forwardRef(function Checkbox<RootComponentType extends React.ElementType>(
  props: CheckboxProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useCheckbox(props);

  const ownerState: CheckboxOwnerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
  };

  const classes = useUtilityClasses(ownerState);

  const Root: React.ElementType = slots.root ?? 'span';
  const rootProps: WithOptionalOwnerState<CheckboxRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  const Input: React.ElementType = slots.input ?? 'input';
  const inputProps: WithOptionalOwnerState<CheckboxInputSlotProps> = useSlotProps({
    elementType: Input,
    getSlotProps: getInputProps,
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input,
  });

  return (
    <div>
      rendering
      <Root {...rootProps}>
        <Input {...inputProps} />
      </Root>
    </div>
  );
}) as PolymorphicComponent<CheckboxTypeMap>;

Checkbox.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the Checkbox.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Checkbox.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
} as any;

export { Checkbox };
