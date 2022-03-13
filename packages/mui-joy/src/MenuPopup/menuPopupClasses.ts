import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface MenuPopupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuPopupClassKey = keyof MenuPopupClasses;

export function getMenuPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPopup', slot);
}

const menuPopupClasses: MenuPopupClasses = generateUtilityClasses('MuiMenuPopup', ['root']);

export default menuPopupClasses;
