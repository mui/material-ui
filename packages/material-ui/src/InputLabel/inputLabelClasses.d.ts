export interface InputLabelClasses {
  root: string;
  focused: string;
  disabled: string;
  error: string;
  required: string;
  asterisk: string;
  formControl: string;
  sizeSmall: string;
  shrink: string;
  animated: string;
  filled: string;
  outlined: string;
}

declare const inputLabelClasses: InputLabelClasses;

export function getInputLabelUtilityClasses(slot: string): string;

export default inputLabelClasses;
