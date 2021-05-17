import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface SwitchBaseClasses {
  root: string;
  checked: string;
  disabled: string;
  input: string;
}

export type SwitchBaseClassKey = keyof SwitchBaseClasses;

export function getSwitchBaseUtilityClass(slot: string): string {
  return generateUtilityClass('PrivateSwitchBase', slot);
}

const switchBaseClasses: SwitchBaseClasses = generateUtilityClasses('PrivateSwitchBase', [
  'root',
  'checked',
  'disabled',
  'input',
]);

export default switchBaseClasses;
