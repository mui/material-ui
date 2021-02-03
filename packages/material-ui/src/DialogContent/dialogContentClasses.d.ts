import { DialogContentClassKey } from './DialogContent';

declare const dialogContentClasses: Record<DialogContentClassKey, string>;

export function getDialogContentUtilityClass(slot: string): string;

export default dialogContentClasses;
