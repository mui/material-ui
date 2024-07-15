import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface DialogContentClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type DialogContentClassKey = keyof DialogContentClasses;

export function getDialogContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogContent', slot);
}

const dialogContentClasses: DialogContentClasses = generateUtilityClasses('MuiDialogContent', [
  'root',
]);

export default dialogContentClasses;
