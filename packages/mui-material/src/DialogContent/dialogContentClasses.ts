import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface DialogContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `dividers={true}`. */
  dividers: string;
}

export type DialogContentClassKey = keyof DialogContentClasses;

export function getDialogContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogContent', slot);
}

export const getDialogContentClasses = (): DialogContentClasses => generateUtilityClasses('MuiDialogContent', [
  'root',
  'dividers',
]);

const dialogContentClasses = getDialogContentClasses();

export default dialogContentClasses;
