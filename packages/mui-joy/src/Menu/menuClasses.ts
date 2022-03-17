import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface MenuClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuClassKey = keyof MenuClasses;

export function getMenuUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu', slot);
}

const menuClasses: MenuClasses = generateUtilityClasses('MuiMenu', ['root']);

export default menuClasses;
