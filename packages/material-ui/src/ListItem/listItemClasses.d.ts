export interface ListItemClasses {
  root: string;
  container: string;
  focusVisible: string;
  dense: string;
  alignItemsFlexStart: string;
  disabled: string;
  divider: string;
  gutters: string;
  button: string;
  secondaryAction: string;
  selected: string;
}

declare const listItemClasses: ListItemClasses;

export function getListItemUtilityClass(slot: string): string;

export default listItemClasses;
