import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Menu';

export interface MenuClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the listbox element. */
  listbox: string;
  /** State class applied to the root element if `open={true}`. */
  expanded: string;
}

export type MenuClassKey = keyof MenuClasses;

export function getMenuUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const menuClasses: MenuClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'listbox',
  'expanded',
]);
