import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemAdornmentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemAdornmentClassKey = keyof ListItemAdornmentClasses;

export function getListItemAdornmentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemAdornment', slot);
}

const listItemAdornmentClasses: ListItemAdornmentClasses = generateUtilityClasses(
  'MuiListItemAdornment',
  ['root'],
);

export default listItemAdornmentClasses;
