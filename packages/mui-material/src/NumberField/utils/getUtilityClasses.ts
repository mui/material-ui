import composeClasses from '@mui/utils/composeClasses';
import type { NumberFieldOwnerState } from '../NumberField.types';
import { getNumberFieldUtilityClass } from '../numberFieldClasses';

const getUtilityClasses = (ownerState: NumberFieldOwnerState) => {
  const { classes, scrubbing } = ownerState;

  const slots = {
    root: ['root', scrubbing && 'scrubbing'],
    controls: ['controls'],
    scrubArea: ['scrubArea'],
    scrubAreaAdornment: ['scrubAreaAdornment'],
    scrubAreaCursor: ['scrubAreaCursor'],
    incrementButton: ['incrementButton'],
    decrementButton: ['decrementButton'],
  };

  return composeClasses(slots, getNumberFieldUtilityClass, classes);
};

export default getUtilityClasses;
