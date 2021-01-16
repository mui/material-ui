export interface ButtonBaseClasses {
  root: string;
  disabled: string;
  focusVisible: string;
}

declare const buttonBaseClasses: ButtonBaseClasses;

export function getButtonBaseUtilityClass(slot: string): string;

export default buttonBaseClasses;
