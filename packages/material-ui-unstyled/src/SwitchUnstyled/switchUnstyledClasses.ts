import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SwitchUnstyledClasses {
  root: string;
  checked: string;
  disabled: string;
  input: string;
  thumb: string;
  button: string;
  focusVisible: string;
}

export type SwitchUnstyledClassKey = keyof SwitchUnstyledClasses;

export function getSwitchUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('SwitchUnstyled', slot);
}

const switchUnstyledClasses: SwitchUnstyledClasses = generateUtilityClasses('SwitchUnstyled', [
  'root',
  'checked',
  'disabled',
  'input',
  'thumb',
  'button',
  'focusVisible',
]);

export default switchUnstyledClasses;
