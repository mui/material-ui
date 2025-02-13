import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Popup';

export interface PopupClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element when the popup is open. */
  open: string;
}

export type PopupClassKey = keyof PopupClasses;

export function getPopupUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const popupClasses: PopupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'open']);
