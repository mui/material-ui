import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}

const buttonBaseClasses = generateUtilityClasses('MuiButtonBase', [
  'root',
  'disabled',
  'focusVisible',
]);

export default buttonBaseClasses;
