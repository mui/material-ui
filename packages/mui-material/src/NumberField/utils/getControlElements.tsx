import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { NumberFieldOwnerState, NumberFieldProps } from '../NumberField.types';
import type { NumberFieldClasses } from '../numberFieldClasses';
import Controls from '../NumberFieldControlsSlot';
import getAdornedStart from './getAdornedStart';

interface GetControlElementsOptions {
  controlsPosition: NumberFieldOwnerState['controlsPosition'];
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
  controlsPosition,
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
        <Controls position="start" {...controlProps}>
          {DecrementButton}
        </Controls>
      );
      endControls = (
        <Controls position="end" {...controlProps}>
          {IncrementButton}
        </Controls>
      );
      break;
    case 'stacked':
      endControls = (
        <Controls position="end" {...controlProps}>
          {IncrementButton}
          {DecrementButton}
        </Controls>
      );
      break;
    case 'end':
    default:
      endControls = (
        <Controls position="end" {...controlProps}>
          {DecrementButton}
          {IncrementButton}
        </Controls>
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
