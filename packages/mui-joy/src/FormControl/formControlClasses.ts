import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface FormControlClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** State class applied to the root element if `value` is valid. */
  filled: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** State class applied to the root element if `required={true}`. */
  required: string;
  /** Styles applied to the input element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the input element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the input element if `size="lg"`. */
  sizeLg: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFormControl', slot);
}

const formControlClasses: FormControlClasses = generateUtilityClasses('MuiFormControl', [
  'root',
  'disabled',
  'error',
  'filled',
  'focused',
  'required',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default formControlClasses;
