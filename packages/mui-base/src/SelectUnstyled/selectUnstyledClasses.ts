import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SelectUnstyledClasses {
  root: string;
  button: string;
  listbox: string;
  option: string;
  active: string;
  expanded: string;
  disabled: string;
  focusVisible: string;
  selected: string;
  highlighted: string;
  groupRoot: string;
  groupHeader: string;
  groupOptions: string;
}

export type SelectUnstyledClassKey = keyof SelectUnstyledClasses;

export function getSelectUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSelectUnstyled', slot);
}

const selectUnstyledClasses: SelectUnstyledClasses = generateUtilityClasses('MuiSelectUnstyled', [
  'root',
  'button',
  'listbox',
  'option',
  'active',
  'expanded',
  'disabled',
  'focusVisible',
  'selected',
  'highlighted',
  'groupRoot',
  'groupHeader',
  'groupOptions',
]);

export default selectUnstyledClasses;
