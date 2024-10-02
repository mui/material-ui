import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'FormControl';

export interface FormControlClasses {
  /** Class applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** State class applied to the root element if the inner input has value. */
  filled: string;
  /** State class applied to the root element if the inner input is focused. */
  focused: string;
  /** State class applied to the root element if `required={true}`. */
  required: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const formControlClasses: FormControlClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'disabled',
  'error',
  'filled',
  'focused',
  'required',
]);
