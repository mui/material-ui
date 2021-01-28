export interface FormLabelClasses {
  root: string;
  colorSecondary: string;
  focused: string;
  disabled: string;
  error: string;
  filled: string;
  required: string;
  asterisk: string;
}

declare const formLabelClasses: FormLabelClasses;

export function getFormLabelUtilityClasses(slot: string): string;

export default formLabelClasses;
