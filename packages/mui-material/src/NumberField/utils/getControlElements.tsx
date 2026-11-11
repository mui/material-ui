import InputAdornment from '../../InputAdornment';

import { styled } from '../../zero-styled';
import type { NumberFieldOwnerState } from '../NumberField.types';
import type { NumberFieldClasses } from '../numberFieldClasses';

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
  classes: Pick<NumberFieldClasses, 'controls'>;
  ownerState: NumberFieldOwnerState;
}

/**
 * Places the built-in controls in the input's start/end adornments.
 */
function getControlElements({
  controlsPosition,
  IncrementButton,
  DecrementButton,
  classes,
  ownerState,
}: GetControlElementsOptions): {
  startControls: React.ReactNode | null;
  endControls: React.ReactNode | null;
} {
  const controlProps = { className: classes.controls, ownerState };

  switch (controlsPosition) {
    case false:
      return {
        startControls: null,
        endControls: null,
      };
    case 'split':
      return {
        startControls: (
          <Controls position="start" {...controlProps}>
            {DecrementButton}
          </Controls>
        ),
        endControls: (
          <Controls position="end" {...controlProps}>
            {IncrementButton}
          </Controls>
        ),
      };
    case 'stacked':
      return {
        startControls: null,
        endControls: (
          <Controls position="end" {...controlProps}>
            {IncrementButton}
            {DecrementButton}
          </Controls>
        ),
      };
    case 'end':
    default: {
      if (process.env.NODE_ENV !== 'production') {
        if (controlsPosition !== 'end') {
          console.error(
            `MUI: "controlsPosition" is invalid: ${controlsPosition}. Use "stacked", "end", "split" or false. Falling back to "end".`,
          );
        }
      }

      return {
        startControls: null,
        endControls: (
          <Controls position="end" {...controlProps}>
            {DecrementButton}
            {IncrementButton}
          </Controls>
        ),
      };
    }
  }
}

export default getControlElements;
