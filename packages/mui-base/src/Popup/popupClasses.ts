import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface PopupClasses {
  /** Class name applied to the root element. */
  root: string;

  open: string;
}

export type PopupClassKey = keyof PopupClasses;

export function getPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopup', slot);
}

const popupClasses: PopupClasses = generateUtilityClasses('MuiPopup', ['root', 'open']);

export default popupClasses;
