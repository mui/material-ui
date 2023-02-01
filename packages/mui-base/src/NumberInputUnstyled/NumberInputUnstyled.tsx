import * as React from 'react';
import PropTypes from 'prop-types';
import useNumberInput from './useNumberInput';
import {
  NumberInputUnstyledProps,
  NumberInputUnstyledOwnerState,
} from './NumberInputUnstyled.types';
import { EventHandlers, useSlotProps } from '../utils';
/**
 *
 * Demos:
 *
 * - [hooks: useNumberInput](https://mui.com/base/react-number-input/)
 *
 * API:
 *
 * - [NumberInputUnstyled API](https://mui.com/base/react-number-input/components-api/#number-input-unstyled)
 */
const NumberInputUnstyled = React.forwardRef(function NumberInputUnstyled(
  props: NumberInputUnstyledProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forwardedRef: // TODO: this is for the root slot later
  React.ForwardedRef<any>,
) {
  // set up ALL the props
  const { id, slotProps = {}, slots = {} } = props;

  const { getInputProps } = useNumberInput(props);

  const ownerState: NumberInputUnstyledOwnerState = {
    ...props,
    type: 'text',
  };

  const propsToForward = {
    id,
  };

  // define the root slot

  // root -> useSlotProps

  // define the input slot
  const Input = slots.input ?? 'input';

  const inputProps = useSlotProps({
    elementType: Input,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsToForward }),
    externalSlotProps: slotProps.input,
    additionalProps: {},
    ownerState,
  });

  // input -> useSlotProps
  return <Input type="text" {...inputProps} />;
});

NumberInputUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
  }),
} as any;

export default NumberInputUnstyled;
