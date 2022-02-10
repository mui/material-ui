import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemSeparatorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `inset="gutter"`. */
  insetGutter: string;
  /** Styles applied to the root element if `inset="startAdornment"`. */
  insetStartAdornment: string;
  /** Styles applied to the root element if `inset="startContent"`. */
  insetStartContent: string;
}

export type ListItemSeparatorClassKey = keyof ListItemSeparatorClasses;

export function getListItemSeparatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemSeparator', slot);
}

const listItemSeparatorClasses: ListItemSeparatorClasses = generateUtilityClasses(
  'MuiListItemSeparator',
  ['root', 'insetGutter', 'insetStartAdornment', 'insetStartContent'],
);

export default listItemSeparatorClasses;
