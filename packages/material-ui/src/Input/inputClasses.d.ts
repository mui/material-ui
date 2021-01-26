export interface InputClasses {
  root: string;
  underline: string;
  input: string;
}

declare const inputClasses: InputClasses;

export function getInputUtilityClass(slot: string): string;

export default inputClasses;
