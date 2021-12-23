import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SelectUnstyledClasses {
  root: string;
  button: string;
  listbox: string;
  active: string;
  expanded: string;
  disabled: string;
  focusVisible: string;
}

export type SelectUnstyledClassKey = keyof SelectUnstyledClasses;

export function getSelectUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSelectUnstyled', slot);
}

const selectUnstyledClasses: SelectUnstyledClasses = generateUtilityClasses('MuiSelectUnstyled', [
  'root',
  'button',
  'listbox',
  'active',
  'expanded',
  'disabled',
  'focusVisible',
]);

export default selectUnstyledClasses;
