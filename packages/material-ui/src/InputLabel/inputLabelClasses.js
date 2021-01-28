import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiInputLabel', slot);
}

const inputLabelClasses = generateUtilityClasses('MuiInputLabel', [
  'root',
  'focused',
  'disabled',
  'error',
  'required',
  'asterisk',
  'formControl',
  'sizeSmall',
  'shrink',
  'animated',
  'filled',
  'outlined',
]);

export default inputLabelClasses;
