import * as React from 'react';

import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';

import type { NumberFieldOwnerState } from './NumberField.types';
import type { IconButtonProps } from '../IconButton';
import { omitNullishEventHandlers } from './utils';
import RenderElement from './RenderElement';

type StepperKeyboardEvent = React.KeyboardEvent<HTMLButtonElement> & {
  defaultMuiPrevented?: boolean | undefined;
};

interface NumberFieldButtonProps {
  ButtonSlot: React.ElementType;
  buttonProps: IconButtonProps;
  baseProps: React.ComponentPropsWithRef<'button'>;
  baseState: BaseNumberField.Decrement.State | BaseNumberField.Increment.State;
  materialProps: NumberFieldOwnerState;
  render?: BaseNumberField.Increment.Props['render'] | undefined;
}

/**
 * @ignore - internal component.
 *
 * Renders an increment/decrement button slot for the NumberField component, merging Base and Material props.
 */
function NumberFieldButtonSlot(props: NumberFieldButtonProps) {
  const { ButtonSlot, baseProps, baseState, materialProps, buttonProps, render } = props;

  // mergeProps composes handlers, classes, and styles, but not refs.
  const ref = useForkRef(baseProps.ref, buttonProps.ref);

  // Material should also display read-only controls as unavailable.
  const disabled = baseState.disabled || baseState.readOnly;
  const size = buttonProps.size ?? materialProps.size;

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
      size,
    },
    {
      ...materialProps,
      disabled,
      readOnly: baseState.readOnly,
      size,
    },
  );

  return (
    <ButtonSlot
      {...mergedProps}
      {...(render && {
        // Replace IconButton's underlying element while preserving its styles and handlers.
        component: RenderElement,
        render,
        renderState: baseState,
        // The bridge is a custom component, so ButtonBase cannot infer its native-button mode.
        nativeButton: buttonProps.nativeButton ?? true,
      })}
      {...(buttonProps.nativeButton === false && {
        // Base UI owns keyboard activation for non-native steppers.
        onKeyDown(event: StepperKeyboardEvent) {
          mergedProps.onKeyDown?.(event);
          if (
            event.target === event.currentTarget &&
            (event.key === 'Enter' || event.key === ' ')
          ) {
            event.defaultMuiPrevented = true;
            if (event.key === ' ') {
              // Canceling the Base UI handler also skips its scroll prevention.
              event.preventDefault();
            }
          }
        },
        onKeyUp(event: StepperKeyboardEvent) {
          mergedProps.onKeyUp?.(event);
          if (event.target === event.currentTarget && event.key === ' ') {
            event.defaultMuiPrevented = true;
          }
        },
      })}
    />
  );
}

export default NumberFieldButtonSlot;
