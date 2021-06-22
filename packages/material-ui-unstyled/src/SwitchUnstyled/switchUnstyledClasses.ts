import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SwitchUnstyledClasses {
  root: string;
  input: string;
  thumb: string;
  checked: string;
  disabled: string;
  focusVisible: string;
  readOnly: string;
}

export type SwitchUnstyledClassKey = keyof SwitchUnstyledClasses;

export function getSwitchUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('SwitchUnstyled', slot);
}

const switchUnstyledClasses: SwitchUnstyledClasses = generateUtilityClasses('MuiSwitch', [
  'root',
  'input',
  'thumb',
  'checked',
  'disabled',
  'focusVisible',
  'readOnly',
]);

export default switchUnstyledClasses;
