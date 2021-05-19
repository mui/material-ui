import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getInputBaseUtilityClass(slot) {
  return generateUtilityClass('MuiInputBase', slot);
}

const inputBaseClasses = generateUtilityClasses('MuiInputBase', [
  'root',
  'formControl',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'sizeSmall',
  'multiline',
  'colorSecondary',
  'fullWidth',
  'hiddenLabel',
  'input',
  'inputSizeSmall',
  'inputMultiline',
  'inputTypeSearch',
  'inputAdornedStart',
  'inputAdornedEnd',
  'inputHiddenLabel',
]);

export default inputBaseClasses;
