import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { NumberFieldOwnerState, NumberFieldProps } from '../NumberField.types';
import type { NumberFieldClasses } from '../numberFieldClasses';
import Adornment from '../NumberFieldAdornmentSlot';
import getAdornedStart from './getAdornedStart';

interface GetControlElementsOptions {
  IncrementButton: React.ReactNode;
  DecrementButton: React.ReactNode;
  startAdornment?: React.ReactNode;
  classes: Pick<NumberFieldClasses, 'controls'>;
  ownerState: NumberFieldOwnerState;
  baseState: BaseNumberField.Root.State;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

/**
 * Resolves control placement and whether the input has a start adornment.
 */
function getControlElements({
  IncrementButton,
  DecrementButton,
  startAdornment,
  classes,
  ownerState,
  baseState,
  externalForwardedProps,
}: GetControlElementsOptions): {
  startControls: React.ReactNode | null;
  endControls: React.ReactNode | null;
  adornedStart: boolean;
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
        <Adornment slotName="controls" position="start" {...controlProps}>
          {DecrementButton}
        </Adornment>
      );
      endControls = (
        <Adornment slotName="controls" position="end" {...controlProps}>
          {IncrementButton}
        </Adornment>
      );
      break;
    case 'stacked':
      endControls = (
        <Adornment slotName="controls" position="end" {...controlProps}>
          {IncrementButton}
          {DecrementButton}
        </Adornment>
      );
      break;
    case 'end':
    default:
      endControls = (
        <Adornment slotName="controls" position="end" {...controlProps}>
          {DecrementButton}
          {IncrementButton}
        </Adornment>
      );
  }

  return {
    startControls,
    endControls,
    adornedStart: getAdornedStart({
      controlsPosition,
      scrubAreaPosition: ownerState.scrubAreaPosition,
      startAdornment,
    }),
  };
}

export default getControlElements;
