import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export function getFormControlUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControl', slot);
}

const formControlClasses = generateUtilityClasses('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);

export default formControlClasses;
