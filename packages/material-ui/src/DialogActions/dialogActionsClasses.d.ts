export interface DialogActionsClasses {
  root: string;
  spacing: string;
}

declare const dialogActionsClasses: DialogActionsClasses;

export function getDialogActionsUtilityClass(slot: string): string;

export default dialogActionsClasses;
