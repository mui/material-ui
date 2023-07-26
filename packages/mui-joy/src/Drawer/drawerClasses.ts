import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface DrawerClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the sheets element. */
  sheet: string;
}

export type DrawerClassKey = keyof DrawerClasses;

export function getDrawerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDrawer', slot);
}

const drawerClasses: DrawerClasses = generateUtilityClasses('MuiDrawer', ['root', 'sheet']);

export default drawerClasses;
