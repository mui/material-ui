import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuUnstyledClasses {
  root: string;
  listbox: string;
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
