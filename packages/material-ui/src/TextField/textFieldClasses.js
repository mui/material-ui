import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiTextField', slot);
}

const textFieldClasses = generateUtilityClasses('MuiTextField', ['root']);

export default textFieldClasses;
