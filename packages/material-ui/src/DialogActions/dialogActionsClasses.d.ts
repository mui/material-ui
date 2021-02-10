import { DialogActionsClassKey } from './DialogActions';

export type DialogActionsClasses = Record<DialogActionsClassKey, string>;

declare const dialogActionsClasses: DialogActionsClasses;

export function getDialogActionsUtilityClass(slot: string): string;

export default dialogActionsClasses;
