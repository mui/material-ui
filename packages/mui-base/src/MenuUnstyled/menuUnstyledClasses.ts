import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuUnstyledClasses {
  root: string;
}

export type MenuUnstyledClassKey = keyof MenuUnstyledClasses;

export function getMenuUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuUnstyled', slot);
}

const menuUnstyledClasses: MenuUnstyledClasses = generateUtilityClasses('MuiMenuUnstyled', [
  'root',
]);

export default menuUnstyledClasses;
