import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element, if sticky={true}. */
  sticky: string;
}

export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('MuiListItem', ['root', 'sticky']);

export default listItemClasses;
