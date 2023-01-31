import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuItemUnstyledClasses {
  root: string;
  disabled: string;
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
