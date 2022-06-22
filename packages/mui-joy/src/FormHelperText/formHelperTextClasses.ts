import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface FormHelperTextClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the asterisk element. */
  asterisk: string;
}

export type FormHelperTextClassKey = keyof FormHelperTextClasses;

export function getFormHelperTextUtilityClass(slot: string): string {
  return generateUtilityClass('JoyFormHelperText', slot);
}

const formHelperTextClasses: FormHelperTextClasses = generateUtilityClasses('JoyFormHelperText', [
  'root',
  'asterisk',
]);

export default formHelperTextClasses;
