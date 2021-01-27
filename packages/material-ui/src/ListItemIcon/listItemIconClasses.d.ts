export interface ListItemIconClasses {
  root: string;
  alignItemsFlexStart: string;
}

declare const listItemIconClasses: ListItemIconClasses;

export function getListItemIconUtilityClass(slot: string): string;

export default listItemIconClasses;
