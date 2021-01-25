export interface FilledInputClasses {
  root: string;
  colorSecondary: string;
  underline: string;
  focused: string;
  disabled: string;
  adornedStart: string;
  adornedEnd: string;
  error: string;
  sizeSmall: string;
  multiline: string;
  hiddenLabel: string;
  input: string;
  inputSizeSmall: string;
  inputHiddenLabel: string;
  inputMultiline: string;
  inputAdornedStart: string;
  inputAdornedEnd: string;
}

declare const filledInputClasses: FilledInputClasses;

export function getFilledInputUtilityClass(slot: string): string;

export default filledInputClasses;
