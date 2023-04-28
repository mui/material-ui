import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuItemClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

const menuItemClasses: MenuItemClasses = generateUtilityClasses('MuiMenuItem', [
  'root',
  'disabled',
  'focusVisible',
]);

export default menuItemClasses;
