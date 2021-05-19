import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getRadioUtilityClass(slot) {
  return generateUtilityClass('MuiRadio', slot);
}

const radioClasses = generateUtilityClasses('MuiRadio', [
  'root',
  'checked',
  'disabled',
  'colorPrimary',
  'colorSecondary',
]);

export default radioClasses;
