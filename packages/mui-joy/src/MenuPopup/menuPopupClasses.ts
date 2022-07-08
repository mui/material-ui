import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface MenuPopupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuPopupClassKey = keyof MenuPopupClasses;

export function getMenuPopupUtilityClass(slot: string): string {
  return generateUtilityClass('JoyMenuPopup', slot);
}

const menuPopupClasses: MenuPopupClasses = generateUtilityClasses('JoyMenuPopup', ['root']);

export default menuPopupClasses;
