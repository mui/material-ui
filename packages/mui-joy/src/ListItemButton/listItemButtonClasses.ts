import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemButtonClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
  'root',
]);

export default listItemButtonClasses;
