import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemContentClassKey = keyof ListItemContentClasses;

export function getListItemContentUtilityClass(slot: string): string {
  return generateUtilityClass('JoyListItemContent', slot);
}

const listItemContentClasses: ListItemContentClasses = generateUtilityClasses(
  'JoyListItemContent',
  ['root'],
);

export default listItemContentClasses;
