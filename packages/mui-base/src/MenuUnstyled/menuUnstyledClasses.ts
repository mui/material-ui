import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the listbox element. */
  listbox: string;
  /** State class applied to the root `PopperUnstyled` element and the listbox `ul` element if `open={true}`. */
  expanded: string;
}

export type MenuUnstyledClassKey = keyof MenuUnstyledClasses;

export function getMenuUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu', slot);
}

const menuUnstyledClasses: MenuUnstyledClasses = generateUtilityClasses('MuiMenu', [
  'root',
  'listbox',
  'expanded',
]);

export default menuUnstyledClasses;
