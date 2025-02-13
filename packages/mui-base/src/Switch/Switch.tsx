'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useSwitch } from '../useSwitch';
import {
  SwitchProps,
  SwitchOwnerState,
  SwitchInputSlotProps,
  SwitchRootSlotProps,
  SwitchThumbSlotProps,
  SwitchTrackSlotProps,
  SwitchTypeMap,
} from './Switch.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getSwitchUtilityClass } from './switchClasses';

const useUtilityClasses = (ownerState: SwitchOwnerState) => {
  const { checked, disabled, focusVisible, readOnly } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    thumb: ['thumb'],
    input: ['input'],
    track: ['track'],
  };

  return composeClasses(slots, useClassNamesOverride(getSwitchUtilityClass));
};

/**
 * The foundation for building custom-styled switches.
 *
 * Demos:
 *
 * - [Switch](https://mui.com/base-ui/react-switch/)
 *
 * API:
 *
 * - [Switch API](https://mui.com/base-ui/react-switch/components-api/#switch)
 */
const Switch = React.forwardRef(function Switch<RootComponentType extends React.ElementType>(
  props: SwitchProps<RootComponentType>,
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

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(props);

  const ownerState: SwitchOwnerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
  };

  const classes = useUtilityClasses(ownerState);

  const Root: React.ElementType = slots.root ?? 'span';
  const rootProps: WithOptionalOwnerState<SwitchRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  const Thumb: React.ElementType = slots.thumb ?? 'span';
  const thumbProps: WithOptionalOwnerState<SwitchThumbSlotProps> = useSlotProps({
    elementType: Thumb,
    externalSlotProps: slotProps.thumb,
    ownerState,
    className: classes.thumb,
  });

  const Input: React.ElementType = slots.input ?? 'input';
  const inputProps: WithOptionalOwnerState<SwitchInputSlotProps> = useSlotProps({
    elementType: Input,
    getSlotProps: getInputProps,
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input,
  });

  const Track: React.ElementType = slots.track === null ? () => null : (slots.track ?? 'span');
  const trackProps: WithOptionalOwnerState<SwitchTrackSlotProps> = useSlotProps({
    elementType: Track,
    externalSlotProps: slotProps.track,
    ownerState,
    className: classes.track,
  });

  return (
    <Root {...rootProps}>
      <Track {...trackProps} />
      <Thumb {...thumbProps} />
      <Input {...inputProps} />
    </Root>
  );
}) as PolymorphicComponent<SwitchTypeMap>;

Switch.propTypes /* remove-proptypes */ = {
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
   * The props used for each slot inside the Switch.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.oneOfType([PropTypes.elementType, PropTypes.oneOf([null])]),
  }),
} as any;

export { Switch };
