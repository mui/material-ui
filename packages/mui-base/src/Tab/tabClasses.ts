import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `selected={true}`. */
  selected: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
}

export type TabClassKey = keyof TabClasses;

export function getTabUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTab', slot);
}

const tabClasses: TabClasses = generateUtilityClasses('MuiTab', ['root', 'selected', 'disabled']);

export default tabClasses;
