import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface DialogActionsClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type DialogActionsClassKey = keyof DialogActionsClasses;

export function getDialogActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogActions', slot);
}

const dialogActionsClasses: DialogActionsClasses = generateUtilityClasses('MuiDialogActions', [
  'root',
]);

export default dialogActionsClasses;
