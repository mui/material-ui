import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { NumberFieldOwnerState, NumberFieldProps } from '../NumberField.types';
import type { NumberFieldClasses } from '../numberFieldClasses';
import NumberFieldControlsSlot from '../NumberFieldControlsSlot';

interface GetControlElementsOptions {
  IncrementButton: React.ReactNode;
  DecrementButton: React.ReactNode;
  classes: Pick<NumberFieldClasses, 'controls'>;
  ownerState: NumberFieldOwnerState;
  baseState: BaseNumberField.Root.State;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

/**
 * Places the stepper buttons in the start and end adornments.
 */
function getControlElements({
  IncrementButton,
  DecrementButton,
  classes,
  ownerState,
  baseState,
  externalForwardedProps,
}: GetControlElementsOptions): {
  startControls: React.ReactNode | null;
  endControls: React.ReactNode | null;
} {
  const { controlsPosition } = ownerState;
  const controlProps = {
    className: classes.controls,
    materialProps: ownerState,
    baseState,
    externalForwardedProps,
  };
  let startControls: React.ReactNode = null;
  let endControls: React.ReactNode = null;

  switch (controlsPosition) {
    case false:
      break;
    case 'split':
      startControls = (
        <NumberFieldControlsSlot position="start" {...controlProps}>
          {DecrementButton}
        </NumberFieldControlsSlot>
      );
      endControls = (
        <NumberFieldControlsSlot position="end" {...controlProps}>
          {IncrementButton}
        </NumberFieldControlsSlot>
      );
      break;
    case 'stacked':
      endControls = (
        <NumberFieldControlsSlot position="end" {...controlProps}>
          {IncrementButton}
          {DecrementButton}
        </NumberFieldControlsSlot>
      );
      break;
    case 'end':
    default:
      endControls = (
        <NumberFieldControlsSlot position="end" {...controlProps}>
          {DecrementButton}
          {IncrementButton}
        </NumberFieldControlsSlot>
      );
  }

  return { startControls, endControls };
}

export default getControlElements;
