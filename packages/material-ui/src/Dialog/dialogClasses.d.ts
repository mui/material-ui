import { DialogClassKey } from './Dialog';

declare const dialogClasses: Record<DialogClassKey, string>;

export function getDialogUtilityClass(slot: string): string;

export default dialogClasses;
