import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

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
