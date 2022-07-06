import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SelectUnstyledClasses {
  root: string;
  button: string;
  listbox: string;
  popper: string;
  active: string;
  expanded: string;
  disabled: string;
  focusVisible: string;
}

export type SelectUnstyledClassKey = keyof SelectUnstyledClasses;

export function getSelectUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseSelect', slot);
}

const selectUnstyledClasses: SelectUnstyledClasses = generateUtilityClasses('BaseSelect', [
  'root',
  'button',
  'listbox',
  'popper',
  'active',
  'expanded',
  'disabled',
  'focusVisible',
]);

export default selectUnstyledClasses;
