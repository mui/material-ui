import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface MenuItemClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('JoyMenuItem', slot);
}

const listItemButtonClasses: MenuItemClasses = generateUtilityClasses('JoyMenuItem', ['root']);

export default listItemButtonClasses;
