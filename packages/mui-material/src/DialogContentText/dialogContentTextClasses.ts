import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface DialogContentTextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type DialogContentTextClassKey = keyof DialogContentTextClasses;

export function getDialogContentTextUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogContentText', slot);
}

export const getDialogContentTextClasses = (): DialogContentTextClasses => generateUtilityClasses(
  'MuiDialogContentText',
  ['root'],
);

const dialogContentTextClasses = getDialogContentTextClasses();

export default dialogContentTextClasses;
