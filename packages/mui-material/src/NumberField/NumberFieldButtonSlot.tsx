import * as React from 'react';

import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';

import type { NumberFieldOwnerState } from './NumberField.types';
import type { IconButtonProps } from '../IconButton';
import { omitNullishEventHandlers } from './utils';

interface NumberFieldButtonProps {
  ButtonSlot: React.ElementType;
  buttonProps: IconButtonProps;
  baseProps: React.ComponentPropsWithRef<'button'>;
  baseState: BaseNumberField.Decrement.State | BaseNumberField.Increment.State;
  materialProps: NumberFieldOwnerState;
}

/**
 * @ignore - internal component.
 *
 * Renders an increment/decrement button slot for the NumberField component, merging Base and Material props.
 */
const NumberFieldButtonSlot = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
  (props: NumberFieldButtonProps, forwardedRef) => {
    const { ButtonSlot, baseProps, baseState, materialProps, buttonProps } = props;

    // mergeProps composes handlers, classes, and styles, but not refs.
    const ref = useForkRef(baseProps.ref, buttonProps.ref, forwardedRef);

    // Material should also display read-only controls as unavailable.
    const disabled = baseState.disabled || baseState.readOnly;

    // Keep nativeButton off the DOM when the slot is a host element.
    const consumerButtonProps = omitNullishEventHandlers(
      buttonProps,
      ([key]) => !(key === 'nativeButton' && typeof ButtonSlot === 'string'),
    );

    // Consumer handlers run first and can prevent Base's behavior.
    // Custom Material slots also support a broader `type` prop than native buttons.
    const mergedButtonProps: React.ComponentPropsWithRef<'button'> = mergeProps<'button'>(
      baseProps,
      consumerButtonProps as React.ComponentPropsWithRef<'button'>,
    );
    const mergedProps = appendOwnerState(
      ButtonSlot,
      {
        ...mergedButtonProps,
        // Preserve Base's resolved availability after consumer props.
        disabled,
        ref,
      },
      {
        ...materialProps,
        disabled,
        readOnly: baseState.readOnly,
      },
    );

    const isNonNativeActivation = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const element = event.currentTarget;
      return (
        buttonProps.nativeButton === false &&
        event.target === element &&
        element.tagName !== 'BUTTON' &&
        !(element.tagName === 'A' && element.hasAttribute('href'))
      );
    };

    // Base UI owns non-native activation. Prevent Material's fallback after the
    // composed handlers run, preserving consumer cancellation and native buttons/links.
    const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
      mergedProps.onKeyDown?.(event);
      if (isNonNativeActivation(event) && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
      }
    };

    const handleKeyUp: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
      mergedProps.onKeyUp?.(event);
      if (isNonNativeActivation(event) && event.key === ' ') {
        event.preventDefault();
      }
    };

    return <ButtonSlot {...mergedProps} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />;
  },
);

export default NumberFieldButtonSlot;
