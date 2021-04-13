import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass('MuiOutlinedInput', slot);
}

const outlinedInputClasses = generateUtilityClasses('MuiOutlinedInput', [
  'root',
  'focused',
  'error',
  'disabled',
  'notchedOutline',
  'input',
]);

export default outlinedInputClasses;
