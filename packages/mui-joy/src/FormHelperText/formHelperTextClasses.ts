import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface FormHelperTextClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type FormHelperTextClassKey = keyof FormHelperTextClasses;

export function getFormHelperTextUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFormHelperText', slot);
}

const formHelperTextClasses: FormHelperTextClasses = generateUtilityClasses('MuiFormHelperText', [
  'root',
]);

export default formHelperTextClasses;
