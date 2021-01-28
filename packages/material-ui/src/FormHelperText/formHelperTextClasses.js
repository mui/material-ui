import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass('MuiFormHelperText', slot);
}

const formHelperTextClasses = generateUtilityClasses('MuiFormHelperText', [
  'root',
  'error',
  'disabled',
  'sizeSmall',
  'sizeMedium',
  'contained',
  'focused',
  'filled',
  'required',
]);

export default formHelperTextClasses;
