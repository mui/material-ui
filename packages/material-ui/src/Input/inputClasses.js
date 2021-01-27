import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export function getInputUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}

const inputClasses = generateUtilityClasses('MuiInput', ['root', 'underline', 'input']);

export default inputClasses;
