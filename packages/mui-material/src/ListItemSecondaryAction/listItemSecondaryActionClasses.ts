import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ListItemSecondaryActionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the parent `ListItem` has `disableGutters={true}`. */
  disableGutters: string;
}

export type ListItemSecondaryActionClassKey = keyof ListItemSecondaryActionClasses;

export function getListItemSecondaryActionClassesUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}

export const getListItemSecondaryActionClasses = (): ListItemSecondaryActionClasses =>
  generateUtilityClasses('MuiListItemSecondaryAction', ['root', 'disableGutters']);

const listItemSecondaryActionClasses = getListItemSecondaryActionClasses();

export default listItemSecondaryActionClasses;
