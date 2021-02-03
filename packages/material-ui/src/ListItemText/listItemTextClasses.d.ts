export interface ListItemTextClasses {
  root: string;
  multiline: string;
  dense: string;
  inset: string;
  primary: string;
  secondary: string;
}

declare const listItemTextClasses: ListItemTextClasses;

export function getListItemTextUtilityClass(slot: string): string;

export default listItemTextClasses;
