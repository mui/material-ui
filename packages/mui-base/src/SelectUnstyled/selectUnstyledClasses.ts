import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SelectUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the listbox element. */
  listbox: string;
  /** Class name applied to the popper element. */
  popper: string;
  /** State class applied to the root `button` element if `active={true}`. */
  active: string;
  /** State class applied to the root `button` element if `expanded={true}`. */
  expanded: string;
  /** State class applied to the root `button` element and the listbox 'ul' element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type SelectUnstyledClassKey = keyof SelectUnstyledClasses;

export function getSelectUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSelect', slot);
}

const selectUnstyledClasses: SelectUnstyledClasses = generateUtilityClasses('MuiSelect', [
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
