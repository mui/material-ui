import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Select';

export interface SelectClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the listbox element. */
  listbox: string;
  /** Class name applied to the popper element. */
  popup: string;
  /** State class applied to the root `button` element if `active={true}`. */
  active: string;
  /** State class applied to the root `button` element if `expanded={true}`. */
  expanded: string;
  /** State class applied to the root `button` element and the listbox 'ul' element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type SelectClassKey = keyof SelectClasses;

export function getSelectUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const selectClasses: SelectClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'button',
  'listbox',
  'popup',
  'active',
  'expanded',
  'disabled',
  'focusVisible',
]);
