import { DialogContentTextClassKey } from './DialogContentText';

export type DialogContentTextClasses = Record<DialogContentTextClassKey, string>;

declare const dialogContentTextClasses: DialogContentTextClasses;

export function getDialogContentTextUtilityClass(slot: string): string;

export default dialogContentTextClasses;
