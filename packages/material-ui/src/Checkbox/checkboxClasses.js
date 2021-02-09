import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCheckboxUtilityClass(slot) {
  return generateUtilityClass('MuiCheckbox', slot);
}

const checkboxClasses = generateUtilityClasses('MuiCheckbox', [
  'root',
  'checked',
  'disabled',
  'indeterminate',
  'colorPrimary',
  'colorSecondary',
]);

export default checkboxClasses;
