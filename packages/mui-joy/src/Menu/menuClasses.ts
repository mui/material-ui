import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface MenuClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuClassKey = keyof MenuClasses;

export function getMenuUtilityClass(slot: string): string {
  return generateUtilityClass('JoyMenu', slot);
}

const menuClasses: MenuClasses = generateUtilityClasses('JoyMenu', ['root']);

export default menuClasses;
