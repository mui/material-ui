import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

export interface PopupClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element when the popup is open. */
  open: string;
}

export type PopupClassKey = keyof PopupClasses;

export function getPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopup', slot);
}

export const popupClasses: PopupClasses = generateUtilityClasses('MuiPopup', ['root', 'open']);
