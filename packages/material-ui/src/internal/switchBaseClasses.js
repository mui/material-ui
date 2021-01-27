import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass('PrivateSwitchBase', slot);
}

const switchBaseClasses = generateUtilityClasses('PrivateSwitchBase', [
  'root',
  'checked',
  'disabled',
  'input',
]);

export default switchBaseClasses;
