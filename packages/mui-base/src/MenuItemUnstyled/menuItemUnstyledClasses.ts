import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuItemUnstyledClasses {
  root: string;
  disabled: string;
  focusVisible: string;
}

export type MenuItemUnstyledClassKey = keyof MenuItemUnstyledClasses;

export function getMenuItemUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseMenuItem', slot);
}

const menuItemUnstyledClasses: MenuItemUnstyledClasses = generateUtilityClasses('BaseMenuItem', [
  'root',
  'disabled',
  'focusVisible',
]);

export default menuItemUnstyledClasses;
