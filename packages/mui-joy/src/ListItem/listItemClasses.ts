import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('MuiListItem', ['root']);

export default listItemClasses;
