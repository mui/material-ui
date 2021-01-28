export interface FilledInputClasses {
  root: string;
  underline: string;
  input: string;
}

declare const filledInputClasses: FilledInputClasses;

export function getFilledInputUtilityClass(slot: string): string;

export default filledInputClasses;
