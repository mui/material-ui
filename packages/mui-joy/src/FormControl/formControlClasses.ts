import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface FormControlClasses {
  /** Styles applied to the root element. */
  root: string;
  error: string;
  disabled: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClass(slot: string): string {
  return generateUtilityClass('JoyFormControl', slot);
}

const formControlClasses: FormControlClasses = generateUtilityClasses('JoyFormControl', [
  'root',
  'error',
  'disabled',
]);

export default formControlClasses;
