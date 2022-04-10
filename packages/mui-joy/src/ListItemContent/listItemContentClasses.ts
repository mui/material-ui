import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemContentClassKey = keyof ListItemContentClasses;

export function getListItemContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemContent', slot);
}

const listItemContentClasses: ListItemContentClasses = generateUtilityClasses(
  'MuiListItemContent',
  ['root'],
);

export default listItemContentClasses;
