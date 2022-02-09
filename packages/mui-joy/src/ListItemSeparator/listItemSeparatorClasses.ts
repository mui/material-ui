import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemSeparatorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `inset="gutter"`. */
  insetGutter: string;
  /** Styles applied to the root element if `inset="leftAdornment"`. */
  insetLeftAdornment: string;
  /** Styles applied to the root element if `inset="leftContent"`. */
  insetLeftContent: string;
}

export type ListItemSeparatorClassKey = keyof ListItemSeparatorClasses;

export function getListItemSeparatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemSeparator', slot);
}

const listItemSeparatorClasses: ListItemSeparatorClasses = generateUtilityClasses(
  'MuiListItemSeparator',
  ['root', 'insetGutter', 'insetLeftAdornment', 'insetLeftContent'],
);

export default listItemSeparatorClasses;
