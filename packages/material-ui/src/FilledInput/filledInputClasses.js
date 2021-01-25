import {
  generateUtilityClasses,
  generateUtilityClass,
} from '@material-ui/unstyled';

export function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}

const filledInputClasses = generateUtilityClasses('MuiInputBase', [
  'root',
  'colorSecondary',
  'focused',
  'underline',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'sizeSmall',
  'multiline',
  'hiddenLabel',
  'input',
  'inputSizeSmall',
  'inputHiddenLabel',
  'inputMultiline',
  'inputAdornedStart',
  'inputAdornedEnd',
]);

export default filledInputClasses;
