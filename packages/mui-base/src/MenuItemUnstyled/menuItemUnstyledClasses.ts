import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuItemUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type MenuItemUnstyledClassKey = keyof MenuItemUnstyledClasses;

export function getMenuItemUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

const menuItemUnstyledClasses: MenuItemUnstyledClasses = generateUtilityClasses('MuiMenuItem', [
  'root',
  'disabled',
  'focusVisible',
]);

export default menuItemUnstyledClasses;
