import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface DrawerClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element when open is false. */
  hidden: string;
  /** Class name applied to the backdrop element. */
  backdrop: string;
  /** Class name applied to the content element. */
  content: string;
}

export type DrawerClassKey = keyof DrawerClasses;

export function getDrawerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDrawer', slot);
}

const drawerClasses: DrawerClasses = generateUtilityClasses('MuiDrawer', [
  'root',
  'hidden',
  'backdrop',
  'content',
]);

export default drawerClasses;
