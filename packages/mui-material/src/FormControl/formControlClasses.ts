import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface FormControlClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `margin="normal"`. */
  marginNormal: string;
  /** Styles applied to the root element if `margin="dense"`. */
  marginDense: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiFormControl', slot);
}

const formControlClasses: FormControlClasses = generateUtilityClasses('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);

export default formControlClasses;
