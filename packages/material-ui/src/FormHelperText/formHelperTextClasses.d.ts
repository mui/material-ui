export interface FormHelperTextClasses {
  root: string;
  error: string;
  disabled: string;
  sizeSmall: string;
  sizeMedium: string;
  contained: string;
  focused: string;
  filled: string;
  required: string;
}

declare const formHelperTextClasses: FormHelperTextClasses;

export function getFormHelperTextUtilityClasses(slot: string): string;

export default formHelperTextClasses;
