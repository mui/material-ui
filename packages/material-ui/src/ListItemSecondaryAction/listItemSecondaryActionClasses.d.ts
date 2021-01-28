export interface ListItemSecondaryActionClasses {
  root: string;
  disableGutters: string;
}

declare const listItemSecondaryActionClasses: ListItemSecondaryActionClasses;

export function getListItemSecondaryActionClassesUtilityClass(slot: string): string;

export default listItemSecondaryActionClasses;
