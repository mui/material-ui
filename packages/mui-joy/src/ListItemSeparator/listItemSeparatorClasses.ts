import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemSeparatorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemSeparatorClassKey = keyof ListItemSeparatorClasses;

export function getListItemSeparatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemSeparator', slot);
}

const listItemSeparatorClasses: ListItemSeparatorClasses = generateUtilityClasses(
  'MuiListItemSeparator',
  ['root'],
);

export default listItemSeparatorClasses;
