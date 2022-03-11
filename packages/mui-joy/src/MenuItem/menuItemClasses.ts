import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface MenuItemClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

const listItemButtonClasses: MenuItemClasses = generateUtilityClasses('MuiMenuItem', ['root']);

export default listItemButtonClasses;
