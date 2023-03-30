import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `selected={true}`. */
  selected: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
}

export type TabUnstyledClassKey = keyof TabUnstyledClasses;

export function getTabUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTab', slot);
}

const tabUnstyledClasses: TabUnstyledClasses = generateUtilityClasses('MuiTab', [
  'root',
  'selected',
  'disabled',
]);

export default tabUnstyledClasses;
