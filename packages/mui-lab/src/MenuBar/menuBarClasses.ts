import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface MenuBarClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuBarClassKey = keyof MenuBarClasses;

export function getMenuBarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuBar', slot);
}

const menuBarClasses: MenuBarClasses = generateUtilityClasses('MuiMenuBar', ['root']);

export default menuBarClasses;
