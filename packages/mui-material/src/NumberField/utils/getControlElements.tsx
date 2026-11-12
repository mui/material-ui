import InputAdornment from '../../InputAdornment';

import { styled } from '../../zero-styled';
import type { NumberFieldOwnerState } from '../NumberField.types';
import type { NumberFieldClasses } from '../numberFieldClasses';
import getAdornedStart from './getAdornedStart';

const Controls = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'Controls',
})<{ ownerState: NumberFieldOwnerState }>({
  variants: [
    {
      props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
        ownerState.controlsPosition === 'stacked',
      style: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        height: 'auto',
        maxHeight: 'none',
      },
    },
  ],
});

interface GetControlElementsOptions {
  controlsPosition: NumberFieldOwnerState['controlsPosition'];
  IncrementButton: React.ReactNode;
  DecrementButton: React.ReactNode;
  startAdornment?: React.ReactNode;
  classes: Pick<NumberFieldClasses, 'controls'>;
  ownerState: NumberFieldOwnerState;
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
}: GetControlElementsOptions): {
  startControls: React.ReactNode | null;
  endControls: React.ReactNode | null;
  adornedStart: boolean;
} {
  const controlProps = { className: classes.controls, ownerState };
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
