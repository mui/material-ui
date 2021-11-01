import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ListItemIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
}

export type ListItemIconClassKey = keyof ListItemIconClasses;

export function getListItemIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemIcon', slot);
}

export const getListItemIconClasses = (): ListItemIconClasses =>
  generateUtilityClasses('MuiListItemIcon', ['root', 'alignItemsFlexStart']);

const listItemIconClasses = getListItemIconClasses();

export default listItemIconClasses;
