export interface ButtonBaseClasses {
  root: string;
  disabled: string;
  focusVisible: string;
}

declare const buttonBaseClasses: ButtonBaseClasses;

export function getButtonBaseUtilityClass(part: string): string;

export default buttonBaseClasses;
