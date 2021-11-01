import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ListItemAvatarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
}

export type ListItemAvatarClassKey = keyof ListItemAvatarClasses;

export function getListItemAvatarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemAvatar', slot);
}

export const getListItemAvatarClasses = (): ListItemAvatarClasses => generateUtilityClasses('MuiListItemAvatar', [
  'root',
  'alignItemsFlexStart',
]);

const listItemAvatarClasses = getListItemAvatarClasses();

export default listItemAvatarClasses;
