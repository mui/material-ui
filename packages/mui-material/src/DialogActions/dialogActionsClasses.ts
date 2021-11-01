import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface DialogActionsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `disableSpacing={true}`. */
  spacing: string;
}

export type DialogActionsClassKey = keyof DialogActionsClasses;

export function getDialogActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogActions', slot);
}

export const getDialogActionsClasses = (): DialogActionsClasses => generateUtilityClasses('MuiDialogActions', [
  'root',
  'spacing',
]);

const dialogActionsClasses = getDialogActionsClasses();

export default dialogActionsClasses;
