export interface InputBaseClasses {
  root: string;
  formControl: string;
  focused: string;
  disabled: string;
  adornedStart: string;
  adornedEnd: string;
  error: string;
  sizeSmall: string;
  multiline: string;
  colorSecondary: string;
  fullWidth: string;
  hiddenLabel: string;
  input: string;
  inputSizeSmall: string;
  inputMultiline: string;
  inputTypeSearch: string;
  inputAdornedStart: string;
  inputAdornedEnd: string;
  inputHiddenLabel: string;
}

declare const inputBaseClasses: InputBaseClasses;

export function getInputBaseUtilityClass(slot: string): string;

export default inputBaseClasses;
