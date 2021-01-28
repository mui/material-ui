export interface SwitchBaseClasses {
  root: string;
  checked: string;
  disabled: string;
  input: string;
}

declare const switchBaseClasses: SwitchBaseClasses;

export function getSwitchBaseUtilityClass(slot: string): string;

export default switchBaseClasses;
