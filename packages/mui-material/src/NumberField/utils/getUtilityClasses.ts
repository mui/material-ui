import composeClasses from '@mui/utils/composeClasses';
import type { NumberFieldOwnerState } from '../NumberField.types';
import { getNumberFieldUtilityClass } from '../numberFieldClasses';

const getUtilityClasses = (ownerState: NumberFieldOwnerState) => {
  const { classes, scrubbing } = ownerState;

  const slots = {
    root: ['root', scrubbing && 'scrubbing'],
    input: ['input'],
    htmlInput: ['htmlInput'],
    inputLabel: ['inputLabel'],
    formHelperText: ['formHelperText'],
    controls: ['controls'],
    startAdornment: ['startAdornment'],
    endAdornment: ['endAdornment'],
    scrubArea: ['scrubArea'],
    scrubAreaCursor: ['scrubAreaCursor'],
    incrementButton: ['incrementButton'],
    decrementButton: ['decrementButton'],
  };

  return composeClasses(slots, getNumberFieldUtilityClass, classes);
};

export default getUtilityClasses;
