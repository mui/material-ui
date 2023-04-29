import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the listbox element. */
  listbox: string;
  /** State class applied to the root `Popper` element and the listbox `ul` element if `open={true}`. */
  expanded: string;
}

export type MenuClassKey = keyof MenuClasses;

export function getMenuUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu', slot);
}

const menuClasses: MenuClasses = generateUtilityClasses('MuiMenu', ['root', 'listbox', 'expanded']);

export default menuClasses;
