import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface DialogContentTextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type DialogContentTextClassKey = keyof DialogContentTextClasses;

export function getDialogContentTextUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogContentText', slot);
}

const dialogContentTextClasses: DialogContentTextClasses = generateUtilityClasses(
  'MuiDialogContentText',
  ['root'],
);

export default dialogContentTextClasses;
